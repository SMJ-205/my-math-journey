"use client";

import { useState, useEffect } from "react";

// Pages
import { MainMenuPage }     from "@/components/pages/MainMenuPage";
import { ProfileSelectPage } from "@/components/pages/ProfileSelectPage";
import { GradeSelectPage }  from "@/components/pages/GradeSelectPage";
import { TopicSelectPage }  from "@/components/pages/TopicSelectPage";
import { SessionPlayer }    from "@/components/session/SessionPlayer";
import { SessionReportPage } from "@/components/report/SessionReport";

// Stores / data
import { useProfileStore }  from "@/store/profileStore";
import { useSessionStore }  from "@/store/sessionStore";
import { getQuestionsByGradeAndTopic } from "@/content/questions/questionBank";
import { gradeConfigs, sessionConfig } from "@/config/curriculum.config";

type AppView =
  | "main-menu"
  | "profile-select"
  | "grade-select"
  | "topic-select"
  | "session"
  | "report";

export default function App() {
  const [view, setView]               = useState<AppView>("main-menu");
  const [selectedGrade, setGrade]     = useState(1);
  const [selectedTopic, setTopic]     = useState("");
  const [questionIds, setQIds]        = useState<string[]>([]);
  const [sessionStartedAt, setSAt]    = useState("");
  const [sessionId, setSId]           = useState("");

  const { profiles, activeProfileId } = useProfileStore();
  const { resetSession }              = useSessionStore();

  const activeProfile = profiles.find((p) => p.id === activeProfileId);

  // Hard stop any ongoing speech synthesis whenever the page/view changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [view]);

  // ── Navigation helpers ───────────────────────────────────────────────────

  const goTo = (v: AppView) => setView(v);

  const startSession = (grade: number, topic: string) => {
    const cfg = gradeConfigs.find((g) => g.grade === grade);
    const phase = cfg?.phase ?? "A";
    const sessCfg = sessionConfig[phase];
    const qs = getQuestionsByGradeAndTopic(grade, topic, 1).slice(0, sessCfg.maxQuestions);
    if (qs.length === 0) return;
    setGrade(grade);
    setTopic(topic);
    setQIds(qs.map((q) => q.id));
    setSAt(new Date().toISOString());
    setSId(`sess-${Date.now()}`);
    goTo("session");
  };

  const gradeConfig = gradeConfigs.find((g) => g.grade === selectedGrade);
  const phase = gradeConfig?.phase ?? "A";
  const showTimer = sessionConfig[phase]?.showTimer ?? false;

  // ── View router ──────────────────────────────────────────────────────────

  if (view === "session" && activeProfileId) {
    return (
      <SessionPlayer
        questionIds={questionIds}
        profileId={activeProfileId}
        grade={selectedGrade}
        topic={selectedTopic}
        tier={1}
        showTimer={showTimer}
        onSessionComplete={() => goTo("report")}
        onGoHome={() => { resetSession(); goTo("main-menu"); }}
        onGoTopics={() => { resetSession(); goTo("topic-select"); }}
      />
    );
  }

  if (view === "report" && activeProfileId) {
    return (
      <SessionReportPage
        profileId={activeProfileId}
        grade={selectedGrade}
        topic={selectedTopic}
        tier={1}
        startedAt={sessionStartedAt}
        sessionId={sessionId}
        onPlayAgain={() => { resetSession(); goTo("topic-select"); }}
        onGoHome={() => { resetSession(); goTo("main-menu"); }}
      />
    );
  }

  if (view === "profile-select") {
    return (
      <ProfileSelectPage
        onBack={() => goTo("main-menu")}
        onProfileSelected={() => goTo("grade-select")}
      />
    );
  }

  if (view === "grade-select") {
    return (
      <GradeSelectPage
        profileGrade={activeProfile?.grade ?? 1}
        profileName={activeProfile?.nickname ?? "Kamu"}
        onBack={() => goTo("profile-select")}
        onSelectGrade={(g) => { setGrade(g); goTo("topic-select"); }}
      />
    );
  }

  if (view === "topic-select") {
    return (
      <TopicSelectPage
        grade={selectedGrade}
        onBack={() => goTo("grade-select")}
        onSelectTopic={(t) => startSession(selectedGrade, t)}
      />
    );
  }

  // Default: main menu
  return (
    <MainMenuPage
      onStart={() => goTo("profile-select")}
    />
  );
}
