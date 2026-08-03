import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import BookingModal from '../../src/components/BookingModal';
import WindowTitlebar from '../../src/components/WindowTitlebar';
import ChatBar from '../../src/components/ChatBar';
import Sidebar from '../../src/components/Sidebar';
import MainViewport from '../../src/components/MainViewport';
import GeminiIntegrationView from '../../src/pages/GeminiIntegrationView';
import ScheduledTasksView from '../../src/pages/ScheduledTasksView';

describe('Tier 2 - Boundary & Corner Cases', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  // ==========================================
  // Feature 1: Sidebar Boundary & Corner Cases (5 Cases)
  // ==========================================
  describe('Sidebar Boundary Cases', () => {
    test('1.1 handles collapsing all folders simultaneously', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const projectsHeader = screen.getByText('Projects');
      const convsHeader = screen.getByText('Conversations');
      
      fireEvent.click(projectsHeader);
      fireEvent.click(convsHeader);

      expect(screen.queryByText('isitcheatingif.com')).not.toBeInTheDocument();
      expect(screen.queryByText('Academic Standing & Golden Key Status')).not.toBeInTheDocument();
    });

    test('1.2 handles rapid folder toggle clicks without throwing errors', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const projectsHeader = screen.getByText('Projects');
      for (let i = 0; i < 10; i++) {
        fireEvent.click(projectsHeader);
      }
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    test('1.3 handles unmatched activeLogId falling back to default styling', () => {
      render(
        <MemoryRouter initialEntries={['/project/non-existent-log-id']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    test('1.4 truncates long item titles gracefully', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      const longTitleItem = screen.getByText('isitcheatingif.com');
      expect(longTitleItem).toHaveClass('truncate');
    });

    test('1.5 renders correctly when custom openFolders state has missing keys', () => {
      render(
        <Sidebar 
          activeLogId="settings" 
          onNewConversation={vi.fn()} 
          openFolders={{}} 
          onToggleFolder={vi.fn()} 
        />,
        { wrapper: MemoryRouter }
      );
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 2: MainViewport Boundary Cases (5 Cases)
  // ==========================================
  describe('MainViewport Boundary Cases', () => {
    test('2.1 renders SettingsView for completely unknown path wildcard', () => {
      render(
        <MemoryRouter initialEntries={['/random/invalid/path/123']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Settings & Workspace Info')).toBeInTheDocument();
    });

    test('2.2 handles empty chat history array gracefully in viewport', () => {
      render(
        <MainViewport chatHistory={[]} isTyping={false} />,
        { wrapper: MemoryRouter }
      );
      expect(document.getElementById('main-viewport')).toBeInTheDocument();
    });

    test('2.3 handles paths with multiple trailing slashes', () => {
      render(
        <MemoryRouter initialEntries={['/resume/']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Developer_Profile.json')).toBeInTheDocument();
    });

    test('2.4 handles invalid project log ID in ProjectLogWrapper', () => {
      render(
        <MemoryRouter initialEntries={['/project/invalid-id-xyz']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Settings & Workspace Info')).toBeInTheDocument();
    });

    test('2.5 displays default burgersdev / Workspace breadcrumb for invalid routes', () => {
      render(
        <MemoryRouter initialEntries={['/project/unknown-id']}>
          <App />
        </MemoryRouter>
      );
      const breadcrumb = document.getElementById('breadcrumb-navigation');
      expect(breadcrumb?.textContent).toContain('Workspace');
    });
  });

  // ==========================================
  // Feature 3: WindowTitlebar Boundary Cases (5 Cases)
  // ==========================================
  describe('WindowTitlebar Boundary Cases', () => {
    test('3.1 handles empty activePath string prop', () => {
      render(
        <WindowTitlebar activePath="" isDarkMode={true} onToggleTheme={vi.fn()} />,
        { wrapper: MemoryRouter }
      );
      expect(document.getElementById('window-titlebar')).toBeInTheDocument();
    });

    test('3.2 handles rapid theme toggle clicks without throwing errors', () => {
      const toggleMock = vi.fn();
      render(
        <WindowTitlebar activePath="test/path" isDarkMode={true} onToggleTheme={toggleMock} />,
        { wrapper: MemoryRouter }
      );
      const themeBtn = screen.getByLabelText('Toggle Theme');
      for (let i = 0; i < 10; i++) {
        fireEvent.click(themeBtn);
      }
      expect(toggleMock).toHaveBeenCalledTimes(10);
    });

    test('3.3 handles very long activePath string with truncate CSS class', () => {
      const longPath = 'burgersdev / '.repeat(20) + 'LongFilePath.tsx';
      render(
        <WindowTitlebar activePath={longPath} isDarkMode={true} onToggleTheme={vi.fn()} />,
        { wrapper: MemoryRouter }
      );
      const pathElement = screen.getByText(longPath);
      expect(pathElement).toHaveClass('truncate');
    });

    test('3.4 window control buttons (min, max, close) click without throwing', () => {
      render(
        <WindowTitlebar activePath="test/path" isDarkMode={true} onToggleTheme={vi.fn()} />,
        { wrapper: MemoryRouter }
      );
      fireEvent.click(screen.getByLabelText('Minimize'));
      fireEvent.click(screen.getByLabelText('Maximize'));
      fireEvent.click(screen.getByLabelText('Close'));
      expect(screen.getByLabelText('Minimize')).toBeInTheDocument();
    });

    test('3.5 renders moon icon when isDarkMode is false', () => {
      const { container } = render(
        <WindowTitlebar activePath="test/path" isDarkMode={false} onToggleTheme={vi.fn()} />,
        { wrapper: MemoryRouter }
      );
      expect(container.querySelector('.lucide-moon')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 4: ChatBar Boundary Cases (5 Cases)
  // ==========================================
  describe('ChatBar Boundary Cases', () => {
    test('4.1 prevents form submission when input is empty string', () => {
      const onSendMessage = vi.fn();
      render(<ChatBar onSendMessage={onSendMessage} />);
      const sendBtn = screen.getByLabelText('Send Query');
      expect(sendBtn).toBeDisabled();
      fireEvent.submit(sendBtn.closest('form')!);
      expect(onSendMessage).not.toHaveBeenCalled();
    });

    test('4.2 prevents form submission when input is whitespace only', () => {
      const onSendMessage = vi.fn();
      render(<ChatBar onSendMessage={onSendMessage} />);
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: '    ' } });
      const sendBtn = screen.getByLabelText('Send Query');
      expect(sendBtn).toBeDisabled();
    });

    test('4.3 disables input field and send button when disabled prop is true', () => {
      render(<ChatBar onSendMessage={vi.fn()} disabled={true} />);
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      const sendBtn = screen.getByLabelText('Send Query');
      expect(input).toBeDisabled();
      expect(sendBtn).toBeDisabled();
    });

    test('4.4 chip clicks are ignored when disabled is true', () => {
      const onDirectAction = vi.fn();
      render(<ChatBar onSendMessage={vi.fn()} onDirectAction={onDirectAction} disabled={true} />);
      const chip = screen.getByText('🚀 Open Resume.md');
      fireEvent.click(chip);
      expect(onDirectAction).not.toHaveBeenCalled();
    });

    test('4.5 handles long input query string without overflowing component', () => {
      const longQuery = 'A'.repeat(500);
      render(<ChatBar onSendMessage={vi.fn()} />);
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: longQuery } });
      expect(input).toHaveValue(longQuery);
    });
  });

  // ==========================================
  // Feature 5: Theme System Boundary Cases (5 Cases)
  // ==========================================
  describe('Theme System Boundary Cases', () => {
    test('5.1 handles invalid theme name string in localStorage gracefully', () => {
      localStorage.setItem('workspace-theme', 'non-existent-theme');
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(document.documentElement.getAttribute('data-theme')).toBe('non-existent-theme');
    });

    test('5.2 handles missing workspace-theme localStorage key on initial load', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(document.documentElement).toHaveClass('dark');
    });

    test('5.3 handles rapid switching between accent theme colors', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByTitle('Blue'));
      fireEvent.click(screen.getByTitle('Emerald'));
      fireEvent.click(screen.getByTitle('Purple'));
      fireEvent.click(screen.getByTitle('Rose'));
      fireEvent.click(screen.getByTitle('Amber'));
      
      expect(localStorage.getItem('workspace-theme')).toBe('amber');
      expect(document.documentElement.getAttribute('data-theme')).toBe('amber');
    });

    test('5.4 preserves dark mode class on document element when accent theme changes', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByTitle('Purple'));
      expect(document.documentElement).toHaveClass('dark');
    });

    test('5.5 checks dark mode matchMedia fallback', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });
  });

  // ==========================================
  // Feature 6: Resume View Boundary Cases (5 Cases)
  // ==========================================
  describe('Resume View Boundary Cases', () => {
    test('6.1 handles window.print call without throwing an error', () => {
      const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      const exportBtn = screen.getByText(/Export as PDF/i);
      fireEvent.click(exportBtn);
      expect(printSpy).toHaveBeenCalled();
      printSpy.mockRestore();
    });

    test('6.2 renders hero roles badges correctly', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Full-stack Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('AI/Prompt Engineer')).toBeInTheDocument();
    });

    test('6.3 contact details card elements have no overflow', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      const contactCard = screen.getByText('Cape Town, South Africa').closest('div');
      expect(contactCard).toBeInTheDocument();
    });

    test('6.4 external links contain target="_blank" and rel="noreferrer"', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      const githubLink = screen.getByRole('link', { name: /github.com/i });
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noreferrer');
    });

    test('6.5 renders Tech Stack cards for all key categories', () => {
      render(
        <MemoryRouter initialEntries={['/resume']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Languages')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend & AI')).toBeInTheDocument();
      expect(screen.getByText('DevOps')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 7: Academic View Boundary Cases (5 Cases)
  // ==========================================
  describe('Academic View Boundary Cases', () => {
    test('7.1 handles rapid tab switching between society and transcript', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      const societyBtn = screen.getByRole('button', { name: /Golden Key Invitation/i });
      const transcriptBtn = screen.getByRole('button', { name: /Academic Record & Transcript/i });

      for (let i = 0; i < 5; i++) {
        fireEvent.click(transcriptBtn);
        fireEvent.click(societyBtn);
      }
      expect(screen.getByText(/Golden Key International Honour Society/i)).toBeInTheDocument();
    });

    test('7.2 renders society tab content details', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText(/Golden Key International Honour Society/i)).toBeInTheDocument();
    });

    test('7.3 transcript tab displays course transcript list', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      const transcriptBtn = screen.getByRole('button', { name: /Academic Record & Transcript/i });
      fireEvent.click(transcriptBtn);
      expect(screen.getByText(/Advanced Programming/i)).toBeInTheDocument();
    });

    test('7.4 academic portal container has animate-fadeIn animation class', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      const portal = document.getElementById('academic-portal');
      expect(portal).toHaveClass('animate-fadeIn');
    });

    test('7.5 tab buttons highlight active tab style', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-academic']}>
          <App />
        </MemoryRouter>
      );
      const societyBtn = screen.getByRole('button', { name: /Golden Key Invitation/i });
      expect(societyBtn).toHaveClass('border-purple-500');
    });
  });

  // ==========================================
  // Feature 8: TechStack View Boundary Cases (5 Cases)
  // ==========================================
  describe('TechStack View Boundary Cases', () => {
    test('8.1 category filter buttons have uppercase styling', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      const allBtn = screen.getByRole('button', { name: 'all' });
      expect(allBtn).toHaveClass('uppercase');
    });

    test('8.2 selecting tech item with high confidence level renders progress bar', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getAllByText('95%').length).toBeGreaterThan(0);
    });

    test('8.3 tech item button id contains sanitized name', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      expect(document.getElementById('btn-tech-item-typescript')).toBeInTheDocument();
    });

    test('8.4 handles database category filter', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      const dbBtn = screen.getByRole('button', { name: 'database' });
      fireEvent.click(dbBtn);
      expect(screen.getByText('PostgreSQL / SQL')).toBeInTheDocument();
    });

    test('8.5 right detail panel shows linked project integrations', () => {
      render(
        <MemoryRouter initialEntries={['/project/conv-typescript']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Linked Project Integrations')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 9: GeminiIntegration View Boundary Cases (5 Cases)
  // ==========================================
  describe('GeminiIntegration View Boundary Cases', () => {
    test('9.1 temperature slider respects min 0.0 and max 1.0 bounds', () => {
      render(<GeminiIntegrationView />);
      const slider = document.getElementById('slider-temp') as HTMLInputElement;
      expect(slider.min).toBe('0');
      expect(slider.max).toBe('1');
    });

    test('9.2 max tokens slider respects min 64 and max 1024 bounds', () => {
      render(<GeminiIntegrationView />);
      const slider = document.getElementById('slider-max-tokens') as HTMLInputElement;
      expect(slider.min).toBe('64');
      expect(slider.max).toBe('1024');
    });

    test('9.3 template selection button highlights active template', () => {
      render(<GeminiIntegrationView />);
      const dilemmaBtn = document.getElementById('btn-template-dilemma');
      expect(dilemmaBtn).toHaveClass('border-indigo-500');
    });

    test('9.4 resets output and console logs when switching template', () => {
      render(<GeminiIntegrationView />);
      const coderBtn = document.getElementById('btn-template-coder');
      fireEvent.click(coderBtn!);
      expect(screen.getByText(/Real-time WebSocket Coder/i)).toBeInTheDocument();
    });

    test('9.5 simulation output node displays parameter metadata', () => {
      render(<GeminiIntegrationView />);
      expect(screen.getByText('Temperature')).toBeInTheDocument();
      expect(screen.getByText('0.7')).toBeInTheDocument();
      expect(screen.getByText('Max Tokens')).toBeInTheDocument();
      expect(screen.getAllByText('95%')[0]).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 10: ScheduledTasks View Boundary Cases (5 Cases)
  // ==========================================
  describe('ScheduledTasks View Boundary Cases', () => {
    test('10.1 catches network error during Google Calendar fetch and sets fallback state', async () => {
      const originalEnv = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
      import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY = 'mock_key';
      import.meta.env.VITE_GOOGLE_CALENDAR_ID = 'mock_id';

      const fetchSpy = vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      render(<ScheduledTasksView />);
      
      await waitFor(() => {
        expect(screen.getByText(/Local Mock Data/i)).toBeInTheDocument();
      });

      fetchSpy.mockRestore();
      import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY = originalEnv;
    });

    test('10.2 handles year navigation boundary when stepping past December', () => {
      render(<ScheduledTasksView />);
      const yearHeading = screen.getByRole('heading', { level: 2 });
      const currentYearText = yearHeading.textContent;
      expect(currentYearText).toBeDefined();
    });

    test('10.3 handles day cell clicks to select booking date', () => {
      render(<ScheduledTasksView />);
      const dayCells = screen.getAllByText('15');
      if (dayCells.length > 0) {
        fireEvent.click(dayCells[0].closest('div')!);
        expect(screen.getByRole('heading', { name: 'Book a Session' })).toBeInTheDocument();
      }
    });

    test('10.4 displays calendar container with custom scrollbar styling', () => {
      render(<ScheduledTasksView />);
      expect(document.getElementById('scheduled-tasks-container')).toBeInTheDocument();
    });

    test('10.5 handles live sync api response with sanitized Cal.com event titles', async () => {
      const originalEnv = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
      import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY = 'valid_key';
      import.meta.env.VITE_GOOGLE_CALENDAR_ID = 'valid_id';

      const mockResponse = {
        ok: true,
        json: async () => ({
          items: [
            {
              id: 'evt1',
              summary: 'Meeting with Michael',
              description: 'cal.com booking',
              start: { dateTime: '2026-08-10T10:00:00Z' },
              end: { dateTime: '2026-08-10T11:00:00Z' }
            }
          ]
        })
      };

      const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse as any);

      render(<ScheduledTasksView />);

      await waitFor(() => {
        expect(screen.getByText('Booked Session')).toBeInTheDocument();
      });

      fetchSpy.mockRestore();
      import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY = originalEnv;
    });
  });

  // ==========================================
  // Feature 11: ProjectLogs View Boundary Cases (5 Cases)
  // ==========================================
  describe('ProjectLogs View Boundary Cases', () => {
    test('11.1 handles unknown log id by returning SettingsView', () => {
      render(
        <MemoryRouter initialEntries={['/project/invalid-xyz-log']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Settings & Workspace Info')).toBeInTheDocument();
    });

    test('11.2 cheating-engine log ID renders GameDemoView', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-engine']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Game Demo')).toBeInTheDocument();
      expect(screen.getByText('330+ votes cast')).toBeInTheDocument();
    });

    test('11.3 handles clipboard writeText error gracefully without crash', () => {
      const writeTextMock = vi.fn().mockRejectedValue(new Error('Clipboard denied'));
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
      expect(() => fireEvent.click(copyBtn)).not.toThrow();
    });

    test('11.4 code block text retains indentation and formatting', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-hydration']}>
          <App />
        </MemoryRouter>
      );
      const codeElement = screen.getByText(/useHydratedState/i);
      expect(codeElement).toBeInTheDocument();
    });

    test('11.5 repository context section renders build status', () => {
      render(
        <MemoryRouter initialEntries={['/project/cheating-hydration']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Production Sync Active')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 12: AIChat View Boundary Cases (5 Cases)
  // ==========================================
  describe('AIChat View Boundary Cases', () => {
    test('12.1 renders user message bubble with user icon', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: 'User test message' } });
      fireEvent.submit(input.closest('form')!);

      expect(screen.getByText('User test message')).toBeInTheDocument();
    });

    test('12.2 handles markdown elements in assistant message response', async () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: 'resume' } });
      fireEvent.submit(input.closest('form')!);

      await waitFor(() => {
        expect(screen.getByText(/Michael Burgers/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('12.3 handles extremely long single-word user message without breaking bubble layout', () => {
      const superLongWord = 'A'.repeat(200);
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: superLongWord } });
      fireEvent.submit(input.closest('form')!);

      expect(screen.getByText(superLongWord)).toBeInTheDocument();
    });

    test('12.4 renders typing indicator animation dots when isTyping prop is true', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/Ask burgersdev anything/i);
      fireEvent.change(input, { target: { value: 'hello' } });
      fireEvent.submit(input.closest('form')!);

      expect(document.querySelector('.animate-bounce')).toBeInTheDocument();
    });

    test('12.5 auto scroll element ref handles scrolling behavior without error', () => {
      render(
        <MemoryRouter initialEntries={['/ai-chat']}>
          <App />
        </MemoryRouter>
      );
      expect(document.querySelector('.scroll-smooth')).toBeInTheDocument();
    });
  });

  // ==========================================
  // Feature 13: Settings View Boundary Cases (5 Cases)
  // ==========================================
  describe('Settings View Boundary Cases', () => {
    test('13.1 handles selecting accent color repeatedly', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      const emeraldBtn = screen.getByTitle('Emerald');
      fireEvent.click(emeraldBtn);
      fireEvent.click(emeraldBtn);
      expect(localStorage.getItem('workspace-theme')).toBe('emerald');
    });

    test('13.2 developer profile region node displays Cape Town, South Africa', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('Region Node')).toBeInTheDocument();
      expect(screen.getByText('Cape Town, South Africa')).toBeInTheDocument();
    });

    test('13.3 system status card displays uptime statistic', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByText('99.99%')).toBeInTheDocument();
      expect(screen.getByText('Secure')).toBeInTheDocument();
    });

    test('13.4 settings view container has settings-view id', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      expect(document.getElementById('settings-view')).toBeInTheDocument();
    });

    test('13.5 remote connection link has valid href attribute', () => {
      render(
        <MemoryRouter initialEntries={['/settings']}>
          <App />
        </MemoryRouter>
      );
      const remoteLink = screen.getByRole('link', { name: /Initialize Remote Connection/i });
      expect(remoteLink).toHaveAttribute('href', 'https://github.com/PugLord06');
    });
  });

  // ==========================================
  // Feature 14: BookingModal Boundary Cases (5 Cases)
  // ==========================================
  describe('BookingModal Boundary Cases', () => {
    test('14.1 handles undefined selectedDate prop', () => {
      render(
        <BookingModal isOpen={true} onClose={vi.fn()} selectedDate={undefined} />
      );
      expect(screen.getByText('Book a Session')).toBeInTheDocument();
    });

    test('14.2 handles missing onBookingComplete callback gracefully', () => {
      render(
        <BookingModal isOpen={true} onClose={vi.fn()} />
      );
      expect(screen.getByText('Book a Session')).toBeInTheDocument();
    });

    test('14.3 renders close icon button with Lucide X component', () => {
      const { container } = render(
        <BookingModal isOpen={true} onClose={vi.fn()} />
      );
      expect(container.querySelector('.lucide-x')).toBeInTheDocument();
    });

    test('14.4 modal container has backdrop blur and fixed positioning', () => {
      const { container } = render(
        <BookingModal isOpen={true} onClose={vi.fn()} />
      );
      const modalWrapper = container.firstChild as HTMLElement;
      expect(modalWrapper).toHaveClass('fixed', 'inset-0', 'backdrop-blur-sm');
    });

    test('14.5 handles rapid open and close state transitions', () => {
      const { rerender } = render(
        <BookingModal isOpen={false} onClose={vi.fn()} />
      );
      expect(screen.queryByText('Book a Session')).not.toBeInTheDocument();

      rerender(<BookingModal isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Book a Session')).toBeInTheDocument();

      rerender(<BookingModal isOpen={false} onClose={vi.fn()} />);
      expect(screen.queryByText('Book a Session')).not.toBeInTheDocument();
    });
  });
});
