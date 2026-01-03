import React, { useMemo } from "react";
import { HABIT_CATALOG } from "../data/habitCatalog";
import type { HabitDefinition, Habit } from "../types/Habit";

const HabitLibrary: React.FC = () => {
    const groupedCatalog = useMemo(() => {
        return HABIT_CATALOG.reduce<Record<string, HabitDefinition[]>>((acc, habit) => {
            acc[habit.category] = acc[habit.category] || [];
            acc[habit.category].push(habit);
            return acc;
        }, {});
    }, []);

    return (
        <div className="habit-library-page">
            <header className="library-header library-header--centered">
                <p className="library-kicker">Biblioteca</p>
                <h1 className="library-title">Biblioteca de Hábitos</h1>
                <p className="library-subtitle">
                    Explora los hábitos disponibles agrupados por categoría.
                </p>
            </header>

            <main className="library-content library-content--centered">
                {Object.entries(groupedCatalog).map(([category, items]) => (
                    <section key={category} className="library-category-section">
                        <div className="library-category-card">
                            <div className="library-category-header">
                                <h2 className="library-category-title">{category}</h2>
                            </div>

                            <div className="library-habits-grid">
                                {items.map((habitDef) => {
                                    const previewHabit: Habit = {
                                        ...habitDef,
                                        name: habitDef.title,
                                        isActive: false,
                                    };

                                    return (
                                        <div key={habitDef.id} className="library-habit-card">
                                            <span className="library-habit-name">{previewHabit.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default HabitLibrary;
