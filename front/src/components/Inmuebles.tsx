import React, { useEffect, useState } from "react";

// Define la interfaz para los inmuebles
interface Inmueble {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  precio: string;
  imagen_url: string;
}
export default function Inmuebles() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [error, setError] = useState<string>("");

  // Función para obtener los inmuebles
  const obtenerInmuebles = async () => {
    try {
      const response = await fetch("http://localhost:4173/api/inmuebles");
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setInmuebles(data); // Asignamos los inmuebles obtenidos
    } catch (err) {
      setError("Error al obtener los productos");
      console.error(err);
    }
  };

  useEffect(() => {
    obtenerInmuebles();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Inmuebles</h2>
        
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {inmuebles.map((inmueble) => (
            <a key={inmueble.id} href="#" className="group">
              <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 xl:h-72">
                <img
                  alt={inmueble.titulo}
                  src={inmueble.imagen_url}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-300">{inmueble.titulo}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">{inmueble.precio}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{inmueble.ubicacion}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
