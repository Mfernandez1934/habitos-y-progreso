export type HabitTodayStatus = "pending" | "completed" | "skipped";
export type HabitGoalType = "minutes" | "times";

export interface HabitDefinition {
    id: string;
    title: string;
    category: string;
    description?: string;
}
export interface Habit extends HabitDefinition {
    // Para mantener compatibilidad con HabitCard.tsx que usa .name
    name: string;

    isActive: boolean;

    // Objetivo (definido por fase, se inyecta aquí para el Dashboard)
    goalType?: HabitGoalType;
    todayTarget?: number;
    todayProgress?: number;

    todayStatus?: HabitTodayStatus;

    // Estadísticas
    totalCompletions?: number;
    currentStreakDays?: number;
    bestStreakDays?: number;
}