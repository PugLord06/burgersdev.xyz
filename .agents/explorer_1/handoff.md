# Code Quality & Build Audit Report (R1)

## 1. Observation

### Build & Compilation Command Failures
1. **`npm run build` (`tsc -b && vite build`)**:
   - Exit Code: 1
   - Output:
     ```
     src/components/BookingModal.tsx(1,22): error TS6133: 'CalendarIcon' is declared but its value is never read.
     src/components/BookingModal.tsx(1,46): error TS6133: 'ArrowUpRight' is declared but its value is never read.
     src/components/BookingModal.tsx(30,20): error TS6133: 'e' is declared but its value is never read.
     ```

2. **`npm run lint` (`eslint .`)**:
   - Exit Code: 1
   - Output:
     ```
     C:\Users\cosmi\Documents\GitHub\portfolio-ide\src\App.tsx
       26:7  error  Error: Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect

     C:\Users\cosmi\Documents\GitHub\portfolio-ide\src\components\BookingModal.tsx
        1:22  error  'CalendarIcon' is defined but never used  @typescript-eslint/no-unused-vars
        1:46  error  'ArrowUpRight' is defined but never used  @typescript-eslint/no-unused-vars
       30:20  error  'e' is defined but never used             @typescript-eslint/no-unused-vars

     C:\Users\cosmi\Documents\GitHub\portfolio-ide\src\data\timelineData.ts
       9:9   error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

     C:\Users\cosmi\Documents\GitHub\portfolio-ide\src\hooks\useAIChat.ts
       77:14  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

     C:\Users\cosmi\Documents\GitHub\portfolio-ide\src\pages\GeminiIntegrationView.tsx
       57:48  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

     C:\Users\cosmi\Documents\GitHub\portfolio-ide\src\pages\ScheduledTasksView.tsx
       49:72  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

     C:\Users\cosmi\Documents\GitHub\portfolio-ide\src\pages\TechStackView.tsx
       42:57  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
     ```

### Code Base Inspection Details

#### `src/App.tsx`
- **Line 24-30**: Synchronous `setIsDarkMode(true)` call inside `useEffect` when system dark mode matches.
  ```tsx
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } ...
  ```

#### `src/components/BookingModal.tsx`
- **Line 1**: `import { Calendar as CalendarIcon, Video, X, ArrowUpRight } from 'lucide-react';` (`CalendarIcon` and `ArrowUpRight` unused).
- **Line 30**: `callback: (e) => { ... }` (`e` parameter unused).
- **Line 57**: `selectedDate ? \`michaelburgers?date=\${selectedDate.getFullYear()}-\${String(selectedDate.getMonth() + 1).padStart(2, '0')}-\${String(selectedDate.getDate()).padStart(2, '0')}\` : "michaelburgers"`
  - *Risk*: If `selectedDate` is an invalid Date object (`new Date('invalid')`), `getFullYear()` returns `NaN`, evaluating to `michaelburgers?date=NaN-NaN-NaN`.
- **Line 47**: `<button onClick={onClose}>` icon button missing `aria-label="Close modal"`. Missing `Escape` key handling and backdrop click dismissal.

#### `src/components/CalendarGrid.tsx` & `src/utils/calendarUtils.ts`
- **`CalendarGrid.tsx:68-72`**: `<div onClick={() => onDayClick && onDayClick(currentCellDate)} className="...">`
  - Day cells have `onClick` handlers but lack `role="button"`, `tabIndex={0}`, or `onKeyDown` handlers.
- **`CalendarGrid.tsx:32,38`**: Prev and Next month buttons `<button onClick={onPrevMonth}>` and `<button onClick={onNextMonth}>` lack `aria-label` attributes.
- **`calendarUtils.ts:8`**: `if (usingFallback && e.date.length <= 10) return day === 15;`
  - *Bug*: Matches day `15` for fallback events regardless of `year` or `month`.

