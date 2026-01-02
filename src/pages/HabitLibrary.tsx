import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HABIT_CATALOG } from "../data/habitCatalog";

const HabitLibrary: React.FC = () => {
    const [activeIds, setActiveIds] = useState<string[]>(() => {
        const saved = localStorage.getItem("activeHabitIds");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("activeHabitIds", JSON.stringify(activeIds));
    }, [activeIds]);

    const toggleHabit = (id: string) => {
        setActiveIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const categories = [
        "Sueño", "Entrenamiento y movimiento", "Nutrición",
        "Uso de estímulos", "Energía", "Mente", "Cierre y organización"
    ];

    return (
        <div className="habit-library-page">
            <header className="section-header">
                <h1>Biblioteca de hábitos</h1>
                <p>Activá los hábitos que vas a seguir en esta fase.</p>
            </header>

            <div className="library-sections">
                {categories.map(cat => (
                    <section key={cat} className="library-category-group" style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.2rem', color: '#7c5cff', marginBottom: '16px' }}>{cat}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {HABIT_CATALOG.filter(h => h.category === cat).map(habit => {
                                const isActive = activeIds.includes(habit.id);
                                return (
                                    <div key={habit.id} className="habit-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1rem' }}>{habit.title}</h3>
                                        <button
                                            onClick={() => toggleHabit(habit.id)}
                                            className={`btn ${isActive ? 'btn-skip' : 'btn-complete'}`}
                                            style={{ minWidth: '100px' }}
                                        >
                                            {isActive ? "Desactivar" : "Activar"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/" className="secondary-link">← Volver a inicio</Link>
            </div>
        </div>
    );
};

export default HabitLibrary;