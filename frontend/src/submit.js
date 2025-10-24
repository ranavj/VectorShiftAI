// src/submit.js
import { useCallback, useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(s => ({ nodes: s.nodes, edges: s.edges }));
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      const json = await res.json();
      alert(`Nodes: ${json.num_nodes}\nEdges: ${json.num_edges}\nIs DAG: ${json.is_dag ? 'Yes' : 'No'}`);
    } catch (err) {
      console.error(err);
      alert('Failed to submit pipeline. Check console and backend.');
    } finally {
      setLoading(false);
    }
  }, [nodes, edges]);

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:12}}>
      <button onClick={onSubmit} disabled={loading} type="button">
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
