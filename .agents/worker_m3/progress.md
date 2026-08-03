# Progress — Worker M3 (Accessibility, Performance & Code Splitting)
Last visited: 2026-08-02T23:55:00Z
- [ ] Add semantic button roles, `tabIndex={0}`, `onKeyDown` handlers to `Sidebar` folders & `CalendarGrid` date cells
- [ ] Add accessibility attributes to `BookingModal` (`role="dialog"`, `aria-modal`, `aria-label`s, `Escape` key listener)
- [ ] Add missing `aria-label`s to form controls in `GeminiIntegrationView` & `SettingsView`
- [ ] Implement route-level code splitting with `React.lazy()` & `Suspense` in `MainViewport.tsx`
- [ ] Implement dynamic import for `BookingModal` in `ScheduledTasksView.tsx`
- [ ] Configure `manualChunks` in `vite.config.ts` for vendor splitting
- [ ] Clean up unreferenced static files (`hero.png`, `react.svg`, `vite.svg`, `public/favicon.svg`, `public/icons.svg`)
- [ ] Fix unmounted interval memory leak risks in `GameDemoView.tsx` & `useGeminiSimulation.ts`
- [ ] Verify build, performance, and accessibility
