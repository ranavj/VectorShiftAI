import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const MarkdownNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);
  const [md, setMd] = useState(data?.md || '# Title\\n\\n**Bold** _Italic_');
  useEffect(() => { update(id, 'md', md); }, [id, md, update]);

  return (
    <NodeBase id={id} title="Markdown" subtitle="Author markdown" inputs={[{ id:'vars' }]} outputs={[{ id:'html' }]}>
      <textarea
        style={{
          padding:10, borderRadius:8, border:'1px solid #374151',
          background:'#111827', color:'#E5E7EB', resize:'vertical',
          width:'100%', minHeight:80
        }}
        value={md} onChange={(e)=>setMd(e.target.value)}
      />
    </NodeBase>
  );
};
