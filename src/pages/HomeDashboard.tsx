// src/pages/HomeDashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import HabitCard from "../components/HabitCard";
import type { Habit } from "../types/Habit";

const mockTodayHabits: Habit[] = [
    {
        id: "1",
        name: "Estudiar 45 minutos",
        category: "Estudio",
        description: "Bloque de estudio profundo sin celular.",
        isActive: true,
        todayStatus: "pending",
        todayProgress: 20,
        todayTarget: 45,
    },
    {
        id: "2",
        name: "Ir al gimnasio",
        category: "Deporte",
        isActive: true,
        todayStatus: "completed",
        todayProgress: 1,
        todayTarget: 1,
    },
    {
        id: "3",
        name: "Leer 15 minutos",
        category: "Crecimiento personal",
        isActive: true,
        todayStatus: "pending",
        todayProgress: 0,
        todayTarget: 15,
    },
];

const HomeDashboard: React.FC = () => {
    const level = 4;
    const currentPoints = 1320;
    const pointsToNextLevel = 500;

    const currentStreak = 12;
    const bestStreak = 21;

    const today = new Date().toLocaleDateString("es-UY", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const pendingHabits = mockTodayHabits.filter(
        (h) => (h.todayStatus ?? "pending") !== "completed"
    );
    const completedHabits = mockTodayHabits.filter(
        (h) => (h.todayStatus ?? "pending") === "completed"
    );

    const todayCompleted = completedHabits.length;
    const todayPending = pendingHabits.length;

    const pointsEarnedTowardNext = 240; // mock
    const progressToNextLevelPercent = Math.min(
        100,
        Math.round((pointsEarnedTowardNext / pointsToNextLevel) * 100)
    );

    return (
        <div className="dashboard">
            {/* HERO */}
            <section className="dashboard-hero">
                <div className="dashboard-hero-right">
                    <div className="level-card-wrapper-wide">
                        <p className="dashboard-date">{today}</p>

                        <div className="level-card-wide">
                            <div className="level-header">
                                <span className="level-label">Nivel actual</span>
                                <span className="level-number">{level}</span>
                            </div>

                            <p className="level-points">{currentPoints} puntos totales</p>

                            <div className="level-progress">
                                <div className="level-progress-bar">
                                    <div
                                        className="level-progress-bar-fill"
                                        style={{ width: `${progressToNextLevelPercent}%` }}
                                    />
                                </div>
                                <span className="level-progress-label">
                                    {pointsEarnedTowardNext} / {pointsToNextLevel} puntos al siguiente nivel
                                </span>
                            </div>

                            <div className="level-streak">
                                <div>
                                    <span className="streak-label">Racha actual</span>
                                    <span className="streak-value">{currentStreak} días</span>
                                </div>
                                <div>
                                    <span className="streak-label">Mejor racha</span>
                                    <span className="streak-value">{bestStreak} días</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESUMEN EN CARDS */}
            <section className="dashboard-summary-grid">
                <div className="summary-card">
                    <h2>Hábitos de hoy</h2>
                    <p className="summary-main">
                        {mockTodayHabits.length} hábitos activos hoy
                    </p>
                    <p>
                        Completados: {todayCompleted} · Pendientes: {todayPending}
                    </p>
                </div>

                <div className="summary-card">
                    <h2>Progreso del día</h2>
                    <p className="summary-main">
                        {todayCompleted}/{mockTodayHabits.length} hábitos completados
                    </p>
                    <p>
                        Cada hábito completado hoy suma puntos a tu nivel general.
                    </p>
                </div>

                <div className="summary-card">
                    <h2>Racha</h2>
                    <p className="summary-main">{currentStreak} días seguidos</p>
                    <p>Tu mejor racha es de {bestStreak} días. Vamos por más.</p>
                </div>

                <div className="summary-card summary-card-muted">
                    <h2>Objetivos deportivos</h2>
                    <p className="summary-main">Próximamente</p>
                    <p>Integrá tu salto vertical, tiempos y más con tus hábitos.</p>
                </div>
            </section>

            {/* HÁBITOS DE HOY (pendientes primero, completados abajo) */}
            <section className="dashboard-habits-today">
                <div className="section-header">
                    <h2>Hábitos de hoy</h2>
                </div>

                <div className="habits-list">
                    {pendingHabits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            showTodayStatus
                            onCompleteClick={() => console.log("Completar", habit.id)}
                            onSkipClick={() => console.log("No lo hice", habit.id)}
                        />
                    ))}
                </div>

                {completedHabits.length > 0 && (
                    <>
                        <div className="section-header" style={{ marginTop: 18 }}>
                            <h2>Completados hoy</h2>
                        </div>

                        <div className="habits-list">
                            {completedHabits.map((habit) => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    showTodayStatus
                                    onCompleteClick={() => console.log("Completar", habit.id)}
                                    onSkipClick={() => console.log("No lo hice", habit.id)}
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="dashboard-actions">
                    <Link to="/habitos-activos" className="primary-button">
                        Ver todos los hábitos activos
                    </Link>
                    <Link to="/nuevo-habito" className="secondary-link">
                        Crear nuevo hábito
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomeDashboard;