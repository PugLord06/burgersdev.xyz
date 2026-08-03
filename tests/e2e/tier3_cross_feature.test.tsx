import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';

describe('Tier 3 - Cross-Feature Combinations', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  test('3.1 theme toggle persistence across route navigation', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>
    );

    const themeToggleBtn = screen.getByLabelText('Toggle Theme');
    expect(document.documentElement).toHaveClass('dark');

    // Switch to light mode
    fireEvent.click(themeToggleBtn);
    expect(document.documentElement).not.toHaveClass('dark');

    // Navigate to Resume View
    const resumeChip = screen.getByText('🚀 Open Resume.md');
    fireEvent.click(resumeChip);

    // Verify still in light mode on Resume View
    expect(screen.getByText('Developer_Profile.json')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');

    // Navigate to Scheduled Tasks
    const tasksLink = screen.getByText('Scheduled Tasks & Availability');
    fireEvent.click(tasksLink);
    expect(screen.getByRole('heading', { name: /Scheduled Tasks & Availability/i })).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');

    // Toggle back to dark mode
    fireEvent.click(themeToggleBtn);
    expect(document.documentElement).toHaveClass('dark');
  });

  test('3.2 ChatBar suggestion chips trigger route navigation and update active states', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Click Resume Chip
    fireEvent.click(screen.getByText('🚀 Open Resume.md'));
    expect(screen.getByText('Developer_Profile.json')).toBeInTheDocument();
    expect(screen.getByText('Resume.md')).toBeInTheDocument();

    // Click Game Demo Chip
    fireEvent.click(screen.getByText('🧠 Run Game Demo'));
    expect(screen.getByText('330+ votes cast')).toBeInTheDocument();

    // Click Tech Stack Chip
    fireEvent.click(screen.getByText('💻 Inspect Tech Stack'));
    expect(screen.getByText(/Technology Stack & Core Competencies/i)).toBeInTheDocument();
  });

  test('3.3 opening booking modal from scheduled tasks day cell click', () => {
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <App />
      </MemoryRouter>
    );

    // Click calendar day 15
    const day15Cells = screen.getAllByText('15');
    if (day15Cells.length > 0) {
      fireEvent.click(day15Cells[0].closest('div')!);
      const modalHeading = screen.getByRole('heading', { name: 'Book a Session' });
      expect(modalHeading).toBeInTheDocument();

      // Close modal by clicking X button inside top bar wrapper
      const modalTopBar = modalHeading.parentElement?.parentElement;
      const closeBtn = modalTopBar?.querySelector('button');
      expect(closeBtn).toBeDefined();
      fireEvent.click(closeBtn!);

      expect(screen.queryByRole('heading', { name: 'Book a Session' })).not.toBeInTheDocument();
    }
  });

  test('3.4 sidebar folder collapse interaction with view route selection', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Collapse Projects folder
    fireEvent.click(screen.getByText('Projects'));
    expect(screen.queryByText('isitcheatingif.com')).not.toBeInTheDocument();

    // Click AI Assistant
    fireEvent.click(screen.getByText('AI Assistant'));
    expect(screen.getByText('Assistant')).toBeInTheDocument();

    // Click Academic Standing & Golden Key Status (Conversations is open by default)
    fireEvent.click(screen.getByText('Academic Standing & Golden Key Status'));
    expect(screen.getByText('Academic Standing & Credentials')).toBeInTheDocument();
  });

  test('3.5 accent theme color change in Settings persists across all view routes', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>
    );

    // Select Rose accent color
    fireEvent.click(screen.getByTitle('Rose'));
    expect(localStorage.getItem('workspace-theme')).toBe('rose');
    expect(document.documentElement.getAttribute('data-theme')).toBe('rose');

    // Navigate to TypeScript & Full-Stack Architecture view directly
    fireEvent.click(screen.getByText('TypeScript & Full-Stack Architecture'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('rose');
  });

  test('3.6 AI Chat submission persists message history across route switches', () => {
    render(
      <MemoryRouter initialEntries={['/ai-chat']}>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
    fireEvent.change(input, { target: { value: 'What is Michael working on?' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText('What is Michael working on?')).toBeInTheDocument();

    // Navigate to Settings and back to AI Chat
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Settings & Workspace Info')).toBeInTheDocument();

    fireEvent.click(screen.getByText('AI Assistant'));
    expect(screen.getByText('What is Michael working on?')).toBeInTheDocument();
  });

  test('3.7 Gemini sandbox template and model selection persists parameters state', () => {
    render(
      <MemoryRouter initialEntries={['/project/conv-gemini']}>
        <App />
      </MemoryRouter>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Gemini 1.5 Pro (Ultra Context)' } });
    expect(select).toHaveValue('Gemini 1.5 Pro (Ultra Context)');

    const coderTemplateBtn = document.getElementById('btn-template-coder');
    fireEvent.click(coderTemplateBtn!);

    expect(screen.getByText(/Real-time WebSocket Coder/i)).toBeInTheDocument();
  });

  test('3.8 Project log code copy and accordion expansion integration', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
    });

    render(
      <MemoryRouter initialEntries={['/project/cheating-hydration']}>
        <App />
      </MemoryRouter>
    );

    // Expand repository context accordion
    const accordionHeader = screen.getByText(/Related Repository Context/i);
    expect(accordionHeader).toBeInTheDocument();
    expect(screen.getByText('Recent Commits')).toBeInTheDocument();

    // Click copy code
    const copyBtn = screen.getByTitle('Copy Code');
    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalled();
  });

  test('3.9 Game Demo custom scenario submission and voting interaction flow', () => {
    render(
      <MemoryRouter initialEntries={['/project/cheating-engine']}>
        <App />
      </MemoryRouter>
    );

    // Submit custom scenario
    const customInput = screen.getByPlaceholderText(/Is it cheating if your partner.../i);
    fireEvent.change(customInput, { target: { value: 'Is it cheating if your partner deletes their search history?' } });
    
    const submitBtn = document.getElementById('btn-submit-dilemma');
    fireEvent.click(submitBtn!);

    expect(screen.getByText(/Is it cheating if your partner deletes their search history\?/i)).toBeInTheDocument();

    // Vote Yes using button ID
    const yesBtn = document.getElementById('btn-vote-yes');
    expect(yesBtn).toBeInTheDocument();
    fireEvent.click(yesBtn!);

    expect(screen.getByText(/IT'S CHEATING \(81%\)/i)).toBeInTheDocument();
  });

  test('3.10 WindowTitlebar back and forward controls integrated with router navigation', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>
    );

    const backBtn = screen.getByLabelText('Go Back');
    const forwardBtn = screen.getByLabelText('Go Forward');

    fireEvent.click(backBtn);
    fireEvent.click(forwardBtn);

    expect(screen.getByText('burgersdev / Settings')).toBeInTheDocument();
  });
});
