# Project: portfolio-ide

## Architecture
- Modern React / Vite application implementing an interactive IDE-style portfolio interface.
- Core layout: `App.tsx` hosting `WindowTitlebar`, `Sidebar`, `MainViewport`, `ChatBar`, and modal overlays (`BookingModal`).
- Features: AI Chat simulation, Interactive IDE terminal, Calendar & Task scheduling (Google Calendar API & Cal.com embed), Resume view, Tech Stack view, Academic view, Settings view.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Portfolio Audit | Code quality, UI polish, mobile responsiveness, performance analysis | None | DONE |
| 2 | E2E Testing Track | Requirement-driven test suite & runner (`TEST_READY.md`) | M1 | IN_PROGRESS |
| 3.1 | M1: Build & Code Quality Fixes | TS6133 errors, ESLint rules, type annotations, broken links | M1 | DONE |
| 3.2 | M2: UI Polish & Responsiveness | Mobile drawer, Light mode contrast, fadeIn animations, ChatBar chips | M3.1 | IN_PROGRESS |
| 3.3 | M3: Accessibility & Performance | a11y roles/keyboard/ARIA, React.lazy code splitting, manualChunks | M3.2 | PLANNED |
| 4 | Final Verification & Audit | `npm run build`, `npm run lint`, E2E test pass, QA verification & Forensic Audit | M2, M3.3 | PLANNED |

## Interface Contracts
- `App.tsx` ↔ `Sidebar.tsx`: `isMobileOpen: boolean`, `onCloseMobile: () => void`, `onToggleMobileSidebar: () => void`.
- `MainViewport.tsx`: Uses `React.lazy()` for route loading under `Suspense`.
- `BookingModal.tsx`: Exports default modal component; handles `isOpen`, `onClose`, `selectedDate: Date | null`.

## Code Layout
- `src/components/`: Layout & UI controls (`Sidebar.tsx`, `MainViewport.tsx`, `WindowTitlebar.tsx`, `ChatBar.tsx`, `BookingModal.tsx`, `CalendarGrid.tsx`).
- `src/pages/`: Main page views (`AIChatView.tsx`, `AcademicView.tsx`, `GameDemoView.tsx`, `GeminiIntegrationView.tsx`, `ProjectLogsView.tsx`, `ResumeView.tsx`, `ScheduledTasksView.tsx`, `SettingsView.tsx`, `TechStackView.tsx`).
- `src/hooks/`: Custom React hooks (`useAIChat.ts`, `useGeminiSimulation.ts`).
- `src/utils/`: Helper utilities (`calendarUtils.ts`, `googleCalendar.ts`).
- `src/data/`: Data models & static JSON (`portfolioData.ts`, `timelineData.ts`).
