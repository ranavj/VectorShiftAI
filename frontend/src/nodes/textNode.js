import { useEffect, useMemo, useRef, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

// JS identifier inside {{ }}
const VAR_RE = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const update = useStore(s => s.updateNodeField);

  const [text, setText] = useState(data?.text ?? '');
  const [vars, setVars] = useState(() => extractVars(text));

  // hidden sizer for measuring content
  const sizerRef = useRef(null);
  const size = useAutoSize(text, sizerRef);

  // keep store in sync (optional but nice)
  useEffect(() => { update(id, 'text', text); }, [id, text, update]);
  useEffect(() => { update(id, 'vars', vars); }, [id, vars, update]);

  // parse vars when text changes
  useEffect(() => { setVars(extractVars(text)); }, [text]);

  // convert vars → NodeBase inputs
  const inputs = useMemo(() => vars.map(v => ({ id: v })), [vars]);

  return (
    <NodeBase
      id={id}
      title="Text"
      subtitle="Write text; use {{var}} to add inputs"
      icon="📝"
      width={size.width}       // auto width
      minHeight={size.height}  // auto height
      inputs={inputs}          // dynamic handles from {{var}}
      outputs={[{ id: 'text' }]}
    >
      <div style={{ position:'relative' }}>
        {/* hidden mirror for measuring */}
        <div ref={sizerRef} style={sizerStyle}>{text || ' '}</div>

        <textarea
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="e.g. Hello {{name}}, your total is {{amount}}."
          style={taStyle}
        />
      </div>
    </NodeBase>
  );
};

/* ------------ helpers ------------ */

function extractVars(str){
  const set = new Set();
  let m;
  while ((m = VAR_RE.exec(str)) !== null) set.add(m[1]);
  // order by first occurrence so handles feel stable/left→right reading
  const order = [];
  for (const v of set) order.push([v, str.indexOf(`{{${v}}}`)]);
  order.sort((a,b)=>a[1]-b[1]);
  return order.map(x=>x[0]);
}

function useAutoSize(text, sizerRef){
  const [sz, setSz] = useState({ width: 260, height: 140 });

  useEffect(() => {
    const el = sizerRef.current;
    if (!el) return;

    // bounds so node kabhi be-had bada/chhota na ho
    const MIN_W = 240, MAX_W = 420;
    const MIN_H = 120, MAX_H = 260;

    // extra padding for header/subtitle/body
    const PAD_W = 40, PAD_H = 80;

    const w = clamp(el.scrollWidth + PAD_W, MIN_W, MAX_W);
    const h = clamp(el.scrollHeight + PAD_H, MIN_H, MAX_H);
    setSz({ width: w, height: h });
  }, [text]);

  return sz;
}
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* ------------ inline styles (repo style match) ------------ */

const taStyle = {
  width:'100%', minHeight:80, resize:'none',
  padding:0, borderRadius:8,
  border:'1px solid #374151', background:'#111827', color:'#E5E7EB',
  font:'14px Inter, system-ui, sans-serif', lineHeight:'20px', outline:'none'
};

const sizerStyle = {
  position:'absolute', visibility:'hidden', zIndex:-1,
  whiteSpace:'pre-wrap', wordBreak:'break-word',
  font:'14px Inter, system-ui, sans-serif', lineHeight:'20px',
  padding:10, border:'1px solid transparent', width:'100%'
};
