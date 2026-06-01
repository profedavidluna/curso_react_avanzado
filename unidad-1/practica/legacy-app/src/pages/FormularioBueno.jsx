import React, { useState } from "react";

// Buen manejo de estado como objeto
export default function FormularioBueno() {
  const [form, setForm] = useState({ nombre: "", email: "" });

  // Actualiza solo el campo modificado, manteniendo el resto
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("Estado actual:", form);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Formulario (buenas prácticas)</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        style={{ marginRight: 8 }}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <p style={{ color: 'green' }}>
        Ahora puedes escribir en ambos campos sin perder datos.<br/>
        Revisa la consola para ver el estado.
      </p>
    </div>
  );
}
