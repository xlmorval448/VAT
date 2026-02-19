import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Agent } from '../types';

export const AgentList = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "agents"), (snapshot) => {
      setAgents(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Agent[]);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Seguro que quieres eliminar este agente?")) {
      await deleteDoc(doc(db, "agents", id));
    }
  };

  return (
    <div className="agents-grid">
      {agents.map((agent) => (
        <div key={agent.id} className="valorant-card">
          <div className="card-header">
            <h4>{agent.name}</h4>
            <p className="card-desc">{agent.description || "Sin descripción"}</p>
          </div>

          <div className="card-footer">
            <span className="agent-role badge">{agent.role}</span>
            <span className="agent-year">{agent.releaseYear}</span>
          </div>

          <button className="delete-btn-full" onClick={() => handleDelete(agent.id!)}>
            ELIMINAR AGENTE
          </button>
        </div>
      ))}
    </div>
  );
};