export const predefinedTickets = [
    {
        id: 1001,
        nombre: "Carlos Gómez",
        email: "carlos@empresa.com",
        categoria: "Hardware",
        descripcion: "La impresora no responde desde ayer.",
        estado: "sin ver",
        fecha: "2025-07-10",
    },
    {
        id: 1002,
        nombre: "Laura Méndez",
        email: "laura@empresa.com",
        categoria: "Internet",
        descripcion: "La red Wi-Fi se cae constantemente en el segundo piso.",
        estado: "en proceso",
        fecha: "2025-07-09",
    },
    {
        id: 1003,
        nombre: "Juan Pérez",
        email: "juan@empresa.com",
        categoria: "Software",
        descripcion: "Error al iniciar el sistema contable.",
        estado: "resuelto",
        fecha: "2025-07-08",
    },
] as const;     