"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { useLanguageStore } from "@/store/languageStore";
import { translations, getQuestionText, getHintText } from "@/lib/translations";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { getQuestionById, Question } from "@/content/questions/questionBank";
import { SimulatorRenderer } from "@/components/simulators/SimulatorRenderer";
import { Lightbulb, ChevronRight, Volume2, ArrowLeft, BookOpen, AlertCircle, Home } from "lucide-react";

interface AnswerFeedback {
  chosen: string;
  correct: boolean;
}

function SessionProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = Math.round(((current + 1) / total) * 100);

  return (
    <div className="flex-1 flex items-center gap-2 min-w-0">
      <div className="flex-1 h-2.5 sm:h-3 bg-amber-100 rounded-full overflow-hidden border border-amber-200/80 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs sm:text-sm font-bold text-amber-900/80 whitespace-nowrap tabular-nums flex-shrink-0">
        {current + 1}/{total}
      </span>
    </div>
  );
}

function SmartStepsCard({
  hint,
  title,
  buttonText,
  onDismiss,
}: {
  hint: string;
  title: string;
  buttonText: string;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 16 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Lightbulb size={22} className="text-amber-500" />
          </div>
          <h3 className="font-fredoka text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap">{hint}</p>
        <button
          id="btn-dismiss-hint"
          onClick={onDismiss}
          className="w-full py-3 rounded-full bg-amber-400 text-white font-bold text-lg hover:bg-amber-500 active:scale-95 transition-all cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
}

function AnswerButton({
  value,
  onClick,
  feedback,
  disabled,
}: {
  value: string;
  onClick: () => void;
  feedback?: "correct" | "wrong" | null;
  disabled: boolean;
}) {
  const base =
    "w-full py-4 px-6 rounded-2xl border-4 font-black text-xl transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300";

  const variant =
    feedback === "correct"
      ? "bg-green-100 border-green-400 text-green-700"
      : feedback === "wrong"
      ? "bg-red-100 border-red-400 text-red-700 shake"
      : "bg-white border-gray-200 text-gray-800 hover:border-amber-300 hover:bg-amber-50";

  return (
    <motion.button
      id={`answer-btn-${value}`}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variant}`}
      whileTap={{ scale: 0.97 }}
      layout
    >
      {value}
    </motion.button>
  );
}

interface SessionPlayerProps {
  questionIds: string[];
  profileId: string;
  grade: number;
  topic: string;
  tier: number;
  showTimer: boolean;
  onSessionComplete: () => void;
  onGoHome?: () => void;
  onGoTopics?: () => void;
}

export function SessionPlayer({
  questionIds,
  profileId,
  grade,
  topic,
  tier,
  showTimer,
  onSessionComplete,
  onGoHome,
  onGoTopics,
}: SessionPlayerProps) {
  const {
    currentIndex,
    showSmartSteps,
    submitAnswer,
    dismissHint,
    nextQuestion,
    status,
    startSession,
  } = useSessionStore();

  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;

  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [elapsedSecs, setElapsedSecs] = useState(0);
  const [pendingExit, setPendingExit] = useState<"home" | "topics" | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start session on mount
  useEffect(() => {
    startSession({ profileId, grade, topic, tier, questionIds });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Elapsed timer (optional display)
  useEffect(() => {
    if (showTimer) {
      timerRef.current = setInterval(() => setElapsedSecs((s) => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [showTimer]);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hard stop speech helper
  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
        speechTimeoutRef.current = null;
      }
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Reset question timer when index changes & hard stop voice
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setFeedback(null);
    stopSpeaking();
  }, [currentIndex, stopSpeaking]);

  // Hard stop voice when language changes or component unmounts
  useEffect(() => {
    stopSpeaking();
    return () => {
      stopSpeaking();
    };
  }, [language, stopSpeaking]);

  // Hard stop voice when exit confirmation modal appears
  useEffect(() => {
    if (pendingExit !== null) {
      stopSpeaking();
    }
  }, [pendingExit, stopSpeaking]);

  // Redirect when session complete & hard stop voice
  useEffect(() => {
    if (status === "complete") {
      stopSpeaking();
      onSessionComplete();
    }
  }, [status, onSessionComplete, stopSpeaking]);

  const currentQ: Question | undefined = getQuestionById(questionIds[currentIndex]);
  const questionText = currentQ ? getQuestionText(currentQ, language) : "";
  const hintText = currentQ ? getHintText(currentQ, language) : "";

  // Typed-input simulators handle their own answer submission
  const isTypedInput =
    currentQ?.simulator.type === "column-arithmetic" ||
    currentQ?.simulator.type === "pattern-sequence" ||
    currentQ?.simulator.type === "word-problem-builder";

  // Path 1: multiple-choice answer (fruit-basket, circle-fraction)
  const handleAnswer = useCallback(
    (option: { value: string; isCorrect: boolean; misconceptionTag?: string }) => {
      if (feedback) return;
      stopSpeaking();
      const timeMs = Date.now() - questionStartTime;
      const isCorrect = option.isCorrect;

      setFeedback({ chosen: option.value, correct: isCorrect });

      submitAnswer({
        questionId: currentQ?.id ?? "",
        chosenValue: option.value,
        correct: isCorrect,
        timeMs,
        hintUsed: false,
        misconceptionTag: !isCorrect ? option.misconceptionTag : undefined,
      });

      setTimeout(() => nextQuestion(), isCorrect ? 1200 : 1800);
    },
    [feedback, questionStartTime, submitAnswer, nextQuestion, currentQ, stopSpeaking]
  );

  // Path 2: typed-input answer from simulator (column-arithmetic)
  const handleSimulatorAnswer = useCallback(
    (value: string, isCorrect: boolean, misconceptionTag?: string) => {
      stopSpeaking();
      const timeMs = Date.now() - questionStartTime;
      setFeedback({ chosen: value, correct: isCorrect });
      submitAnswer({
        questionId: currentQ?.id ?? "",
        chosenValue: value,
        correct: isCorrect,
        timeMs,
        hintUsed: false,
        misconceptionTag: !isCorrect ? misconceptionTag : undefined,
      });
      setTimeout(() => nextQuestion(), isCorrect ? 1400 : 2000);
    },
    [questionStartTime, submitAnswer, nextQuestion, currentQ, stopSpeaking]
  );

  // Enhanced speakQuestion: immediate cancel of previous audio, then start clean new voiceover
  const speakQuestion = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis || !questionText) return;

    // 1. Immediately hard stop ongoing voiceover
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }

    // 2. Buffer 40ms to allow browser speech engine to clear before starting replacement voice
    speechTimeoutRef.current = setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(questionText);
      utter.lang = language === "en" ? "en-US" : "id-ID";
      utter.rate = 0.95;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utter);
    }, 40);
  }, [questionText, language]);

  if (!currentQ) return null;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      {/* Session header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-amber-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex-1 flex items-center gap-2 sm:gap-2.5 min-w-0 mr-1 sm:mr-2">
            {onGoHome && (
              <button
                id="btn-session-back-home"
                onClick={() => setPendingExit("home")}
                className="w-9 h-9 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-all active:scale-95 border border-amber-200 cursor-pointer flex-shrink-0 shadow-xs"
                aria-label={t.mainMenu}
                title={t.mainMenu}
              >
                <Home size={17} />
              </button>
            )}
            {onGoTopics && (
              <button
                id="btn-session-back-topics"
                onClick={() => setPendingExit("topics")}
                className="w-9 h-9 rounded-full bg-white hover:bg-amber-50 text-amber-600 flex items-center justify-center transition-all active:scale-95 border border-gray-200 hover:border-amber-300 cursor-pointer flex-shrink-0 shadow-xs"
                aria-label={t.selectLesson}
                title={t.selectLesson}
              >
                <BookOpen size={17} />
              </button>
            )}
            <SessionProgressBar current={currentIndex} total={questionIds.length} />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageSwitch />
            {showTimer && (
              <span className="text-sm font-bold text-gray-400 tabular-nums">
                {formatTime(elapsedSecs)}
              </span>
            )}
            <button
              id="btn-show-hint"
              onClick={() => useSessionStore.getState().showHint()}
              className="flex items-center gap-1.5 text-amber-500 hover:text-amber-600 text-sm font-bold transition-colors cursor-pointer"
            >
              <Lightbulb size={16} />
              <span className="hidden sm:inline">{t.smartHint}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
        {/* Question text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col gap-4"
          >
            {/* Question card */}
            <div className="bg-white rounded-3xl shadow-md border border-amber-100 p-5 flex items-start gap-3">
              <button
                id="btn-tts"
                onClick={speakQuestion}
                className={`mt-0.5 p-2 rounded-full flex-shrink-0 transition-all cursor-pointer ${
                  isSpeaking
                    ? "bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse shadow-sm"
                    : "bg-amber-50 text-amber-500 hover:bg-amber-100 active:scale-95"
                }`}
                aria-label={t.listenQuestion}
                title={t.listenQuestion}
              >
                <Volume2 size={20} className={isSpeaking ? "scale-110 transition-transform" : ""} />
              </button>
              <p className="text-xl font-bold text-gray-800 leading-relaxed">
                {questionText}
              </p>
            </div>

            {/* Simulator canvas */}
            <div className="bg-white rounded-3xl shadow-md border border-amber-100 p-4">
              <SimulatorRenderer
                question={currentQ}
                onAnswer={isTypedInput ? handleSimulatorAnswer : undefined}
              />
            </div>

            {/* Answer options — hidden for typed-input simulators */}
            {!isTypedInput && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const fb =
                    feedback?.chosen === opt.value
                      ? feedback.correct
                        ? "correct"
                        : "wrong"
                      : null;
                  return (
                    <AnswerButton
                      key={opt.value}
                      value={opt.value}
                      onClick={() => handleAnswer(opt)}
                      feedback={fb}
                      disabled={!!feedback}
                    />
                  );
                })}
              </div>
            )}

            {/* Inline feedback strip */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-3 font-bold text-base ${
                    feedback.correct
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {feedback.correct ? (
                    <>
                      <span>{t.correctFeedback}</span>
                      <ChevronRight size={18} className="ml-auto" />
                    </>
                  ) : (
                    <span>{t.wrongFeedback}</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Smart Steps modal */}
      <AnimatePresence>
        {showSmartSteps && (
          <SmartStepsCard
            hint={hintText}
            title={t.smartHintTitle}
            buttonText={t.gotIt}
            onDismiss={dismissHint}
          />
        )}
      </AnimatePresence>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {pendingExit !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center gap-4 text-center border-2 border-amber-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                <AlertCircle size={32} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-fredoka text-xl font-bold text-gray-800">
                  {t.exitModalTitle}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t.exitModalDesc}
                </p>
              </div>
              <div className="flex gap-2.5 w-full pt-1">
                <button
                  id="btn-cancel-exit"
                  onClick={() => setPendingExit(null)}
                  className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 active:scale-95 transition-all text-sm cursor-pointer"
                >
                  {t.keepLearning}
                </button>
                <button
                  id="btn-confirm-exit"
                  onClick={() => {
                    stopSpeaking();
                    const target = pendingExit;
                    setPendingExit(null);
                    if (target === "home") onGoHome?.();
                    else if (target === "topics") onGoTopics?.();
                  }}
                  className="flex-1 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold active:scale-95 transition-all text-sm shadow-md cursor-pointer"
                >
                  {t.yesExit}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
