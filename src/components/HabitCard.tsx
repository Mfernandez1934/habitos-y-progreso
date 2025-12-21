// src/components/HabitCard.tsx
import React from "react";
import type { Habit } from "../types/Habit";  // Changed to type-only import for TS compatibility

interface HabitCardProps {
    habit: Habit;
    showTodayStatus?: boolean;  // en Dashboard = true, en Activos = false si querés
    onCompleteClick?: () => void;
    onSkipClick?: () => void;
}

const getStatusLabel = (status?: Habit["todayStatus"]) => {
    if (!status || status === "pending") return "Pendiente";
    if (status === "completed") return "Completado";
    if (status === "skipped") return "Saltado";
    return "";
};

const HabitCard: React.FC<HabitCardProps> = ({
                                                 habit,
                                                 showTodayStatus = false,
                                                 onCompleteClick,
                                                 onSkipClick,
                                             }) => {
    const statusLabel = getStatusLabel(habit.todayStatus);
    const isCompleted = habit.todayStatus === "completed";

    const hasProgress =
        typeof habit.todayProgress === "number" &&
        typeof habit.todayTarget === "number";

    const progressPercent =
        hasProgress && habit.todayTarget && habit.todayTarget > 0
            ? Math.min(100, Math.round((habit.todayProgress! / habit.todayTarget!) * 100))
            : 0;

    const hasActions = !!onCompleteClick || !!onSkipClick;

    return (
        <div className={`habit-card ${showTodayStatus && isCompleted ? "habit-card--completed" : ""}`}>
            <div className="habit-card-header">
                <div>
                    <h3 className={`habit-title ${showTodayStatus && isCompleted ? "habit-title--completed" : ""}`}>
                        {habit.name}
                    </h3>
                    <p className="habit-category">{habit.category}</p>
                </div>
                {showTodayStatus && (
                    <span
                        className={`habit-status habit-status-${habit.todayStatus ?? "pending"}`}
                    >
                        {statusLabel}
                    </span>
                )}
            </div>

            {habit.description && (
                <p className="habit-description">{habit.description}</p>
            )}

            {showTodayStatus && hasProgress && (
                <div className="habit-progress">
                    <div className="habit-progress-bar">
                        <div
                            className="habit-progress-bar-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className="habit-progress-label">
                        {habit.todayProgress}/{habit.todayTarget}
                    </span>
                </div>
            )}

            {showTodayStatus && hasActions && (
                <div className="habit-actions">
                    {onCompleteClick && (
                        <button
                            className={`btn btn-complete ${isCompleted ? "btn-complete--disabled" : ""}`}
                            onClick={onCompleteClick}
                            disabled={isCompleted}
                            aria-disabled={isCompleted}
                        >
                            Completar
                        </button>
                    )}
                    {onSkipClick && (
                        <button
                            className="btn btn-skip"
                            onClick={onSkipClick}
                        >
                            No lo hice
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default HabitCard;