export default function HomePage() {
    return (
    
        <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400 mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              TickSolution
          </h1>

            {/* Hero con imagen de fondo y contenedor borroso */}
            <section className="w-full h-[600px] relative mb-16 overflow-hidden rounded-lg">
                {/* Imagen como capa de fondo */}
                <div className="absolute inset-0 bg-[url('/img/hero.jpg')] bg-cover bg-center" />

                {/* Capa oscura semitransparente */}
                <div className="" />

                {/* Contenido central borroso */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="backdrop-blur-sm bg-white/25 p-8 rounded-lg text-center max-w-xl">
                        <p className="text-lg text-gray-200 mb-6">
                            Una solución moderna para gestionar problemas técnicos dentro de tu empresa.
                        </p>
                        <a
                            href="/nuevo-ticket"
                            className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg rounded-lg shadow-lg transition"
                        >
                            Crear nuevo ticket
                        </a>
                    </div>
                </div>
            </section>

            {/* Cards informativas */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                {/* Por qué */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-xl font-bold text-teal-400 mb-2">¿Por qué usar TickSolution?</h2>
                    <p className="text-gray-300">
                        Porque es una plataforma intuitiva, rápida y diseñada para ayudarte a resolver los 
                        problemas técnicos sin complicaciones.
                    </p>
                </div>

                {/* Para qué */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-xl font-bold text-teal-400 mb-2">¿Para qué sirve?</h2>
                    <p className="text-gray-300">
                        Para automatizar la gestión de soporte técnico dentro de una organización, aumentando 
                        la eficiencia del equipo y la satisfacción de los usuarios.
                    </p>
                </div>

                {/* Dónde */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-xl font-bold text-teal-400 mb-2">¿Dónde se usa?</h2>
                    <p className="text-gray-300">
                        Cualquier empresa puede contratar este servicio para implementar una solución efectiva 
                        a sus necesidades de soporte técnico interno.
                    </p>
                </div>
            </section>
        </main>
    );
}
