export type HabitTodayStatus = "pending" | "completed" | "skipped";
export type HabitGoalType = "minutes" | "times";

export interface Habit {
    id: string;
    name: string;
    category: string;
    description?: string;

    isActive: boolean;

    // Objetivo:
    goalType?: HabitGoalType;   // "minutes" | "times"
    todayTarget?: number;
    todayProgress?: number;

    todayStatus?: HabitTodayStatus;

    // Stats del hábito (opcionales, para el detalle)
    totalCompletions?: number;
    currentStreakDays?: number;
    bestStreakDays?: number;
}
