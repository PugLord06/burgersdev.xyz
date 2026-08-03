# Original User Request

## Initial Request — 2026-08-02T21:50:44Z

# Teamwork Project Prompt — Draft

> Status: Launched

Audit, polish, and improve the existing `portfolio-ide` React application for a production deployment by Monday midnight.

Working directory: c:/Users/cosmi/Documents/GitHub/portfolio-ide

Integrity mode: demo

## Requirements

### R1. Portfolio Audit
Conduct a comprehensive analysis of the existing codebase. Identify areas for improvement in Design/UI polish (including mobile responsiveness and animations), Code Quality (accessibility, console errors), and Performance (image compression, lazy loading).

### R2. Implement Critical Fixes
Actively implement the highest-priority improvements identified in the audit. You may use pre-built libraries/frameworks for missing functionality where appropriate.

### R3. Production Readiness
Ensure the final application is stable, error-free, and ready for a production deployment by Monday midnight.

## Acceptance Criteria

### Automated Verification
- [ ] `npm run build` completes successfully with no critical errors.
- [ ] `npm run lint` passes without any high-severity rules broken.

### Agent-as-Judge Verification
- [ ] A dedicated QA agent verifies that the UI improvements do not break existing functionality (like the calendar and booking integrations).
- [ ] The QA agent confirms mobile responsiveness on key views (MainViewport, Sidebar, BookingModal).
