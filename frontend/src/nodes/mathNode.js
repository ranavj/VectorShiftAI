import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);
  const [op, setOp] = useState(data?.op || 'add');
  const [k, setK] = useState(data?.k ?? 1);
  useEffect(() => { update(id, 'op', op); }, [id, op, update]);
  useEffect(() => { update(id, 'k', k); }, [id, k, update]);

  return (
    <NodeBase id={id} title="Math" subtitle="Apply op to number" inputs={[{ id:'x' }]} outputs={[{ id:'y' }]}>
      <label style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <span style={{ fontSize:12, color:'#9CA3AF' }}>Operation</span>
        <select
          style={{ padding:8, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#E5E7EB' }}
          value={op} onChange={(e)=>setOp(e.target.value)}
        >
          <option value="add">add</option>
          <option value="mul">mul</option>
          <option value="pow">pow</option>
        </select>
      </label>
      <label style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <span style={{ fontSize:12, color:'#9CA3AF' }}>k</span>
        <input
          style={{ padding:8, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#E5E7EB' }}
          type="number" value={k} onChange={(e)=>setK(parseFloat(e.target.value || '0'))}
        />
      </label>
    </NodeBase>
  );
};
