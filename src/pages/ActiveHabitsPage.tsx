// src/pages/ActiveHabitsPage.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Phase = "Verano" | "Semestre impar" | "Receso" | "Semestre par";

type Goal = {
    id: string;
    title: string;
    category?: string;
    completed?: boolean;
    target?: string;
};

const PHASES: Phase[] = ["Verano", "Semestre impar", "Receso", "Semestre par"];
const currentPhase: Phase = "Semestre impar";

const phaseGoalsByPhase: Record<Phase, Goal[]> = {
    Verano: [
        { id: "v1", title: "Volver a correr", category: "Salud", target: "3x por semana" },
        { id: "v2", title: "Leer 2 libros", category: "Crecimiento personal" },
        { id: "v3", title: "Ajustar rutina de sueño", category: "Energía", target: "7–8h" },
    ],
    "Semestre impar": [
        { id: "si1", title: "Estudiar 45 minutos", category: "Estudio", target: "L–V" },
        { id: "si2", title: "Ir al gimnasio", category: "Deporte", target: "3 días" },
        { id: "si3", title: "Leer 15 minutos", category: "Crecimiento personal", target: "Diario" },
        { id: "si4", title: "Dormir 7 horas", category: "Sueño", target: "Diario" },
    ],
    Receso: [
        { id: "r1", title: "Ordenar apuntes", category: "Organización" },
        { id: "r2", title: "Caminar 8.000 pasos", category: "Salud", target: "Diario" },
        { id: "r3", title: "Cocinar 3 recetas", category: "Hogar" },
    ],
    "Semestre par": [
        { id: "sp1", title: "Mejorar promedio", category: "Estudio", target: "+1 punto" },
        { id: "sp2", title: "Entrenar fuerza", category: "Deporte", target: "4 días" },
        { id: "sp3", title: "Proyecto personal", category: "Creatividad", target: "1h/sem" },
    ],
};

const monthlyGoals: Goal[] = [
    { id: "m1", title: "Completar 12 sesiones de gym", category: "Deporte", target: "12 sesiones" },
    { id: "m2", title: "Leer 300 páginas", category: "Lectura", target: "300 págs" },
    { id: "m3", title: "Ahorrar un extra", category: "Finanzas", target: "10%" },
];

const weeklyGoals: Goal[] = [
    { id: "w1", title: "3 días sin azúcar", category: "Nutrición", target: "3 días" },
    { id: "w2", title: "2 bloques de estudio profundo", category: "Estudio", target: "2×90 min" },
    { id: "w3", title: "1 salida al aire libre", category: "Bienestar" },
    { id: "w4", title: "Planificar la semana", category: "Organización", target: "30 min" },
];

function GoalCard({ goal }: { goal: Goal }) {
    return (
        <div className={`goal-card ${goal.completed ? "goal-card--completed" : ""}`}>
            <div className="goal-card__main">
                <h3 className="goal-card__title">{goal.title}</h3>
                {(goal.category || goal.target) && (
                    <p className="goal-card__meta">
                        {goal.category ? <span className="goal-card__tag">{goal.category}</span> : null}
                        {goal.target ? <span className="goal-card__target">{goal.target}</span> : null}
                    </p>
                )}
            </div>
        </div>
    );
}

function GoalsSection({
    title,
    subtitle,
    goals,
}: {
    title: string;
    subtitle?: string;
    goals: Goal[];
}) {
    return (
        <section className="goals-section">
            <header className="goals-section__header">
                <div>
                    <h2 className="goals-section__title">{title}</h2>
                    {subtitle ? <p className="goals-section__subtitle">{subtitle}</p> : null}
                </div>
            </header>

            <div className="goals-grid">
                {goals.map((g) => (
                    <GoalCard key={g.id} goal={g} />
                ))}
            </div>
        </section>
    );
}

function PhaseTabs({
    phases,
    selected,
    current,
    onSelect,
}: {
    phases: Phase[];
    selected: Phase;
    current: Phase;
    onSelect: (p: Phase) => void;
}) {
    return (
        <section className="phase-tabs" aria-label="Selector de fase">
            {phases.map((p) => {
                const isSelected = p === selected;
                const isCurrent = p === current;
                return (
                    <button
                        key={p}
                        type="button"
                        className={`phase-tab ${isSelected ? "phase-tab--selected" : ""} ${
                            isCurrent ? "phase-tab--current" : ""
                        }`}
                        onClick={() => onSelect(p)}
                        aria-pressed={isSelected}
                    >
                        <span className="phase-tab__label">{p}</span>
                        {isCurrent ? <span className="phase-tab__hint">Actual</span> : null}
                    </button>
                );
            })}
        </section>
    );
}

const ActiveHabitsPage: React.FC = () => {
    const [selectedPhase, setSelectedPhase] = useState<Phase>(currentPhase);

    const phaseGoals = useMemo(() => phaseGoalsByPhase[selectedPhase] ?? [], [selectedPhase]);

    return (
        <div className="active-habits-page active-habits-dashboard">
            <header className="active-habits-hero">
                <h1 className="active-habits-title">Hábitos activos</h1>
                <p className="active-habits-subtitle">
                    Una vista rápida, ordenada por fase, para enfocarte en lo que importa.
                </p>
            </header>

            <PhaseTabs
                phases={PHASES}
                selected={selectedPhase}
                current={currentPhase}
                onSelect={setSelectedPhase}
            />

            <div className="active-habits-sections">
                <GoalsSection
                    title="Objetivos de la fase"
                    subtitle={`Fase seleccionada: ${selectedPhase}`}
                    goals={phaseGoals}
                />

                <GoalsSection title="Objetivos mensuales" goals={monthlyGoals} />

                <GoalsSection title="Objetivos semanales" goals={weeklyGoals} />
            </div>

            <div className="page-footer-actions">
                <Link to="/" className="secondary-link">
                    ← Volver a inicio
                </Link>
                <Link to="/nuevo-habito" className="primary-button">
                    Crear nuevo hábito
                </Link>
            </div>
        </div>
    );
};

export default ActiveHabitsPage;
