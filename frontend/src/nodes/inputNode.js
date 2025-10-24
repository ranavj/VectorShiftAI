// src/nodes/inputNode.js
import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore(s => s.updateNodeField);
  const initialName = data?.inputName || id.replace('customInput-', 'input_');
  const [currName, setCurrName] = useState(initialName);
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  useEffect(() => { updateNodeField(id, 'inputName', currName); }, [id, currName, updateNodeField]);
  useEffect(() => { updateNodeField(id, 'inputType', inputType); }, [id, inputType, updateNodeField]);

  return (
    <NodeBase
      id={id}
      title="Input"
      subtitle="Provide a value from user / file"
      outputs={[{ id: 'value' }]}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>Name</span>
        <input
          style={{ padding: 8, borderRadius: 8, border: '1px solid #374151', background: '#111827', color: '#E5E7EB' }}
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>Type</span>
        <select
          style={{ padding: 8, borderRadius: 8, border: '1px solid #374151', background: '#111827', color: '#E5E7EB' }}
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </NodeBase>
  );
};
