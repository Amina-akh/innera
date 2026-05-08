import type { ClientProfile, JournalEntry } from "@/types/user";
import { generateNumerologyProfile } from "@/modules/numerology/calculator";

const STORAGE_KEY = "innera_profile";
const JOURNAL_KEY = "innera_journal_v1";
const MOOD_KEY = "innera_mood_v1";

export function saveProfile(profile: ClientProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function loadProfile(): ClientProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const profile = JSON.parse(raw) as ClientProfile;
    if (!profile.numerology?.sourceDigits || !profile.numerology?.workNumbers) {
      profile.numerology = generateNumerologyProfile(profile.birthDate);
      saveProfile(profile);
    }
    if (!profile.plan) {
      profile.plan = "free";
      saveProfile(profile);
    }
    return profile;
  } catch {
    return null;
  }
}

export function setPlan(plan: ClientProfile["plan"]) {
  const profile = loadProfile();
  if (!profile) return;
  profile.plan = plan;
  saveProfile(profile);
}

export function saveJournal(entries: JournalEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

export function loadJournal(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(JOURNAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as JournalEntry[];
  } catch {
    return [];
  }
}

export type MoodValue = 1 | 2 | 3 | 4 | 5;

export function saveTodayMood(score: MoodValue) {
  if (typeof window === "undefined") return;
  const key = new Date().toISOString().slice(0, 10);
  const raw = localStorage.getItem(MOOD_KEY);
  let map: Record<string, MoodValue> = {};
  if (raw) {
    try {
      map = JSON.parse(raw) as Record<string, MoodValue>;
    } catch {
      map = {};
    }
  }
  map[key] = score;
  localStorage.setItem(MOOD_KEY, JSON.stringify(map));
}

export function loadMoodMap(): Record<string, MoodValue> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(MOOD_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, MoodValue>;
  } catch {
    return {};
  }
}
