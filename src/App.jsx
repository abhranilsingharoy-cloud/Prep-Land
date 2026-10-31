import React, { useState } from 'react';
import { PrepLandProvider } from './context/PrepLandContext';
import SkillupSidebar from './components/SkillupSidebar';
import SkillupHeader from './components/SkillupHeader';
import SkillupDashboard from './components/SkillupDashboard';
import AptitudeEngine from './components/AptitudeEngine';
import PlacementHub from './components/PlacementHub';
import GovtExamHub from './components/GovtExamHub';
import MockTestSystem from './components/MockTestSystem';
import InterviewCoach from './components/InterviewCoach';
import ResumeOptimizer from './components/ResumeOptimizer';
import NotesAndFlashcards from './components/NotesAndFlashcards';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import AiChatbot from './components/AiChatbot';
import QuickSearchModal from './components/QuickSearchModal';
import InteractiveSolver from './components/InteractiveSolver';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mentorInitialPrompt, setMentorInitialPrompt] = useState('');

  const handleAskMentor = (promptText) => {
    setMentorInitialPrompt(promptText);
    setActiveTab('ai-chat');
  };

  return (
    <div className="min-h-screen bg-[#ebedf2] flex items-center justify-center p-2 md:p-6 lg:p-8 font-sans">
      {/* Glossy Modern Dashboard Card Container */}
      <div className="w-full max-w-[1600px] h-[94vh] bg-white rounded-[36px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.12)] border border-slate-200/80 flex flex-row">
        {/* Left Dark Glossy Sidebar (Real-time reactive) */}
        <SkillupSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#f9fafc] overflow-hidden">
          {/* Top Minimalist Header */}
          <SkillupHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Main Content Scrollport */}
          <main className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar">
            <div className="max-w-[1300px] mx-auto">
              {activeTab === 'dashboard' && (
                <SkillupDashboard setActiveTab={setActiveTab} />
              )}

              {activeTab === 'aptitude' && (
                <AptitudeEngine />
              )}

              {activeTab === 'solver' && (
                <InteractiveSolver />
              )}

              {activeTab === 'placements' && (
                <PlacementHub onAskMentor={handleAskMentor} />
              )}

              {activeTab === 'govt-exams' && (
                <GovtExamHub onAskMentor={handleAskMentor} />
              )}

              {activeTab === 'mock-tests' && (
                <MockTestSystem />
              )}

              {activeTab === 'interview-coach' && (
                <InterviewCoach onAskMentor={handleAskMentor} />
              )}

              {activeTab === 'resume-optimizer' && (
                <ResumeOptimizer />
              )}

              {activeTab === 'flashcards' && (
                <NotesAndFlashcards />
              )}

              {activeTab === 'analytics' && (
                <PerformanceAnalytics setActiveTab={setActiveTab} />
              )}

              {activeTab === 'ai-chat' && (
                <AiChatbot
                  initialPrompt={mentorInitialPrompt}
                  language="English"
                />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Global Spotlight Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PrepLandProvider>
      <MainApp />
    </PrepLandProvider>
  );
}
