export type Estado = "sin ver" | "en proceso" | "resuelto";

export interface Ticket {
    id: number;
    nombre: string;
    email: string;
    categoria: string;
    descripcion: string;
    estado: Estado;
    fecha: string; // formato ISO (ej: "2025-07-10")
}
