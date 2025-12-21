// src/pages/HabitDetailPage.tsx
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import HabitCard from "../components/HabitCard";
import type { Habit } from "../types/Habit";

const mockHabits: Habit[] = [
    {
        id: "1",
        name: "Estudiar 45 minutos",
        category: "Estudio",
        description: "Bloque de estudio profundo sin distracciones.",
        isActive: true,
        goalType: "minutes",
        todayTarget: 45,
        todayProgress: 20,
        todayStatus: "pending",
        totalCompletions: 37,
        currentStreakDays: 5,
        bestStreakDays: 12,
    },
    {
        id: "2",
        name: "Ir al gimnasio",
        category: "Deporte",
        isActive: true,
        goalType: "times",
        todayTarget: 1,
        todayProgress: 1,
        todayStatus: "completed",
        totalCompletions: 60,
        currentStreakDays: 8,
        bestStreakDays: 15,
    },
    {
        id: "3",
        name: "Leer 15 minutos",
        category: "Crecimiento personal",
        isActive: true,
        goalType: "minutes",
        todayTarget: 15,
        todayProgress: 0,
        todayStatus: "pending",
        totalCompletions: 20,
        currentStreakDays: 2,
        bestStreakDays: 9,
    },
];

const mockHistory = [
    { date: "Lun 01", status: "completed" },
    { date: "Mar 02", status: "completed" },
    { date: "Mié 03", status: "skipped" },
    { date: "Jue 04", status: "completed" },
    { date: "Vie 05", status: "completed" },
    { date: "Sáb 06", status: "completed" },
    { date: "Dom 07", status: "pending" },
] as const;

const HabitDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const habit = mockHabits.find((h) => h.id === id);

    if (!habit) {
        return (
            <div>
                <p>No encontré ese hábito.</p>
                <Link to="/habitos-activos" className="secondary-link">
                    ← Volver a hábitos activos
                </Link>
            </div>
        );
    }

    const statusLabel =
        habit.todayStatus === "completed"
            ? "Completado hoy"
            : habit.todayStatus === "skipped"
                ? "Saltado hoy"
                : "Pendiente hoy";

    const goalLabel =
        habit.goalType === "minutes"
            ? "minutos"
            : habit.goalType === "times"
                ? "veces por día"
                : "unidad";

    const handleMarkCompleted = () => {
        console.log("Marcar como completado hoy (mock)", habit.id);
        alert("Marcaríamos este hábito como completado hoy (mock).");
    };

    /*const handleMarkSkipped = () => {
        console.log("Marcar como no hecho hoy (mock)", habit.id);
        alert("Marcaríamos este hábito como no hecho hoy (mock).");
    }; */

    const handleArchive = () => {
        console.log("Archivar hábito (mock)", habit.id);
        alert("Archivaríamos este hábito (mock).");
        navigate("/habitos-activos");
    };

    return (
        <div className="habit-detail-page">
            <header className="section-header habit-detail-header">
                <div>
                    <span className="habit-category-badge">{habit.category}</span>
                    <h1>{habit.name}</h1>
                    <p className="habit-detail-status">
                        {habit.isActive ? "Hábito activo" : "Hábito archivado"} · {statusLabel}
                    </p>
                </div>
                <div className="habit-detail-header-actions">
                    <button
                        className="btn btn-complete"
                        type="button"
                        onClick={handleMarkCompleted}
                    >
                        Marcar completado hoy
                    </button>
                </div>
            </header>

            <div className="habit-detail-layout">
                {/* COLUMNA PRINCIPAL */}
                <section className="habit-detail-main">
                    <div className="habit-detail-block">
                        <h2>Objetivo diario</h2>
                        <p className="habit-detail-main-text">
                            Tu objetivo diario es de{" "}
                            <strong>
                                {habit.todayTarget} {goalLabel}
                            </strong>
                            .
                        </p>
                        {habit.description && (
                            <p className="habit-detail-description">
                                {habit.description}
                            </p>
                        )}
                    </div>

                    <div className="habit-detail-block">
                        <h2>Vista en tu día de hoy</h2>
                        <p className="habit-detail-main-text">
                            Así se ve este hábito en la lista de “Hábitos de hoy”.
                        </p>
                        <HabitCard
                            habit={habit}
                            showTodayStatus
                        />
                    </div>
                </section>

                {/* COLUMNA LATERAL: STATS + HISTÓRICO */}
                <aside className="habit-detail-sidebar">
                    <div className="habit-detail-block">
                        <h2>Estadísticas del hábito</h2>
                        <div className="habit-stats-grid">
                            <div className="habit-stat-card">
                                <span className="habit-stat-label">Veces completado</span>
                                <span className="habit-stat-value">
                                    {habit.totalCompletions ?? 0}
                                </span>
                            </div>
                            <div className="habit-stat-card">
                                <span className="habit-stat-label">Racha actual</span>
                                <span className="habit-stat-value">
                                    {habit.currentStreakDays ?? 0} días
                                </span>
                            </div>
                            <div className="habit-stat-card">
                                <span className="habit-stat-label">Mejor racha</span>
                                <span className="habit-stat-value">
                                    {habit.bestStreakDays ?? 0} días
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="habit-detail-block">
                        <h2>Histórico reciente</h2>
                        <ul className="habit-history-list">
                            {mockHistory.map((day) => (
                                <li key={day.date} className="habit-history-item">
                                    <span className="habit-history-date">{day.date}</span>
                                    <span
                                        className={`habit-history-status habit-history-status-${day.status}`}
                                    >
                                        {day.status === "completed"
                                            ? "Completado"
                                            : day.status === "skipped"
                                                ? "No hecho"
                                                : "Pendiente"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="habit-detail-block">
                        <h2>Más opciones</h2>
                        <div className="habit-advanced-actions">
                            <button
                                type="button"
                                className="secondary-link"
                                onClick={() => alert("Pantalla de edición (próximamente).")}
                            >
                                Editar hábito (próximamente)
                            </button>
                            <button
                                type="button"
                                className="secondary-link"
                                onClick={handleArchive}
                            >
                                Archivar hábito
                            </button>
                        </div>
                    </div>
                </aside>

                <footer className="habit-detail-footer">
                    <Link to="/habitos-activos" className="secondary-link">
                        ← Volver a hábitos activos
                    </Link>
                    <Link to="/dashboard" className="secondary-link">
                        Ir a Mi día de hoy
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default HabitDetailPage;