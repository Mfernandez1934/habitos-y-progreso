// src/pages/CreateHabitPage.tsx
import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HabitCard from "../components/HabitCard";
import type { Habit } from "../types/Habit";

type GoalType = "minutes" | "times";

const CreateHabitPage: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("Estudio");
    const [goalType, setGoalType] = useState<GoalType>("minutes");
    const [dailyTarget, setDailyTarget] = useState<number | "">("");
    const [description, setDescription] = useState("");

    const isValid =
        name.trim().length > 0 && dailyTarget !== "" && Number(dailyTarget) > 0;

    const goalLabel = goalType === "minutes" ? "minutos" : "veces";

    const previewHabit: Habit = useMemo(
        () => ({
            id: "preview",
            name: name || "Nombre del hábito",
            category: category || "Sin categoría",
            description: description || "Descripción opcional del hábito.",
            isActive: true,
            todayStatus: "pending",
            todayProgress: 0,
            todayTarget: dailyTarget === "" ? undefined : Number(dailyTarget),
        }),
        [name, category, description, dailyTarget]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        const newHabit: Habit = {
            id: crypto.randomUUID(),
            name: name.trim(),
            category,
            description: description.trim() || undefined,
            isActive: true,
            todayStatus: "pending",
            todayProgress: 0,
            todayTarget: Number(dailyTarget),
            // más adelante: goalType, stats, etc.
        };

        console.log("Nuevo hábito (mock, sin guardar aún):", {
            ...newHabit,
            goalType,
        });

        alert("Hábito creado (mock). Más adelante lo vamos a guardar de verdad.");

        navigate("/habitos-activos");
    };

    return (
        <div className="create-habit-page">
            <header className="section-header">
                <h1>Crear nuevo hábito</h1>
                <p>
                    Definí un hábito claro y medible. Más adelante lo vamos a conectar
                    con tu sistema de puntos y registro real.
                </p>
            </header>

            <div className="create-habit-grid">
                {/* FORMULARIO */}
                <section className="create-habit-form-section">
                    <form className="habit-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="form-label" htmlFor="name">
                                Nombre del hábito
                            </label>
                            <input
                                id="name"
                                className="form-input"
                                type="text"
                                placeholder="Ej: Estudiar 45 minutos"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <p className="form-help">
                                Algo concreto y accionable. Evitá frases vagas tipo
                                &nbsp;“ser más productivo”.
                            </p>
                        </div>

                        <div className="form-field">
                            <label className="form-label" htmlFor="category">
                                Categoría
                            </label>
                            <select
                                id="category"
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Estudio</option>
                                <option>Deporte</option>
                                <option>Salud</option>
                                <option>Crecimiento personal</option>
                                <option>Otro</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <span className="form-label">Tipo de objetivo diario</span>
                            <div className="form-radio-group">
                                <label className="form-radio">
                                    <input
                                        type="radio"
                                        name="goalType"
                                        value="minutes"
                                        checked={goalType === "minutes"}
                                        onChange={() => setGoalType("minutes")}
                                    />
                                    Minutos
                                </label>
                                <label className="form-radio">
                                    <input
                                        type="radio"
                                        name="goalType"
                                        value="times"
                                        checked={goalType === "times"}
                                        onChange={() => setGoalType("times")}
                                    />
                                    Veces por día
                                </label>
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="form-label" htmlFor="dailyTarget">
                                Cantidad diaria objetivo ({goalLabel})
                            </label>
                            <input
                                id="dailyTarget"
                                className="form-input"
                                type="number"
                                min={1}
                                placeholder={goalType === "minutes" ? "Ej: 45" : "Ej: 3"}
                                value={dailyTarget}
                                onChange={(e) =>
                                    setDailyTarget(
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label" htmlFor="description">
                                Descripción (opcional)
                            </label>
                            <textarea
                                id="description"
                                className="form-textarea"
                                rows={3}
                                placeholder="Ej: Bloque de estudio sin celular, con foco total."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="primary-button"
                                disabled={!isValid}
                            >
                                Guardar hábito
                            </button>
                            <Link to="/dashboard" className="secondary-link">
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </section>

                {/* PREVIEW */}
                <section className="create-habit-preview-section">
                    <h2>Vista previa</h2>
                    <p className="preview-subtitle">
                        Así se va a ver este hábito en tu día de hoy.
                    </p>

                    <HabitCard
                        habit={previewHabit}
                        showTodayStatus
                        // sin handlers → solo muestra la card, sin botones funcionales extra
                    />

                    {dailyTarget !== "" && (
                        <p className="preview-extra">
                            Objetivo diario configurado:&nbsp;
                            <strong>
                                {dailyTarget} {goalLabel}
                            </strong>
                            .
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default CreateHabitPage;
