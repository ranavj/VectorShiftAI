// src/nodes/llmNode.js
import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore(s => s.updateNodeField);
  const [model, setModel] = useState(data?.model || 'gpt-4o-mini');
  const [temperature, setTemperature] = useState(data?.temperature ?? 0.2);

  useEffect(() => { updateNodeField(id, 'model', model); }, [id, model, updateNodeField]);
  useEffect(() => { updateNodeField(id, 'temperature', temperature); }, [id, temperature, updateNodeField]);

  return (
    <NodeBase
      id={id}
      title="LLM"
      subtitle="Takes system + prompt, returns response"
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>Model</span>
        <select
          style={{ padding: 8, borderRadius: 8, border: '1px solid #374151', background: '#111827', color: '#E5E7EB' }}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-4o">gpt-4o</option>
          <option value="gpt-3.5">gpt-3.5</option>
        </select>
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>Temperature</span>
        <input
          style={{ padding: 8, borderRadius: 8, border: '1px solid #374151', background: '#111827', color: '#E5E7EB' }}
          type="number" step="0.1" min="0" max="1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
      </label>
    </NodeBase>
  );
};
