// src/pages/WelcomeScreen.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const mockWelcomeMessages = [
    "Tu racha actual es de 12 días. Tu mejor racha es 21.",
    "Cuando empezaste, tu salto vertical era 35 cm. Ahora es 41 cm. +6 cm.",
    "Esta semana sumaste 5 horas de estudio enfocado.",
    "Tenés 7 hábitos activos: 3 de deporte, 2 de estudio y 2 de crecimiento personal.",
];

const WelcomeScreen: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % mockWelcomeMessages.length);
        }, 5000); // cambia cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="welcome-screen">
            <section className="welcome-top">
                <h1 className="welcome-title">Bienvenido, Marcos</h1>
                <p className="welcome-subtitle">
                    Listo para mejorar un poco más hoy.
                </p>

                <div className="welcome-message-bar">
                    <p>{mockWelcomeMessages[messageIndex]}</p>
                </div>
            </section>

            <section className="welcome-buttons">
                <Link to="/dashboard" className="big-button primary">
                    Seguir camino para ser una bestia
                </Link>
                <Link to="/biblioteca" className="big-button">
                    Biblioteca de hábitos
                </Link>
                <Link to="/habitos-activos" className="big-button">
                    Hábitos activos
                </Link>
                <Link to="/progreso" className="big-button disabled">
                    Progreso (próximamente)
                </Link>
                <Link to="/objetivos-deportivos" className="big-button disabled">
                    Objetivos deportivos (próximamente)
                </Link>
                <Link to="/configuracion" className="big-button">
                    Configuración
                </Link>
            </section>

            <footer className="welcome-footer">
                <small>Versión 0.1 – Hábitos y Progreso</small>
            </footer>
        </div>
    );
};

export default WelcomeScreen;
