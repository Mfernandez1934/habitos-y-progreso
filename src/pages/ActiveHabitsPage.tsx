// src/pages/ActiveHabitsPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import HabitCard from "../components/HabitCard";
import type { Habit } from "../types/Habit";

const mockActiveHabits: Habit[] = [
    {
        id: "1",
        name: "Estudiar 45 minutos",
        category: "Estudio",
        isActive: true,
    },
    {
        id: "2",
        name: "Ir al gimnasio",
        category: "Deporte",
        isActive: true,
    },
    {
        id: "3",
        name: "Leer 15 minutos",
        category: "Crecimiento personal",
        isActive: true,
    },
    {
        id: "4",
        name: "Dormir 7 horas",
        category: "Sueño",
        isActive: true,
    },
];

const ActiveHabitsPage: React.FC = () => {
    return (
        <div className="active-habits-page">
            <header className="section-header">
                <h1>Hábitos activos</h1>
                <p>
                    Estos son todos los hábitos que estás trackeando actualmente en tu sistema.
                    Tocá uno para ver más detalles.
                </p>
            </header>

            <div className="habits-list">
                {mockActiveHabits.map((habit) => (
                    <Link
                        key={habit.id}
                        to={`/habitos/${habit.id}`}
                        className="habit-link-wrapper"
                    >
                        <HabitCard
                            habit={habit}
                            showTodayStatus={false}
                        />
                    </Link>
                ))}
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
