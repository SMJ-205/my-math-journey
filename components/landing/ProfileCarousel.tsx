"use client";

import { useState } from "react";
import { useProfileStore, ChildProfile } from "@/store/profileStore";
import { UserPlus, ChevronLeft, ChevronRight } from "lucide-react";

const AVATARS = ["ayam", "kucing", "kelinci", "rubah", "beruang", "elang"];

const avatarColors: Record<string, string> = {
  ayam:    "bg-yellow-200 text-yellow-700",
  kucing:  "bg-pink-200 text-pink-700",
  kelinci: "bg-green-200 text-green-700",
  rubah:   "bg-blue-200 text-blue-700",
  beruang: "bg-purple-200 text-purple-700",
  elang:   "bg-orange-200 text-orange-700",
};

const avatarLabel: Record<string, string> = {
  ayam:    "Ayam",
  kucing:  "Kucing",
  kelinci: "Kelinci",
  rubah:   "Rubah",
  beruang: "Beruang",
  elang:   "Elang",
};

function AvatarCircle({ avatarId, size = "lg" }: { avatarId: string; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-16 h-16 text-2xl" : "w-10 h-10 text-base";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-bold ${avatarColors[avatarId] ?? "bg-gray-200 text-gray-600"}`}
    >
      {avatarLabel[avatarId]?.[0] ?? "?"}
    </div>
  );
}

function ProfileCard({
  profile,
  isActive,
  onClick,
}: {
  profile: ChildProfile;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      id={`profile-card-${profile.id}`}
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-2xl border-4 transition-all duration-200 min-w-[110px] cursor-pointer
        ${isActive
          ? "border-amber-400 bg-amber-50 shadow-lg scale-105"
          : "border-transparent bg-white/60 hover:border-amber-200 hover:bg-white/90"}
      `}
    >
      <AvatarCircle avatarId={profile.avatarId} size="lg" />
      <span className="font-bold text-gray-800 text-sm text-center leading-tight">
        {profile.nickname}
      </span>
      <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
        <span>Kelas {profile.grade}</span>
        <span className="mx-1">·</span>
        <span>{profile.starsTotal} bintang</span>
      </div>
    </button>
  );
}

function AddProfileModal({ onClose }: { onClose: () => void }) {
  const addProfile = useProfileStore((s) => s.addProfile);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(1);
  const [avatarId, setAvatarId] = useState("ayam");

  const handleSubmit = () => {
    if (!name.trim()) return;
    addProfile({ nickname: name.trim(), grade, avatarId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Tambah Profil Baru</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Nama panggilan</label>
          <input
            id="input-nickname"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Adi, Kak Sari"
            className="border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Kelas</label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <button
                key={g}
                id={`grade-btn-${g}`}
                onClick={() => setGrade(g)}
                className={`w-10 h-10 rounded-full font-bold border-2 transition-all ${
                  grade === g
                    ? "bg-amber-400 border-amber-400 text-white"
                    : "border-gray-200 text-gray-600 hover:border-amber-300"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Pilih maskot</label>
          <div className="flex gap-2 flex-wrap">
            {AVATARS.map((av) => (
              <button
                key={av}
                id={`avatar-btn-${av}`}
                onClick={() => setAvatarId(av)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                  avatarId === av
                    ? "border-amber-400 bg-amber-50"
                    : "border-gray-200 hover:border-amber-200"
                }`}
              >
                {avatarLabel[av]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            id="btn-cancel-profile"
            onClick={onClose}
            className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
          >
            Batal
          </button>
          <button
            id="btn-save-profile"
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-3 rounded-full bg-amber-400 text-white font-bold hover:bg-amber-500 transition-all disabled:opacity-40"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProfileCarousel({ onProfileSelected }: { onProfileSelected: (id: string) => void }) {
  const { profiles, activeProfileId, setActiveProfile } = useProfileStore();
  const [showModal, setShowModal] = useState(false);
  const [startIdx, setStartIdx] = useState(0);

  const VISIBLE = 4;
  const canPrev = startIdx > 0;
  const canNext = startIdx + VISIBLE < profiles.length;

  const handleSelect = (id: string) => {
    setActiveProfile(id);
    onProfileSelected(id);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-700 px-1">Siapa yang belajar hari ini?</h2>

      <div className="flex items-center gap-3">
        {canPrev && (
          <button
            id="btn-profile-prev"
            onClick={() => setStartIdx((i) => Math.max(0, i - 1))}
            className="p-2 rounded-full bg-white shadow text-gray-500 hover:bg-amber-50 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="flex gap-3 overflow-hidden flex-1 flex-wrap justify-start">
          {profiles.slice(startIdx, startIdx + VISIBLE).map((p) => (
            <ProfileCard
              key={p.id}
              profile={p}
              isActive={activeProfileId === p.id}
              onClick={() => handleSelect(p.id)}
            />
          ))}

          {profiles.length < 5 && (
            <button
              id="btn-add-profile"
              onClick={() => setShowModal(true)}
              className="
                flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-4 border-dashed
                border-amber-300 bg-amber-50/60 hover:bg-amber-50 min-w-[110px] cursor-pointer transition-all
              "
            >
              <UserPlus size={32} className="text-amber-400" />
              <span className="text-sm font-bold text-amber-600">Tambah Profil</span>
            </button>
          )}
        </div>

        {canNext && (
          <button
            id="btn-profile-next"
            onClick={() => setStartIdx((i) => i + 1)}
            className="p-2 rounded-full bg-white shadow text-gray-500 hover:bg-amber-50 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {showModal && <AddProfileModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
