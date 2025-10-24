import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const IfNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);
  const [expr, setExpr] = useState(data?.expr || 'x > 0');
  useEffect(() => { update(id, 'expr', expr); }, [id, expr, update]);

  return (
    <NodeBase id={id} title="If" subtitle="Route by condition" inputs={[{ id:'x' }]} outputs={[{ id:'true' }, { id:'false' }]}>
      <label style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <span style={{ fontSize:12, color:'#9CA3AF' }}>Condition (JS)</span>
        <input
          style={{ padding:8, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#E5E7EB' }}
          type="text" value={expr} onChange={(e)=>setExpr(e.target.value)}
        />
      </label>
    </NodeBase>
  );
};
