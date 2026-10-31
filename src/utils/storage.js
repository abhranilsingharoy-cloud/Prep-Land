// Persistent local storage manager for Prep Land

const STORAGE_KEYS = {
  PROFILE: 'prepland_student_profile',
  STREAK: 'prepland_streak_data',
  BOOKMARKS: 'prepland_bookmarked_items',
  COMPLETED_DSA: 'prepland_completed_dsa',
  TEST_HISTORY: 'prepland_mock_history',
  POMODORO: 'prepland_pomodoro_stats',
  CUSTOM_FLASHCARDS: 'prepland_custom_flashcards'
};

export const getStoredProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    name: 'Aman Sharma',
    targetExam: 'sde-campus',
    examTitle: 'Campus Placement SDE & SSC CGL 2026',
    targetDate: '2026-12-15',
    dailyGoalMinutes: 180,
    weakTopics: ['Pipes & Cisterns', 'Circular Seating', 'Dynamic Programming']
  };
};

export const saveStoredProfile = (profile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {}
};

export const getStoredStreak = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    streakDays: 6,
    lastActiveDate: new Date().toISOString().split('T')[0],
    questionsSolvedToday: 16,
    dailyTarget: 20
  };
};

export const incrementDailyQuestions = (count = 1) => {
  try {
    const data = getStoredStreak();
    const today = new Date().toISOString().split('T')[0];
    if (data.lastActiveDate !== today) {
      data.streakDays += 1;
      data.lastActiveDate = today;
      data.questionsSolvedToday = count;
    } else {
      data.questionsSolvedToday += count;
    }
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(data));
    return data;
  } catch (e) {
    return { streakDays: 6, questionsSolvedToday: 16, dailyTarget: 20 };
  }
};

export const getStoredBookmarks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
};

export const toggleStoredBookmark = (item) => {
  try {
    const current = getStoredBookmarks();
    const exists = current.some((b) => b.id === item.id);
    let updated;
    if (exists) {
      updated = current.filter((b) => b.id !== item.id);
    } else {
      updated = [...current, { ...item, bookmarkedAt: new Date().toISOString() }];
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const exportTextFile = (filename, content) => {
  try {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Export failed:', e);
  }
};
