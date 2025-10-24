import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const HttpNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  useEffect(() => { update(id, 'method', method); }, [id, method, update]);
  useEffect(() => { update(id, 'url', url); }, [id, url, update]);

  return (
    <NodeBase id={id} title="HTTP" subtitle="Configure request" inputs={[{ id:'body' }, { id:'headers' }]} outputs={[{ id:'response' }]}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 3fr', gap:8 }}>
        <select
          style={{ padding:8, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#E5E7EB' }}
          value={method} onChange={(e)=>setMethod(e.target.value)}
        >
          <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option>
        </select>
        <input
          style={{ padding:8, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#E5E7EB' }}
          type="text" value={url} onChange={(e)=>setUrl(e.target.value)}
        />
      </div>
    </NodeBase>
  );
};
