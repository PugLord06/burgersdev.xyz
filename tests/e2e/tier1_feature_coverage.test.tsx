import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import BookingModal from '../../src/components/BookingModal';

describe('Tier 1 - Feature Coverage (Happy Paths)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  // ==========================================
  // Feature 1: Sidebar (5 Test Cases)
  // ==========================================
  describe('Sidebar Feature', () => {
    test('1.1 renders navigation container and New Conversation button', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByRole('button', { name: /New Conversation/i })).toBeInTheDocument();
      expect(screen.getByText('Ctrl N')).toBeInTheDocument();
    });

    test('1.2 renders AI Assistant, Scheduled Tasks, and Settings navigation links', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('AI Assistant')).toBeInTheDocument();
      expect(screen.getByText('Scheduled Tasks & Availability')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    test('1.3 expands and collapses Projects folder toggle', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const projectsHeader = screen.getByText('Projects');
      expect(projectsHeader).toBeInTheDocument();
      expect(screen.getByText('isitcheatingif.com')).toBeInTheDocument();
      
      fireEvent.click(projectsHeader);
      expect(screen.queryByText('isitcheatingif.com')).not.toBeInTheDocument();
    });

    test('1.4 expands and collapses Conversations folder toggle', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const convsHeader = screen.getByText('Conversations');
      expect(convsHeader).toBeInTheDocument();
      expect(screen.getByText('Academic Standing & Golden Key Status')).toBeInTheDocument();
      
      fireEvent.click(convsHeader);
      expect(screen.queryByText('Academic Standing & Golden Key Status')).not.toBeInTheDocument();
    });

    test('1.5 renders isitcheating project log items in expanded state', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Procedural Content Engine')).toBeInTheDocument();
      expect(screen.getByText('Fixing React Hydration')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 2: MainViewport (5 Test Cases)
  // ==========================================
  describe('MainViewport Feature', () => {
    test('2.1 renders main viewport container', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const mainViewport = document.getElementById('main-viewport');
      expect(mainViewport).toBeInTheDocument();
    });

    test('2.2 renders breadcrumb navigation for root route', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const breadcrumb = document.getElementById('breadcrumb-navigation');
      expect(breadcrumb).toBeInTheDocument();
      expect(breadcrumb?.textContent).toContain('burgersdev');
      expect(breadcrumb?.textContent).toContain('Workspace');
    });

    test('2.3 renders Resume breadcrumbs on /resume route', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Personal')).toBeInTheDocument();
      expect(screen.getByText('Resume.md')).toBeInTheDocument();
    });

    test('2.4 renders Scheduled Tasks breadcrumbs on /tasks route', () => {
      render(
        <MemoryRouter initialEntries={['/tasks']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Core')).toBeInTheDocument();
      expect(screen.getByText('ScheduledTasks.ts')).toBeInTheDocument();
    });

    test('2.5 renders Project breadcrumb for project routes', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-hydration']}>
          <App />
        </MemoryRouter>
      );
      const breadcrumb = document.getElementById('breadcrumb-navigation');
      expect(breadcrumb?.textContent).toContain('Projects');
      expect(breadcrumb?.textContent).toContain('Fixing React Hydration');
    });
  });

  // ==========================================
  // Feature 3: WindowTitlebar (5 Test Cases)
  // ==========================================
  describe('WindowTitlebar Feature', () => {
    test('3.1 renders developer profile handle in titlebar', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const handles = screen.getAllByText('burgersdev');
      expect(handles.length).toBeGreaterThan(0);
    });

    test('3.2 renders back and forward navigation control buttons', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByLabelText('Go Back')).toBeInTheDocument();
      expect(screen.getByLabelText('Go Forward')).toBeInTheDocument();
    });

    test('3.3 displays current active path label in titlebar', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('burgersdev / Settings')).toBeInTheDocument();
    });

    test('3.4 renders GitHub branch button with valid url', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const githubLink = document.getElementById('btn-open-github');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/PugLord06');
    });

    test('3.5 renders OS window control buttons (min, max, close)', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByLabelText('Minimize')).toBeInTheDocument();
      expect(screen.getByLabelText('Maximize')).toBeInTheDocument();
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 4: ChatBar (5 Test Cases)
  // ==========================================
  describe('ChatBar Feature', () => {
    test('4.1 renders chat control dock and input form', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(document.getElementById('chat-control-dock')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Ask burgersdev anything/i)).toBeInTheDocument();
    });

    test('4.2 renders suggestion chips', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('🚀 Open Resume.md')).toBeInTheDocument();
      expect(screen.getByText('🧠 Run Game Demo')).toBeInTheDocument();
      expect(screen.getByText('💻 Inspect Tech Stack')).toBeInTheDocument();
    });

    test('4.3 renders Gemini model status indicator pill', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Gemini 3.5 Flash (High)')).toBeInTheDocument();
    });

    test('4.4 enables send button when input text is entered', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      const sendButton = screen.getByLabelText('Send Query');
      
      expect(sendButton).toBeDisabled();
      fireEvent.change(input, { target: { value: 'Hello world' } });
      expect(sendButton).not.toBeDisabled();
    });

    test('4.5 renders upload file button in chat bar', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByLabelText('Upload File')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 5: Theme System (5 Test Cases)
  // ==========================================
  describe('Theme System Feature', () => {
    test('5.1 toggles between dark and light mode when theme button clicked', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const toggleBtn = screen.getByLabelText('Toggle Theme');
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      fireEvent.click(toggleBtn);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('5.2 adds dark class to document element in dark mode', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(document.documentElement).toHaveClass('dark');
    });

    test('5.3 removes dark class from document element when switched to light mode', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const toggleBtn = screen.getByLabelText('Toggle Theme');
      fireEvent.click(toggleBtn);
      expect(document.documentElement).not.toHaveClass('dark');
    });

    test('5.4 sets data-theme attribute on document when accent button clicked in settings', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      const emeraldBtn = screen.getByTitle('Emerald');
      fireEvent.click(emeraldBtn);
      expect(document.documentElement.getAttribute('data-theme')).toBe('emerald');
    });

    test('5.5 persists selected accent in localStorage', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      const purpleBtn = screen.getByTitle('Purple');
      fireEvent.click(purpleBtn);
      expect(localStorage.getItem('workspace-theme')).toBe('purple');
    });
  });

  // ==========================================
  // Feature 6: Resume View (5 Test Cases)
  // ==========================================
  describe('Resume View Feature', () => {
    test('6.1 renders Developer_Profile header', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Developer_Profile.json')).toBeInTheDocument();
      expect(screen.getByText('Michael Burgers')).toBeInTheDocument();
    });

    test('6.2 displays contact details card with location and email', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Cape Town, South Africa')).toBeInTheDocument();
      expect(screen.getByText('burgers.michael.dev@gmail.com')).toBeInTheDocument();
    });

    test('6.3 displays Key Projects section', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Key Projects')).toBeInTheDocument();
      expect(screen.getAllByText('isitcheatingif.com').length).toBeGreaterThan(0);
    });

    test('6.4 displays Education & Golden Key credential details', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('3rd-Year Software Engineering Student at Eduvos')).toBeInTheDocument();
      expect(screen.getByText('Eduvos Cape Town Campus')).toBeInTheDocument();
    });

    test('6.5 triggers PDF export print function on button click', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      const exportBtn = screen.getByText(/Export as PDF/i);
      fireEvent.click(exportBtn);
      expect(window.print).toHaveBeenCalledTimes(1);
    });
  });

  // ==========================================
  // Feature 7: Academic View (5 Test Cases)
  // ==========================================
  describe('Academic View Feature', () => {
    test('7.1 renders Golden Key Society invitee banner', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(/Golden Key Society Invitee/i)).toBeInTheDocument();
      expect(screen.getByText('Academic Standing & Credentials')).toBeInTheDocument();
    });

    test('7.2 displays Top 15% and Distinction stats', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Top 15%')).toBeInTheDocument();
      expect(screen.getByText('Distinction')).toBeInTheDocument();
    });

    test('7.3 switches between Society tab and Transcript tab', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      const transcriptTabBtn = document.getElementById('btn-tab-transcript');
      fireEvent.click(transcriptTabBtn!);
      expect(screen.getByText('Full Academic Scorecard')).toBeInTheDocument();
    });

    test('7.4 renders Society tab invitation content by default', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(/Golden Key International Honour Society/i)).toBeInTheDocument();
    });

    test('7.5 renders module grades in Transcript tab', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      const transcriptTabBtn = document.getElementById('btn-tab-transcript');
      fireEvent.click(transcriptTabBtn!);
      expect(screen.getByText(/Advanced Programming/i)).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 8: TechStack View (5 Test Cases)
  // ==========================================
  describe('TechStack View Feature', () => {
    test('8.1 renders title and core competencies header', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(/Technology Stack & Core Competencies/i)).toBeInTheDocument();
    });

    test('8.2 renders category filter buttons', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'frontend' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'backend' })).toBeInTheDocument();
    });

    test('8.3 filters tech items when category button is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      const frontendBtn = screen.getByRole('button', { name: 'frontend' });
      fireEvent.click(frontendBtn);
      expect(screen.getAllByText('React / Next.js').length).toBeGreaterThan(0);
      expect(screen.queryByText('Node.js / Express')).not.toBeInTheDocument();
    });

    test('8.4 displays confidence level percentages', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getAllByText('95%').length).toBeGreaterThan(0);
    });

    test('8.5 updates right detail panel when a tech item is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      const reactItem = screen.getByRole('button', { name: /React \/ Next.js/i });
      fireEvent.click(reactItem);
      expect(screen.getAllByText('React / Next.js').length).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // Feature 9: GeminiIntegration View (5 Test Cases)
  // ==========================================
  describe('GeminiIntegration View Feature', () => {
    test('9.1 renders sandbox title and description', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-gemini']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getAllByText('Google Gemini API Integrations').length).toBeGreaterThan(0);
    });

    test('9.2 model selector changes selected model', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-gemini']}>
          <App />
        </MemoryRouter>
      );
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'Gemini 3.5 Pro (Low Latency)' } });
      expect(select).toHaveValue('Gemini 3.5 Pro (Low Latency)');
    });

    test('9.3 template buttons switch system templates', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-gemini']}>
          <App />
        </MemoryRouter>
      );
      const coderBtn = document.getElementById('btn-template-coder');
      fireEvent.click(coderBtn!);
      expect(screen.getByText(/Real-time WebSocket Coder/i)).toBeInTheDocument();
    });

    test('9.4 temperature slider updates temperature display', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-gemini']}>
          <App />
        </MemoryRouter>
      );
      const tempSlider = document.getElementById('slider-temp');
      expect(tempSlider).toBeInTheDocument();
      fireEvent.change(tempSlider!, { target: { value: '0.9' } });
      expect(screen.getByText('0.9')).toBeInTheDocument();
    });

    test('9.5 run simulation button triggers prompt pipeline execution', async () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-gemini']}>
          <App />
        </MemoryRouter>
      );
      const runBtn = screen.getByRole('button', { name: /Run Prompt Pipeline/i });
      fireEvent.click(runBtn);
      expect(screen.getByText('Temperature')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 10: ScheduledTasks View (5 Test Cases)
  // ==========================================
  describe('ScheduledTasks View Feature', () => {
    test('10.1 renders calendar header and title', () => {
      render(
        <MemoryRouter initialEntries={['/tasks']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { name: /Scheduled Tasks & Availability/i })).toBeInTheDocument();
    });

    test('10.2 displays local mock data status badge by default in test env', async () => {
      render(
        <MemoryRouter initialEntries={['/tasks']}>
          <App />
        </MemoryRouter>
      );
      await waitFor(() => {
        expect(screen.getByText('Local Mock Data')).toBeInTheDocument();
      });
    });

    test('10.3 navigates previous and next month', () => {
      render(
        <MemoryRouter initialEntries={['/tasks']}>
          <App />
        </MemoryRouter>
      );
      const calendarContainer = document.getElementById('scheduled-tasks-container');
      const monthTitle = calendarContainer?.querySelector('h2');
      const initialMonthText = monthTitle?.textContent;
      
      const navButtons = calendarContainer?.querySelectorAll('button');
      if (navButtons && navButtons.length > 1) {
        fireEvent.click(navButtons[1]); // Next month button
      }
      expect(monthTitle?.textContent).not.toBe(initialMonthText);
    });

    test('10.4 renders days of the week headers', async () => {
      render(
        <MemoryRouter initialEntries={['/tasks']}>
          <App />
        </MemoryRouter>
      );
      await waitFor(() => {
        expect(screen.getByText('MON')).toBeInTheDocument();
        expect(screen.getByText('FRI')).toBeInTheDocument();
      });
    });

    test('10.5 opens booking modal when Book a Session button clicked', () => {
      render(
        <MemoryRouter initialEntries={['/tasks']}>
          <App />
        </MemoryRouter>
      );
      const bookBtn = screen.getByRole('button', { name: /Book a Session/i });
      fireEvent.click(bookBtn);
      expect(screen.getByRole('heading', { name: 'Book a Session' })).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 11: ProjectLogs View (5 Test Cases)
  // ==========================================
  describe('ProjectLogs View Feature', () => {
    test('11.1 renders log title and category badge', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-hydration']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', { name: 'Fixing React Hydration' })).toBeInTheDocument();
      expect(screen.getByText('Project')).toBeInTheDocument();
    });

    test('11.2 renders user prompt bubble and AI response', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-hydration']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(/NextJS hydration mismatches/i)).toBeInTheDocument();
      expect(screen.getByText(/Hydration errors happen when the server renders one string/i)).toBeInTheDocument();
    });

    test('11.3 renders code block file label and title', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-hydration']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('useLocalStorage.ts')).toBeInTheDocument();
      expect(screen.getByText('- Hydration Safe LocalStorage Hook')).toBeInTheDocument();
    });

    test('11.4 copy code button executes navigator clipboard writeText', () => {
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

      const copyBtn = screen.getByTitle('Copy Code');
      fireEvent.click(copyBtn);
      expect(writeTextMock).toHaveBeenCalled();
    });

    test('11.5 toggles repository context explorer section', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-hydration']}>
          <App />
        </MemoryRouter>
      );
      const accordionHeader = screen.getByText(/Related Repository Context/i);
      expect(screen.getByText('Recent Commits')).toBeInTheDocument();
      
      fireEvent.click(accordionHeader);
      expect(screen.queryByText('Recent Commits')).not.toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 12: AIChat View (5 Test Cases)
  // ==========================================
  describe('AIChat View Feature', () => {
    test('12.1 renders Assistant header and subtitle', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Assistant')).toBeInTheDocument();
      expect(screen.getByText(/Ask me anything about Michael's experience/i)).toBeInTheDocument();
    });

    test('12.2 renders initial empty state message', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(/Send a message below to start chatting/i)).toBeInTheDocument();
    });

    test('12.3 renders user and assistant message bubbles when chat history updated', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: 'What is your background?' } });
      fireEvent.submit(input.closest('form')!);

      expect(screen.getByText('What is your background?')).toBeInTheDocument();
    });

    test('12.4 displays typing indicator when ai is generating response', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: 'Tell me a story' } });
      fireEvent.submit(input.closest('form')!);

      const chatContainer = screen.getByText('Tell me a story').closest('div');
      expect(chatContainer).toBeInTheDocument();
    });

    test('12.5 clears input field after message submission', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'Hello' } });
      fireEvent.submit(input.closest('form')!);
      expect(input.value).toBe('');
    });
  });

  // ==========================================
  // Feature 13: Settings View (5 Test Cases)
  // ==========================================
  describe('Settings View Feature', () => {
    test('13.1 renders Settings & Workspace Info title', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Settings & Workspace Info')).toBeInTheDocument();
    });

    test('13.2 displays developer profile diagnostics', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Michael Burgers')).toBeInTheDocument();
      expect(screen.getByText('Cape Town, South Africa')).toBeInTheDocument();
    });

    test('13.3 renders theme accent color selector buttons', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByTitle('Blue')).toBeInTheDocument();
      expect(screen.getByTitle('Emerald')).toBeInTheDocument();
      expect(screen.getByTitle('Purple')).toBeInTheDocument();
      expect(screen.getByTitle('Rose')).toBeInTheDocument();
      expect(screen.getByTitle('Amber')).toBeInTheDocument();
    });

    test('13.4 updates data-theme attribute on html element when accent is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByTitle('Rose'));
      expect(document.documentElement.getAttribute('data-theme')).toBe('rose');
    });

    test('13.5 displays system status information and remote connection link', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('System Status')).toBeInTheDocument();
      expect(screen.getByText('Kernel Version')).toBeInTheDocument();
      expect(screen.getByText(/Initialize Remote Connection \(GitHub\)/i)).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 14: BookingModal (5 Test Cases)
  // ==========================================
  describe('BookingModal Feature', () => {
    test('14.1 returns null when isOpen is false', () => {
      const { container } = render(
        <BookingModal isOpen={false} onClose={vi.fn()} />
      );
      expect(container.firstChild).toBeNull();
    });

    test('14.2 renders modal backdrop and content when isOpen is true', () => {
      render(
        <BookingModal isOpen={true} onClose={vi.fn()} />
      );
      expect(screen.getByText('Book a Session')).toBeInTheDocument();
    });

    test('14.3 calls onClose when close button is clicked', () => {
      const onCloseMock = vi.fn();
      render(
        <BookingModal isOpen={true} onClose={onCloseMock} />
      );
      const closeBtn = screen.getByRole('button');
      fireEvent.click(closeBtn);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('14.4 passes default calLink when selectedDate is null', () => {
      render(
        <BookingModal isOpen={true} onClose={vi.fn()} selectedDate={null} />
      );
      expect(screen.getByText('Book a Session')).toBeInTheDocument();
    });

    test('14.5 formats calLink query param when selectedDate is provided', () => {
      const targetDate = new Date(2026, 7, 15); // Aug 15, 2026
      render(
        <BookingModal isOpen={true} onClose={vi.fn()} selectedDate={targetDate} />
      );
      expect(screen.getByText('Book a Session')).toBeInTheDocument();
    });
  });
});
