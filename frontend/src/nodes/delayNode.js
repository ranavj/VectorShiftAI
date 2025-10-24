import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);
  const [ms, setMs] = useState(data?.ms ?? 1000);
  useEffect(() => { update(id, 'ms', ms); }, [id, ms, update]);

  return (
    <NodeBase id={id} title="Delay" subtitle="Pass-through after N ms" inputs={[{ id:'in' }]} outputs={[{ id:'out' }]}>
      <label style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <span style={{ fontSize:12, color:'#9CA3AF' }}>Delay (ms)</span>
        <input
          style={{ padding:8, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#E5E7EB' }}
          type="number" min="0" value={ms} onChange={(e)=>setMs(parseInt(e.target.value || '0',10))}
        />
      </label>
    </NodeBase>
  );
};
