"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProfileStore, ChildProfile } from "@/store/profileStore";
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/translations";
import { PageHeader } from "@/components/shared/PageHeader";
import { UserPlus, ChevronRight, Trash2 } from "lucide-react";

const AVATARS = ["A", "B", "C", "D", "E", "F"];
const AVATAR_COLORS = [
  "bg-yellow-200 text-yellow-700 border-yellow-300",
  "bg-pink-200 text-pink-700 border-pink-300",
  "bg-green-200 text-green-700 border-green-300",
  "bg-blue-200 text-blue-700 border-blue-300",
  "bg-purple-200 text-purple-700 border-purple-300",
  "bg-orange-200 text-orange-700 border-orange-300",
];

function avatarColor(avatarId: string) {
  const idx = AVATARS.indexOf(avatarId);
  return AVATAR_COLORS[idx >= 0 ? idx : 0];
}

function Avatar({ avatarId, initial, size = "lg" }: { avatarId: string; initial: string; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-14 h-14 text-xl" : "w-9 h-9 text-sm";
  return (
    <div className={`${dim} rounded-full border-2 flex items-center justify-center font-black ${avatarColor(avatarId)}`}>
      {initial}
    </div>
  );
}

function AddProfileModal({ onClose }: { onClose: () => void }) {
  const addProfile = useProfileStore((s) => s.addProfile);
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;
  const [name, setName] = useState("");
  const [avatarId, setAvatarId] = useState("A");

  const handleSubmit = () => {
    if (!name.trim()) return;
    addProfile({ nickname: name.trim(), grade: 1, avatarId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm flex flex-col gap-5"
      >
        <h2 className="font-fredoka text-2xl font-semibold text-gray-800 text-center">
          {t.createProfile}
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-gray-500">{t.nicknameLabel}</label>
          <input
            id="input-nickname"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.nicknamePlaceholder}
            className="border-2 border-gray-200 focus:border-amber-400 rounded-xl px-4 py-3 text-lg outline-none transition-colors"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-500">{t.chooseAvatar}</label>
          <div className="flex gap-2">
            {AVATARS.map((av, i) => (
              <button
                key={av}
                type="button"
                onClick={() => setAvatarId(av)}
                aria-label={`Avatar warna ${i + 1}`}
                className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${AVATAR_COLORS[i]} ${
                  avatarId === av ? "ring-4 ring-amber-400 ring-offset-2 scale-110 shadow-sm" : "hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            id="btn-cancel-profile"
            onClick={onClose}
            className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all cursor-pointer"
          >
            {t.cancel}
          </button>
          <button
            id="btn-save-profile"
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-3 rounded-full bg-amber-400 text-white font-bold hover:bg-amber-500 transition-all disabled:opacity-40 cursor-pointer"
          >
            {t.saveProfile}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface ProfileSelectPageProps {
  onBack: () => void;
  onProfileSelected: (profileId: string) => void;
}

export function ProfileSelectPage({ onBack, onProfileSelected }: ProfileSelectPageProps) {
  const { profiles, activeProfileId, setActiveProfile, removeProfile } = useProfileStore();
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (p: ChildProfile) => {
    setActiveProfile(p.id);
    onProfileSelected(p.id);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      <PageHeader showBack onBack={onBack} title={t.profileTitle} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        <div>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            {t.whoIsPlaying}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {t.whoIsPlayingSub}
          </p>
        </div>

        {/* Profile list */}
        <div className="flex flex-col gap-3">
          {profiles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer
                ${activeProfileId === p.id
                  ? "border-amber-400 bg-amber-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-amber-200 hover:bg-amber-50/40"}
              `}
              onClick={() => handleSelect(p)}
            >
              <Avatar avatarId={p.avatarId} initial={p.nickname[0]} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-800 text-lg leading-tight truncate">
                  {p.nickname}
                </p>
                <p className="text-sm text-gray-500">
                  {p.starsTotal} {language === "en" ? "stars earned" : "bintang diraih"}
                </p>
              </div>
              <button
                id={`btn-delete-${p.id}`}
                onClick={(e) => { e.stopPropagation(); removeProfile(p.id); }}
                className="p-2 rounded-full text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all cursor-pointer"
                aria-label="Hapus profil"
              >
                <Trash2 size={16} />
              </button>
              <ChevronRight size={20} className="text-gray-300 flex-shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* Add profile button */}
        {profiles.length < 5 && (
          <button
            id="btn-add-profile"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/60 hover:bg-amber-50 transition-all text-amber-600 font-bold text-base cursor-pointer"
          >
            <UserPlus size={22} />
            {t.createProfile}
          </button>
        )}
      </main>

      {showModal && <AddProfileModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
