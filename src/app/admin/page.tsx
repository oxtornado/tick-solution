"use client";

import { useEffect, useState } from "react";
// se importa para usar API local de Tickets :)
import { predefinedTickets } from "@/data/tickets";

// funcion que revisa si el ticket es de api local o no
const esPredefinido = (id: number) => {
    return predefinedTickets.some((t) => t.id === id);
};

// Tipo literal para el estado
type Estado = "sin ver" | "en proceso" | "resuelto";

// Tipo de ticket
type Ticket = {
    id: number;
    nombre: string;
    email: string;
    categoria: string;
    descripcion: string;
    estado: Estado;
    fecha: string;
};

export default function AdminDashboardPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
    const data = localStorage.getItem("misTickets");

    try {
        const parsed = data ? JSON.parse(data) : [];

        const isEstado = (val: any): val is Estado =>
            ["sin ver", "en proceso", "resuelto"].includes(val);

        const parsedTickets: Ticket[] = parsed
            .filter((t: any) =>
                typeof t === "object" &&
                typeof t.id === "number" &&
                typeof t.nombre === "string" &&
                typeof t.email === "string" &&
                typeof t.categoria === "string" &&
                typeof t.descripcion === "string" &&
                typeof t.fecha === "string" &&
                isEstado(t.estado)
            )
            .map((t: any) => ({
                id: t.id,
                nombre: t.nombre,
                email: t.email,
                categoria: t.categoria,
                descripcion: t.descripcion,
                fecha: t.fecha,
                estado: t.estado,
            }));

        // Hacemos copia mutable del array readonly
        const merged = [...predefinedTickets, ...parsedTickets];

        setTickets(merged);
    } catch (error) {
        console.error("Error al parsear tickets:", error);

        // Si falla localStorage, usar solo los predefinidos
        setTickets([...predefinedTickets]);
    }
}, []);


    const actualizarEstado = (id: number) => {
    setTickets((prevTickets) => {
        const actualizados: Ticket[] = prevTickets.map((t) => {
            if (t.id !== id) return t;

            let nuevoEstado: Ticket["estado"];
            if (t.estado === "sin ver") {
                nuevoEstado = "en proceso";
            } else if (t.estado === "en proceso") {
                nuevoEstado = "resuelto";
            } else {
                nuevoEstado = "resuelto";
            }

            return { ...t, estado: nuevoEstado };
        });

        const soloLocales = actualizados.filter((t) => !esPredefinido(t.id));
        localStorage.setItem("misTickets", JSON.stringify(soloLocales));

        return actualizados;
    });
};


    return (
        <main className="min-h-screen bg-gray-900 text-white p-6">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400 mb-8 text-center">
        Panel de Administración
    </h1>

    {tickets.length === 0 ? (
        <p className="text-center text-gray-400">No hay tickets registrados.</p>
    ) : (
        <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-16">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-lg space-y-2"
                    >
                        <h2 className="text-xl font-bold text-teal-300">{ticket.nombre}</h2>
                        <p className="text-sm text-gray-300">📧 {ticket.email}</p>
                        <p className="text-sm text-gray-300">📅 {ticket.fecha}</p>
                        <p className="text-sm text-gray-300">📂 {ticket.categoria}</p>
                        <p className="text-gray-200 mt-2">{ticket.descripcion}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    ticket.estado === "sin ver"
                                        ? "bg-red-500"
                                        : ticket.estado === "en proceso"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                            >
                                {ticket.estado.toUpperCase()}
                            </span>
                            <button
                                onClick={() => actualizarEstado(ticket.id)}
                                className="text-sm text-teal-400 hover:underline"
                            >
                                Cambiar estado
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón para ir a Estadísticas */}
            <div className="flex justify-center mt-10">
                <a
                    href="/estadisticas"
                    className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition"
                >
                    Ver Estadísticas 📊
                </a>
            </div>
        </>
    )}
</main>

    );
}
