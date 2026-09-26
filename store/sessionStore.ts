import { create } from "zustand";

export interface Answer {
  questionId: string;
  chosenValue: string;
  correct: boolean;
  timeMs: number;
  hintUsed: boolean;
  misconceptionTag?: string;
}

export interface SessionState {
  sessionId: string | null;
  profileId: string | null;
  grade: number;
  topic: string;
  tier: number;
  questions: string[]; // ordered list of questionIds
  currentIndex: number;
  answers: Answer[];
  startedAt: string | null;
  consecutiveWrong: number;
  showSmartSteps: boolean;
  status: "idle" | "running" | "complete";
}

interface SessionActions {
  startSession: (params: { profileId: string; grade: number; topic: string; tier: number; questionIds: string[] }) => void;
  submitAnswer: (answer: Omit<Answer, never>) => void;
  showHint: () => void;
  dismissHint: () => void;
  nextQuestion: () => void;
  endSession: () => void;
  resetSession: () => void;
}

const initialState: SessionState = {
  sessionId: null,
  profileId: null,
  grade: 1,
  topic: "",
  tier: 1,
  questions: [],
  currentIndex: 0,
  answers: [],
  startedAt: null,
  consecutiveWrong: 0,
  showSmartSteps: false,
  status: "idle",
};

export const useSessionStore = create<SessionState & SessionActions>((set, get) => ({
  ...initialState,

  startSession: ({ profileId, grade, topic, tier, questionIds }) =>
    set({
      sessionId: `sess-${Date.now()}`,
      profileId,
      grade,
      topic,
      tier,
      questions: questionIds,
      currentIndex: 0,
      answers: [],
      startedAt: new Date().toISOString(),
      consecutiveWrong: 0,
      showSmartSteps: false,
      status: "running",
    }),

  submitAnswer: (answer) =>
    set((state) => {
      const newAnswers = [...state.answers, answer];
      const newConsecutiveWrong = answer.correct ? 0 : state.consecutiveWrong + 1;
      const showSmartSteps = newConsecutiveWrong >= 2;
      return { answers: newAnswers, consecutiveWrong: newConsecutiveWrong, showSmartSteps };
    }),

  showHint: () => set({ showSmartSteps: true }),
  dismissHint: () => set({ showSmartSteps: false, consecutiveWrong: 0 }),

  nextQuestion: () =>
    set((state) => {
      const next = state.currentIndex + 1;
      if (next >= state.questions.length) {
        return { status: "complete", showSmartSteps: false };
      }
      return { currentIndex: next, showSmartSteps: false };
    }),

  endSession: () => set({ status: "complete" }),
  resetSession: () => set(initialState),
}));
