import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import HabitCard from "../components/HabitCard";
import type { Habit } from "../types/Habit";
import { HABIT_CATALOG } from "../data/habitCatalog";
import { isHabitActiveInPhase, loadActiveByPhase } from "../lib/activeByPhase";

type Phase = "Verano" | "Semestre impar" | "Receso" | "Semestre par";
const currentPhase: Phase = "Semestre impar";

const HomeDashboard: React.FC = () => {
    const activeHabits: Habit[] = useMemo(() => {
        const activeByPhase = loadActiveByPhase();

        return HABIT_CATALOG
            .filter((def) => isHabitActiveInPhase(activeByPhase, currentPhase, def.id))
            .map((def) => ({
                ...def,
                name: def.title, // requerido por HabitCard
                isActive: true,
                todayStatus: "pending",
                todayProgress: 0,
                todayTarget: 1, // placeholder hasta metas por fase
            }));
    }, []);

    const consistency = 0.85; // 85% de cumplimiento
    const level = Math.min(99, Math.max(0, Math.round(consistency * 99)));

    const currentStreak = 12;
    const bestStreak = 21;

    const today = new Date().toLocaleDateString("es-UY", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const pendingHabits = activeHabits.filter(
        (h) => (h.todayStatus ?? "pending") !== "completed"
    );
    const completedHabits = activeHabits.filter(
        (h) => (h.todayStatus ?? "pending") === "completed"
    );

    const todayCompleted = completedHabits.length;
    const totalToday = activeHabits.length;
    const dailyProgressPercent =
        totalToday > 0 ? Math.round((todayCompleted / totalToday) * 100) : 0;

    return (
        <div className="dashboard">
            <section className="dashboard-hero">
                <div className="dashboard-hero-right">
                    <div className="level-card-wrapper-wide">
                        <p className="dashboard-date">{today}</p>

                        <div className="level-card-wide">
                            <div
                                className="level-header"
                                style={{
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <span className="level-label">Nivel Global</span>
                                <span className="level-number" style={{ fontSize: "4rem" }}>
                                    {level}
                                </span>
                                <span className="level-label" style={{ marginTop: "4px" }}>
                                    Basado en tu consistencia de los últimos 28 días
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dashboard-summary-grid">
                <div className="summary-card">
                    <h3 className="card-title-small">Hábitos de hoy</h3>
                    <p className="card-number-big">{totalToday}</p>
                    <p className="card-text-secondary">hábitos activos hoy</p>
                </div>

                <div className="summary-card">
                    <h3 className="card-title-small">Progreso del día</h3>
                    <p className="card-number-big">
                        {todayCompleted}/{totalToday}
                    </p>
                    <p className="card-text-secondary">{dailyProgressPercent}% completado</p>
                </div>

                <div className="summary-card">
                    <h3 className="card-title-small">Racha</h3>
                    <p className="card-number-big">{currentStreak}</p>
                    <p className="card-text-secondary">días seguidos</p>
                    {bestStreak && <p className="card-text-tertiary">Mejor: {bestStreak}</p>}
                </div>
            </section>

            <section className="dashboard-habits-today">
                <div className="section-header">
                    <h2>Hábitos de hoy</h2>
                </div>

                {activeHabits.length === 0 ? (
                    <div
                        className="welcome-message-bar"
                        style={{ textAlign: "center", padding: "20px" }}
                    >
                        <p>No tenés hábitos activos para hoy.</p>
                        <Link to="/biblioteca" className="primary-button" style={{ marginTop: "12px" }}>
                            Ir a la Biblioteca
                        </Link>
                    </div>
                ) : (
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
                )}

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
                        Ver objetivos de fase
                    </Link>
                    <Link to="/biblioteca" className="secondary-link">
                        Biblioteca de hábitos
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomeDashboard;
