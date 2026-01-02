export type HabitTodayStatus = "pending" | "completed" | "skipped";
export type HabitGoalType = "minutes" | "times";

/**
 * Punto 1.A: HabitDefinition (El catálogo/biblioteca base)
 * No contiene metas, frecuencias ni estado de cumplimiento.
 */
export interface HabitDefinition {
    id: string;
    title: string;
    category: string;
    description?: string;
}

/**
 * Punto 1.B: Habit (La instancia activa en el Dashboard)
 * Extiende la definición agregando el estado de selección y progreso.
 */
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