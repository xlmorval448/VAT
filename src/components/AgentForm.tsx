import { useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { ValorantRole } from "../types";

export const AgentForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<ValorantRole>("Duelist");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    await addDoc(collection(db, "agents"), {
      name,
      role,
      description: desc,
      releaseYear: Number(year),
      abilities: "N/A",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Agente</h3>
      <input
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select onChange={(e) => setRole(e.target.value as ValorantRole)}>
        <option value="Duelist">Duelist</option>
        <option value="Controller">Controller</option>
        <option value="Initiator">Initiator</option>
        <option value="Sentinel">Sentinel</option>
      </select>
      <input
        type="number"
        placeholder="Año"
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <textarea
        placeholder="Descripción"
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};
