"use client";

import { useEffect, useState } from "react";
import { Ticket } from "@/types/ticket";
import { predefinedTickets } from "@/data/tickets";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Legend,
} from "recharts";

const COLORS = ["#14b8a6", "#f59e0b", "#10b981", "#6366f1", "#ef4444", "#e879f9"];

export default function EstadisticasPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
    const data = localStorage.getItem("misTickets");
    try {
        const parsed = data ? JSON.parse(data) : [];

        const isEstado = (val: any): val is Ticket["estado"] =>
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

        // Elimina duplicados por ID
        const merged = [
            ...predefinedTickets,
            ...parsedTickets.filter(
                (t) => !predefinedTickets.some((p) => p.id === t.id)
            ),
        ];

        setTickets(merged);
    } catch {
        setTickets([...predefinedTickets]);
    }
}, []);


    const total = tickets.length;

    const porEstado = [
        { estado: "sin ver", valor: tickets.filter((t) => t.estado === "sin ver").length },
        { estado: "en proceso", valor: tickets.filter((t) => t.estado === "en proceso").length },
        { estado: "resuelto", valor: tickets.filter((t) => t.estado === "resuelto").length },
    ];

    const categorias = Array.from(new Set(tickets.map((t) => t.categoria)));
    const porCategoria = categorias.map((cat) => ({
        categoria: cat,
        valor: tickets.filter((t) => t.categoria === cat).length,
    }));

    return (
        <main className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-teal-400">📊 Estadísticas de Tickets</h1>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
                {/* Gráfico de pastel por estado */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Distribución por Estado</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={porEstado}
                                dataKey="valor"
                                nameKey="estado"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {porEstado.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico de barras por categoría */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Tickets por Categoría</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={porCategoria}>
                            <XAxis dataKey="categoria" stroke="#ffffff" />
                            <YAxis stroke="#ffffff" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="valor" fill="#14b8a6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Total */}
            <div className="text-center text-xl text-gray-200">
                🎫 Total de Tickets: <span className="text-teal-400 font-bold">{total}</span>
            </div>

            <div className="mt-12 flex justify-center">
                <a
                    href="/admin"
                    className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition"
                >
                    ← Volver al Dashboard
                </a>
            </div>
        </main>
    );
}
