# Comprehensive Performance & Asset Optimization Audit Report

**Explorer 3 (Performance & Optimization Explorer)**  
**Target Project**: `portfolio-ide` (`c:\Users\cosmi\Documents\GitHub\portfolio-ide\`)  
**Date**: 2026-08-02  

---

## 1. Observation

### Focus Area 1: Image Assets & Static Files
* **Dead Static Assets**:
  * `src/assets/hero.png` (13,057 bytes / ~13.06 KB) — Present in `src/assets/` but unreferenced across `src/`.
  * `src/assets/react.svg` (4,126 bytes) — Unused Vite boilerplate asset.
  * `src/assets/vite.svg` (8,709 bytes) — Unused Vite boilerplate asset.
  * `public/favicon.svg` (9,522 bytes) — Unused static SVG in `public/`.
  * `public/icons.svg` (5,031 bytes) — Unused SVG sprite file in `public/`.
  * *Total unreferenced static asset size*: **40.44 KB**.
* **Favicon Configuration**:
  * `index.html` (line 23): Uses an inline emoji data URI favicon:
    ```html
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>" />
    ```
* **Image Usage in UI**:
  * Zero responsive `<picture>` elements or `srcset` attributes exist in the project. The UI relies almost exclusively on Tailwind CSS gradients, Lucide React icons, and inline SVG elements.

### Focus Area 2: Code Splitting & Lazy Loading
* **Eager Route Imports**:
  * In `src/components/MainViewport.tsx` (lines 5-12), all 8 view components are statically imported at the top of the file:
    ```tsx
    import ResumeView from '../pages/ResumeView';
    import AcademicView from '../pages/AcademicView';
    import TechStackView from '../pages/TechStackView';
    import GeminiIntegrationView from '../pages/GeminiIntegrationView';
    import ScheduledTasksView from '../pages/ScheduledTasksView';
    import ProjectLogsView from '../pages/ProjectLogsView';
    import AIChatView from '../pages/AIChatView';
    import SettingsView from '../pages/SettingsView';
    ```
* **Eager Modal & Heavy Package Imports**:
  * `src/pages/ScheduledTasksView.tsx` (line 5): Statically imports `BookingModal`.
  * `src/components/BookingModal.tsx` (line 2): Statically imports `@calcom/embed-react` (`Cal`, `getCalApi`).
* **Absence of Dynamic Imports**:
  * Zero instances of `React.lazy()` or `<React.Suspense>` exist across the codebase.

### Focus Area 3: React Re-render Optimization & State Flow
* **Absence of Memoization**:
  * Zero occurrences of `useMemo`, `useCallback`, or `React.memo` exist in `src/`.
* **Root State Updates & Re-render Cascades**:
  * `src/hooks/useAIChat.ts` (lines 62-70): State update `setChatHistory` runs on every SSE text chunk and is held in `App.tsx` (line 14). This forces root-to-leaf re-renders of `App`, `WindowTitlebar`, `Sidebar`, `MainViewport`, `ChatBar`, and active views on every character token received during AI chat streaming.
  * `src/App.tsx` (lines 80-109): Defines inline callback function references on every render (`onNewConversation={() => navigate('/settings')}`, `onToggleFolder`, `onSendMessage`, `onDirectAction`), invalidating child prop comparisons.
  * `src/hooks/useGeminiSimulation.ts` (lines 34-43): `setOutput` updates state every 15 milliseconds during token streaming. Without `React.memo` or memoized props, `GeminiIntegrationView` and `GeminiOutputNode` re-render ~66 times per second.

### Focus Area 4: Bundle Size Optimization & Dependency Efficiency
* **Monolithic Bundle Output**:
  * `npx vite build` produces a single monolithic JS bundle:
    ```
    dist/index.html                   2.04 kB │ gzip:   0.81 kB
    dist/assets/index-CCQpdd0e.css   64.27 kB │ gzip:  11.20 kB
    dist/assets/index-CM7SWWXt.js   466.43 kB │ gzip: 140.89 kB
    ```
  * `vite.config.ts` (lines 1-8) has no `manualChunks` or Rollup output splitting configured:
    ```ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
    })
    ```
* **Build Failure on `npm run build`**:
  * Executing `npm run build` (`tsc -b && vite build`) fails with TypeScript errors:
    ```
    src/components/BookingModal.tsx(1,22): error TS6133: 'CalendarIcon' is declared but its value is never read.
    src/components/BookingModal.tsx(1,46): error TS6133: 'ArrowUpRight' is declared but its value is never read.
    src/components/BookingModal.tsx(30,20): error TS6133: 'e' is declared but its value is never read.
    ```

---

## 2. Logic Chain

1. **Static Asset Waste**: `hero.png`, `react.svg`, `vite.svg`, `favicon.svg`, and `icons.svg` account for 40.44 KB of unreferenced files. Removing or cleaning up unused assets prevents clutter and accidental inclusion in static deployments.
2. **Initial Load Overhead**: Eager imports in `MainViewport.tsx` and `ScheduledTasksView.tsx` force Vite/Rollup to output a single 466.43 KB JavaScript chunk (`index-CM7SWWXt.js`). A user navigating to `/` downloads JavaScript for Cal.com booking embeds, markdown parsers, academic grade models, and game simulation logic all at once.
3. **Execution & UI Jank under High-Frequency State Updates**: The AI chat hook (`useAIChat`) updates root state in `App` during SSE streaming, while `useGeminiSimulation` updates state every 15ms. Because no components use `React.memo` and callbacks are passed inline, every state micro-tick causes the entire React tree to re-evaluate, leading to dropped frames during AI text generation.
4. **CI/CD Build Breakage**: `npm run build` fails due to unused variable declarations in `BookingModal.tsx` under strict TypeScript rules (`noUnusedLocals: true`). Fixing unused imports resolves the build failure immediately.

---

## 3. Caveats

* **No Production User Analytics**: Actual client-side Web Vitals (LCP, FID, CLS, INP) could not be measured on live edge networks (e.g. Vercel / Netlify CDN) due to operating in CODE_ONLY mode.
* **Cal.com Third-Party Iframe Overhead**: `@calcom/embed-react` loads an external web component iframe at runtime when rendered; lazy-loading `BookingModal` prevents the npm package code from polluting the main bundle, but network requests to `cal.com` occur when opened.

---

## 4. Conclusion & Actionable Optimization Plan

### Phase 1: Fix Production Build & Asset Cleanup (Immediate Impact)
1. **Fix TS Errors in `BookingModal.tsx`**:
   * Remove unused imports `CalendarIcon`, `ArrowUpRight`, and parameter `e` in `src/components/BookingModal.tsx`.
2. **Remove / Purge Unused Static Assets**:
   * Delete or archive `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/favicon.svg`, and `public/icons.svg`.

### Phase 2: Route & Component Code Splitting (High ROI)
1. **Route-Level Code Splitting**:
   * In `src/components/MainViewport.tsx`, convert page imports to dynamic imports using `React.lazy()`:
     ```tsx
     const ResumeView = React.lazy(() => import('../pages/ResumeView'));
     const AcademicView = React.lazy(() => import('../pages/AcademicView'));
     const TechStackView = React.lazy(() => import('../pages/TechStackView'));
     const GeminiIntegrationView = React.lazy(() => import('../pages/GeminiIntegrationView'));
     const ScheduledTasksView = React.lazy(() => import('../pages/ScheduledTasksView'));
     const ProjectLogsView = React.lazy(() => import('../pages/ProjectLogsView'));
     const AIChatView = React.lazy(() => import('../pages/AIChatView'));
     const SettingsView = React.lazy(() => import('../pages/SettingsView'));
     ```
   * Wrap `<Routes>` in `<React.Suspense fallback={<ViewportSkeleton />}>`.
2. **Modal Dynamic Import**:
   * In `src/pages/ScheduledTasksView.tsx`, convert `BookingModal` to `React.lazy(() => import('../components/BookingModal'))`. This isolates `@calcom/embed-react` into a standalone lazy chunk loaded only when opening the booking interface.

### Phase 3: Vite Bundle Chunking Configuration
1. **Configure Manual Chunks in `vite.config.ts`**:
   ```ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             'react-vendor': ['react', 'react-dom', 'react-router-dom'],
             'icons-vendor': ['lucide-react'],
             'calcom-vendor': ['@calcom/embed-react'],
             'markdown-vendor': ['react-markdown'],
           }
         }
       }
     }
   })
   ```

### Phase 4: React Re-render & Performance Tuning
1. **Memoize Static / Pure Components**:
   * Wrap `SidebarItem`, `Sidebar`, `WindowTitlebar`, `GeminiOutputNode`, `CalendarGrid`, and `ChatBar` with `React.memo()`.
2. **Stabilize Callback References**:
   * Wrap `handleToggleFolder`, `onNewConversation`, `onSendMessage`, and `onDirectAction` in `useCallback` in `App.tsx`.
3. **Localize Streaming State**:
   * Refactor SSE chat streaming state inside `useAIChat.ts` so high-frequency text updates trigger re-renders only within `AIChatView` or `ChatBar` rather than `App` root.

---

## 5. Verification Method

1. **Verify Build Success & Bundle Splitting**:
   * Command: `npm run build`
   * Expected Result: Build succeeds with 0 errors. Vite output shows multiple chunk files (`react-vendor`, `calcom-vendor`, `icons-vendor`, route chunks) instead of a single 466 KB monolith.
2. **Verify Lazy Loading**:
   * Command: `npx vite preview`
   * Action: Open Network tab in browser dev tools. Confirm that routes and `@calcom/embed-react` are fetched on-demand when clicked.
3. **Verify Re-render Optimization**:
   * Tool: React Developer Tools Profiler.
   * Action: Type in AI chat or run Gemini prompt simulation. Confirm `Sidebar`, `WindowTitlebar`, and static UI nodes do not re-render during streaming ticks.