#### `src/components/Sidebar.tsx`
- **Lines 76 & 103**: `<div onClick={() => onToggleFolder('projects')} ...>` and `<div onClick={() => onToggleFolder('conversations')} ...>`
  - Folder headers have `onClick` on non-interactive `<div>` without `role="button"`, `tabIndex={0}`, or `onKeyDown`.
- **Line 60**: `<button className="...">Conversation History</button>` has no click listener or route target (dead UI element).
- **Line 47**: Visual indicator `Ctrl N` present without a global `keydown` event listener for `Ctrl+N` / `Cmd+N`.

#### `src/pages/GameDemoView.tsx` & `src/hooks/useGeminiSimulation.ts`
- **`GameDemoView.tsx:32-50`**: `handleVote` creates nested `setInterval` timers for streaming text and reasoning without storing handles in `useRef` or providing unmount cleanup.
- **`useGeminiSimulation.ts:25-45`**: `runSimulation` creates nested `setInterval` timers without handles or unmount cleanup.
  - *Risk*: State setters will trigger React unmounted component warnings/memory leaks if navigated away while streaming.

#### `src/pages/SettingsView.tsx`
- **Line 105**: `<a href={DEVELOPER_PROFILE.github} target="_blank" rel="noreferrer">`
  - *Bug*: Uses `DEVELOPER_PROFILE.github` (`"PugLord06"`) instead of `DEVELOPER_PROFILE.githubUrl` (`"https://github.com/PugLord06"`), resolving to `/#/PugLord06` inside the SPA rather than opening GitHub externally.

#### `src/components/WindowTitlebar.tsx`
- **Lines 32 & 39**: `btn-window-back` and `btn-window-forward` buttons lack `onClick` handlers for browser history navigation (`navigate(-1)` / `navigate(1)`).

---

## 2. Logic Chain

1. **Build Failure Chain**:
   - `tsconfig.app.json` has `"noUnusedLocals": true` and `"noUnusedParameters": true`.
   - In `BookingModal.tsx`, `CalendarIcon`, `ArrowUpRight`, and parameter `e` are declared but never referenced.
   - `tsc -b` flags TS6133 errors and aborts with code 1. Therefore, `npm run build` fails.

2. **Lint Error Chain**:
   - `eslint.config.js` enables `@typescript-eslint` rules and `eslint-plugin-react-hooks`.
   - Explicit `any` annotations in `timelineData.ts`, `GeminiIntegrationView.tsx`, `ScheduledTasksView.tsx`, and `TechStackView.tsx` violate `@typescript-eslint/no-explicit-any`.
   - `App.tsx` calls `setIsDarkMode(true)` directly in the effect body during render cycle, violating `react-hooks/set-state-in-effect`.
   - Unused variables/parameters in `BookingModal.tsx` and `useAIChat.ts` violate `@typescript-eslint/no-unused-vars`.

3. **Runtime & Logic Failure Chain**:
   - In `GameDemoView.tsx` and `useGeminiSimulation.ts`, interval IDs are local variables inside event handlers. When components unmount, interval callbacks continue executing and calling state update functions on unmounted component instances.
   - In `calendarUtils.ts`, fallback event filtering checks `day === 15` without matching `year` or `month`, forcing all short-date timeline events to display on the 15th of every month.
   - In `SettingsView.tsx`, passing `"PugLord06"` to `href` in HTML `<a href="...">` causes the browser to interpret it as a relative URL on the current origin.

4. **Accessibility & UX Barrier Chain**:
   - Screen reader users and keyboard-only users cannot focus or activate `CalendarGrid` day cells or `Sidebar` folder accordions because they are implemented using non-interactive `<div>` elements without `tabIndex`, `role`, or key event handlers.
   - Screen readers reading icon-only buttons (`X` in `BookingModal.tsx`, `ChevronLeft`/`ChevronRight` in `CalendarGrid.tsx`) fail to describe their purpose due to missing `aria-label` attributes.

---

## 3. Caveats

- **External Backend Services**: The API endpoints (e.g. FastAPI server on `http://127.0.0.1:8000` in `useAIChat.ts` and Google Calendar API in `ScheduledTasksView.tsx`) depend on environment variables and active backends. Fallbacks are implemented in code.
- **Scope Limit**: Investigation was strictly read-only; no code modifications were applied during this exploration step.

