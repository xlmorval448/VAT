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
    await deleteDoc(doc(db, "agents", id));
  };

  return (
    <div>
      <h2>Lista</h2>
      {agents.map((agent) => (
        <div key={agent.id}>
          <p>{agent.name} - {agent.role}</p>
          <button onClick={() => handleDelete(agent.id!)}>Borrar</button>
        </div>
      ))}
    </div>
  );
};