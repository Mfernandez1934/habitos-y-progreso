// src/App.tsx
import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import HomeDashboard from "./pages/HomeDashboard";
import ActiveHabitsPage from "./pages/ActiveHabitsPage";
import HabitDetailPage from "./pages/HabitDetailPage"; // NUEVO
import HabitLibrary from "./pages/HabitLibrary";
import CreateHabitPage from "./pages/CreateHabitPage"; // Added for the /nuevo-habito route

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="app-header">
                <div className="logo">Hábitos y Progreso</div>
                <nav className="nav">
                    <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Inicio
                    </NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Mi día de hoy
                    </NavLink>
                    <NavLink to="/habitos-activos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Hábitos activos
                    </NavLink>
                    <NavLink to="/configuracion" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Configuración
                    </NavLink>
                </nav>
            </header>

            <main className="app-main">
                <Routes>
                    <Route path="/" element={<WelcomeScreen />} />
                    <Route path="/dashboard" element={<HomeDashboard />} />
                    <Route path="/habitos-activos" element={<ActiveHabitsPage />} />
                    <Route path="/habitos/:id" element={<HabitDetailPage />} /> {/* NUEVO */}
                    <Route path="/biblioteca" element={<HabitLibrary />} /> {/* NUEVO */}
                    <Route path="/nuevo-habito" element={<CreateHabitPage />} />
                    <Route
                        path="/configuracion"
                        element={<div>Configuración (próximamente)</div>}
                    />
                    <Route
                        path="/progreso"
                        element={<div>Progreso (próximamente)</div>}
                    />
                    <Route
                        path="/objetivos-deportivos"
                        element={<div>Objetivos deportivos (próximamente)</div>}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default App;