---

## 4. Conclusion & Concrete Fix Strategy

The `portfolio-ide` codebase has a clean structure but currently fails both build and linting checks, contains multiple runtime state leak risks, and has accessibility gaps.

### Fix Strategy Matrix

| Issue ID | File / Location | Problem Summary | Concrete Fix Strategy |
|---|---|---|---|
| **FIX-01** | `src/components/BookingModal.tsx` | TS6133 & ESLint unused variables (`CalendarIcon`, `ArrowUpRight`, `e`) | Remove `CalendarIcon` and `ArrowUpRight` imports. Remove parameter `e` or rename to `_e` in callback. |
| **FIX-02** | `src/App.tsx:26` | `react-hooks/set-state-in-effect` | Initialize `isDarkMode` state lazily: `useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)`. Remove synchronous state setting from `useEffect`. |
| **FIX-03** | `src/data/timelineData.ts:9` | `@typescript-eslint/no-explicit-any` | Replace `icon: any` with `icon?: React.ComponentType<{ className?: string }>`. |
| **FIX-04** | `src/hooks/useAIChat.ts:77` | `@typescript-eslint/no-unused-vars` | Change `catch (error)` to `catch (_error)` or log `_error`. |
| **FIX-05** | `src/pages/GeminiIntegrationView.tsx:57` | `@typescript-eslint/no-explicit-any` | Cast `key as keyof typeof TEMPLATES` instead of `any`. |
| **FIX-06** | `src/pages/ScheduledTasksView.tsx:49` | `@typescript-eslint/no-explicit-any` | Define interface `GoogleCalendarEventItem` for item typing instead of `any`. |
| **FIX-07** | `src/pages/TechStackView.tsx:42` | `@typescript-eslint/no-explicit-any` | Cast `cat as 'all' \| 'frontend' \| 'backend' \| 'ai' \| 'database'` instead of `any`. |
| **FIX-08** | `src/pages/GameDemoView.tsx` | Unmounted state updates & interval leaks | Manage streaming intervals via `useEffect` / `useRef` with cleanup on unmount or reset. |
| **FIX-09** | `src/hooks/useGeminiSimulation.ts` | Unmounted state updates & interval leaks | Store active timer IDs in `useRef` and clear them on component unmount in `useEffect`. |
| **FIX-10** | `src/utils/calendarUtils.ts:8` | Fallback event matching bug | Validate `year` and `month` when matching `usingFallback` short date strings. |
| **FIX-11** | `src/pages/SettingsView.tsx:105` | Broken GitHub link | Change `href={DEVELOPER_PROFILE.github}` to `href={DEVELOPER_PROFILE.githubUrl}`. |
| **FIX-12** | `src/components/CalendarGrid.tsx` & `Sidebar.tsx` | Accessibility (a11y) missing keyboard/roles & aria-labels | Add `role="button"`, `tabIndex={0}`, `onKeyDown` to day cells and folder toggles. Add `aria-label` to month navigation buttons and close buttons. |
| **FIX-13** | `src/components/BookingModal.tsx` | Edge cases & UX | Validate `selectedDate` validity before formatting date string. Add `Escape` key and backdrop click listener. |

---

## 5. Verification Method

To verify that all issues are resolved once implemented:

1. **Lint Check**:
   ```bash
   npm run lint
   ```
   *Expected result*: Exit status `0` with `0 errors, 0 warnings`.

2. **Build Check**:
   ```bash
   npm run build
   ```
   *Expected result*: `tsc -b` completes cleanly, Vite bundle succeeds, output written to `dist/`.

3. **Accessibility & Link Manual Inspection**:
   - Inspect `SettingsView.tsx` link: verify GitHub button has `href="https://github.com/PugLord06"`.
   - Inspect `CalendarGrid.tsx` and `Sidebar.tsx`: verify interactive `<div>` elements have `tabIndex={0}`, `role="button"`, and `onKeyDown` handlers.
