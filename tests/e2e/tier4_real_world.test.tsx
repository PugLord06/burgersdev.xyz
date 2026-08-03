import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';

describe('Tier 4 - Real-World Application Scenarios', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  test('Scenario 1: Complete Portfolio Exploration & PDF Export Journey', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>
    );

    // Step 1: Verify Initial Workspace Settings View
    expect(screen.getByText('Settings & Workspace Info')).toBeInTheDocument();
    expect(screen.getByText('Michael Burgers')).toBeInTheDocument();

    // Step 2: Open Resume.md via ChatBar Chip
    const resumeChip = screen.getByText('🚀 Open Resume.md');
    fireEvent.click(resumeChip);
    expect(screen.getByText('Developer_Profile.json')).toBeInTheDocument();

    // Step 3: Trigger PDF Export
    const exportPdfBtn = screen.getByText(/Export as PDF/i);
    fireEvent.click(exportPdfBtn);
    expect(window.print).toHaveBeenCalled();

    // Step 4: Navigate to Tech Stack & Skills via Sidebar
    const techStackLink = screen.getByText('TypeScript & Full-Stack Architecture');
    fireEvent.click(techStackLink);
    expect(screen.getByText(/Technology Stack & Core Competencies/i)).toBeInTheDocument();

    // Step 5: Filter by 'frontend' and inspect React / Next.js
    const frontendCatBtn = screen.getByRole('button', { name: 'frontend' });
    fireEvent.click(frontendCatBtn);
    expect(screen.getByText('React / Next.js')).toBeInTheDocument();

    const reactItemBtn = screen.getByRole('button', { name: /React \/ Next.js/i });
    fireEvent.click(reactItemBtn);
    expect(screen.getAllByText('React / Next.js').length).toBeGreaterThan(0);

    // Step 6: Navigate to Academic Standing
    const academicLink = screen.getByText('Academic Standing & Golden Key Status');
    fireEvent.click(academicLink);
    expect(screen.getByText('Academic Standing & Credentials')).toBeInTheDocument();

    // Step 7: Switch to Transcript Tab
    const transcriptTabBtn = screen.getByRole('button', { name: /Academic Record & Transcript/i });
    fireEvent.click(transcriptTabBtn);
    expect(screen.getByText('Full Academic Scorecard')).toBeInTheDocument();
    expect(screen.getByText('Software Engineering 1A')).toBeInTheDocument();
  });

  test('Scenario 2: Scheduling & Booking Workflow Journey', () => {
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <App />
      </MemoryRouter>
    );

    // Step 1: Verify Scheduled Tasks View
    expect(screen.getByRole('heading', { name: /Scheduled Tasks & Availability/i })).toBeInTheDocument();

    // Step 2: Check Month Navigation using nextSibling of h2
    const calendarContainer = document.getElementById('scheduled-tasks-container');
    const monthHeading = calendarContainer?.querySelector('h2');
    const initialMonth = monthHeading?.textContent;
    
    const nextBtn = monthHeading?.nextElementSibling;
    if (nextBtn) fireEvent.click(nextBtn);

    expect(monthHeading?.textContent).not.toBe(initialMonth);

    // Step 3: Open Booking Modal via Day Click
    const dayCells = screen.getAllByText('15');
    if (dayCells.length > 0) {
      fireEvent.click(dayCells[0].closest('div')!);
      const modalHeading = screen.getByRole('heading', { name: 'Book a Session' });
      expect(modalHeading).toBeInTheDocument();

      // Step 4: Close Modal
      const modalTopBar = modalHeading.parentElement?.parentElement;
      const closeBtn = modalTopBar?.querySelector('button');
      if (closeBtn) fireEvent.click(closeBtn);

      expect(screen.queryByRole('heading', { name: 'Book a Session' })).not.toBeInTheDocument();
    }

    // Step 5: Open Booking Modal via Top CTA Button
    const bookSessionCta = screen.getByRole('button', { name: /Book a Session/i });
    fireEvent.click(bookSessionCta);
    expect(screen.getByRole('heading', { name: 'Book a Session' })).toBeInTheDocument();
  });

  test('Scenario 3: AI Assistant Conversation & Game Demo Interaction Journey', () => {
    render(
      <MemoryRouter initialEntries={['/ai-chat']}>
        <App />
      </MemoryRouter>
    );

    // Step 1: Check Assistant Header
    expect(screen.getByText('Assistant')).toBeInTheDocument();

    // Step 2: Click 'Run Game Demo' Chip
    const gameChip = screen.getByText('🧠 Run Game Demo');
    fireEvent.click(gameChip);
    expect(screen.getByText('330+ votes cast')).toBeInTheDocument();

    // Step 3: Vote in Game Demo using button ID
    const yesVoteBtn = document.getElementById('btn-vote-yes');
    expect(yesVoteBtn).toBeInTheDocument();
    fireEvent.click(yesVoteBtn!);

    // Step 4: Click Next Dilemma
    const nextBtn = screen.getByRole('button', { name: /Next Dilemma/i });
    fireEvent.click(nextBtn);

    // Step 5: Send Message in ChatBar while in AI Assistant
    const aiAssistantLink = screen.getByText('AI Assistant');
    fireEvent.click(aiAssistantLink);

    const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
    fireEvent.change(input, { target: { value: 'What is Michael working on?' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText('What is Michael working on?')).toBeInTheDocument();
  });

  test('Scenario 4: Developer Workbench Customization & Theme Deep Dive Journey', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>
    );

    // Step 1: Verify Initial Dark Mode
    expect(document.documentElement).toHaveClass('dark');

    // Step 2: Toggle to Light Mode via WindowTitlebar
    const themeToggleBtn = screen.getByLabelText('Toggle Theme');
    fireEvent.click(themeToggleBtn);
    expect(document.documentElement).not.toHaveClass('dark');

    // Step 3: Change Accent Theme in Settings to Purple
    const purpleAccentBtn = screen.getByTitle('Purple');
    fireEvent.click(purpleAccentBtn);
    expect(localStorage.getItem('workspace-theme')).toBe('purple');
    expect(document.documentElement.getAttribute('data-theme')).toBe('purple');

    // Step 4: Navigate through Project Logs via Sidebar
    fireEvent.click(screen.getByText('Fixing React Hydration'));
    expect(screen.getAllByText('Fixing React Hydration').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('AdSense Low Value Fix'));
    expect(screen.getAllByText('AdSense Low Value Fix').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('Securing Discord Webhooks'));
    expect(screen.getAllByText('Securing Discord Webhooks').length).toBeGreaterThan(0);

    // Step 5: Toggle back to Dark Mode
    fireEvent.click(themeToggleBtn);
    expect(document.documentElement).toHaveClass('dark');

    // Step 6: Verify Theme Accent is preserved
    expect(document.documentElement.getAttribute('data-theme')).toBe('purple');
  });
});
