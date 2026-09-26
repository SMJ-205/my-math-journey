import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChildProfile {
  id: string;
  nickname: string;
  avatarId: string;
  grade: number;
  starsTotal: number;
  starsPerGrade?: Record<number, number>;
  createdAt: string;
}

interface ProfileStore {
  profiles: ChildProfile[];
  activeProfileId: string | null;
  setActiveProfile: (id: string) => void;
  addProfile: (profile: Omit<ChildProfile, "id" | "createdAt" | "starsTotal">) => void;
  updateProfile: (id: string, updates: Partial<ChildProfile>) => void;
  removeProfile: (id: string) => void;
  addStars: (profileId: string, count: number, grade?: number) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profiles: [],
      activeProfileId: null,

      setActiveProfile: (id) => set({ activeProfileId: id }),

      addProfile: (profileData) =>
        set((state) => ({
          profiles: [
            ...state.profiles,
            {
              ...profileData,
              id: `profile-${Date.now()}`,
              starsTotal: 0,
              starsPerGrade: {},
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateProfile: (id, updates) =>
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      removeProfile: (id) =>
        set((state) => ({
          profiles: state.profiles.filter((p) => p.id !== id),
          activeProfileId:
            state.activeProfileId === id ? null : state.activeProfileId,
        })),

      addStars: (profileId, count, grade) =>
        set((state) => ({
          profiles: state.profiles.map((p) => {
            if (p.id !== profileId) return p;
            const effectiveGrade = grade ?? p.grade;
            const currentPerGrade = p.starsPerGrade ?? {};
            const prevGradeStars = currentPerGrade[effectiveGrade] ?? 0;
            return {
              ...p,
              starsTotal: (p.starsTotal ?? 0) + count,
              starsPerGrade: {
                ...currentPerGrade,
                [effectiveGrade]: prevGradeStars + count,
              },
            };
          }),
        })),
    }),
    {
      name: "mmj-profiles",
      version: 1,
    }
  )
);
