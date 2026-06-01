import React, { useState } from "react";

// Ejemplo de mal manejo de estado como objeto
export default function FormularioMalo() {
  const [form, setForm] = useState({ nombre: "", email: "" });

  // Solo actualiza un campo, sobreescribiendo el otro
  const handleChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
    console.log("Estado actual:", form);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Formulario (mal manejo de estado)</h2>
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
      <p style={{ color: 'red' }}>
        Escribe en ambos campos y observa cómo se pierde el valor del otro campo.<br/>
        Revisa la consola para ver el estado.
      </p>
    </div>
  );
}
