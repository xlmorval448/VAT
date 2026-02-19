import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { ValorantRole } from "../types";

export const AgentForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<ValorantRole>("Duelist");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState<number | "">("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await addDoc(collection(db, "agents"), {
      name,
      role,
      description: desc,
      releaseYear: Number(year),
      abilities: "N/A",
    });

    setName("");
    setDesc("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Agente</h3>
      <input
        value={name}
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as ValorantRole)}
      >
        <option value="Duelist">Duelist</option>
        <option value="Controller">Controller</option>
        <option value="Initiator">Initiator</option>
        <option value="Sentinel">Sentinel</option>
      </select>
      <input
        type="number"
        value={year}
        placeholder="Año"
        onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
      />
      <textarea
        value={desc}
        placeholder="Descripción"
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};