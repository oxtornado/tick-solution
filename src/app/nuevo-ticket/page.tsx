"use client";

import { useState } from "react";

const categorias = ["Internet", "Hardware", "Software", "Otro"];

export default function NuevoTicketPage() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [categoria, setCategoria] = useState(categorias[0]);
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nuevoTicket = {
            id: Date.now(),
            nombre,
            email,
            categoria,
            descripcion,
            estado: "sin ver",
            fecha: new Date().toISOString().split("T")[0],
        };

        localStorage.setItem("email", email);

        const existentes = JSON.parse(localStorage.getItem("misTickets") || "[]");
        existentes.push(nuevoTicket);
        localStorage.setItem("misTickets", JSON.stringify(existentes));

        setMensaje("✅ Ticket creado con éxito.");
        setNombre("");
        setEmail("");
        setDescripcion("");
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Crear Nuevo Ticket
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl space-y-5"
            >
                <div>
                    <label className="block font-semibold mb-1 text-teal-300">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Tu nombre"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1 text-teal-300">Correo</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="tu@correo.com"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1 text-teal-300">Categoría</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-800 text-white border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                        {categorias.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-1 text-teal-300">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full p-3 h-32 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Describe el problema..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition shadow-md"
                >
                    Enviar Ticket
                </button>

                {mensaje && (
                    <p className="text-green-400 font-semibold text-center mt-4">{mensaje}</p>
                )}
            </form>
        </main>
    );
}
