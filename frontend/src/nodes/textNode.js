// src/nodes/textNode.js
import { useEffect, useMemo, useRef, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

const VAR_RE = /{{\s*([a-zA-Z_$][\w$]*)\s*}}/g;
const longestLineChars = (s) =>
  s.split(/\r?\n/).reduce((max, line) => Math.max(max, line.length), 0);

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore(s => s.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const taRef = useRef(null);

  const variables = useMemo(() => {
    const found = new Set();
    for (const match of currText.matchAll(VAR_RE)) found.add(match[1]);
    return Array.from(found);
  }, [currText]);

  useEffect(() => { updateNodeField(id, 'text', currText); }, [id, currText, updateNodeField]);
  useEffect(() => { updateNodeField(id, 'vars', variables); }, [id, variables, updateNodeField]);

  // auto-resize height
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [currText]);

  const dynamicWidthCh = Math.min(Math.max(longestLineChars(currText), 20), 60);
  const inputs = variables.map((v, i) => ({
    id: v,
    topPct: ((i + 1) * (100 / (variables.length + 1))),
  }));

  return (
    <NodeBase
      id={id}
      title="Text"
      subtitle="Type text. Use {{var}} to add inputs."
      width={`calc(${dynamicWidthCh}ch + 48px)`}
      minHeight={120}
      inputs={inputs}
      outputs={[{ id: 'output' }]}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>Text</span>
        <textarea
          ref={taRef}
          style={{
            borderRadius: 8,
            border: '1px solid #374151',
            background: '#111827',
            color: '#E5E7EB',
            resize: 'none',
            width: '100%',
            lineHeight: 1.4,
            overflow: 'hidden'
          }}
          rows={3}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
      </label>
    </NodeBase>
  );
};
