// src/lib/activeByPhase.ts
export type ActiveByPhase = Record<string, Record<string, boolean>>;
const STORAGE_KEY = "activeByPhase";

export function loadActiveByPhase(): ActiveByPhase {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        return JSON.parse(raw) as ActiveByPhase;
    } catch {
        return {};
    }
}

export function saveActiveByPhase(data: ActiveByPhase) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // noop
    }
}

export function isHabitActiveInPhase(data: ActiveByPhase, phaseId: string, habitId: string): boolean {
    return !!(data?.[phaseId] && data[phaseId][habitId]);
}

export function toggleHabitForPhase(data: ActiveByPhase, phaseId: string, habitId: string): ActiveByPhase {
    const next: ActiveByPhase = { ...(data || {}) };
    if (!next[phaseId]) next[phaseId] = {};
    const currently = !!next[phaseId][habitId];
    next[phaseId] = { ...next[phaseId], [habitId]: !currently };
    return next;
}
