// src/nodes/outputNode.js
import { useEffect, useState } from 'react';
import NodeBase from './NodeBase';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore(s => s.updateNodeField);
  const initialName = data?.outputName || id.replace('customOutput-', 'output_');
  const [currName, setCurrName] = useState(initialName);
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  useEffect(() => { updateNodeField(id, 'outputName', currName); }, [id, currName, updateNodeField]);
  useEffect(() => { updateNodeField(id, 'outputType', outputType); }, [id, outputType, updateNodeField]);

  return (
    <NodeBase
      id={id}
      title="Output"
      subtitle="Collect or display the value"
      inputs={[{ id: 'value' }]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </NodeBase>
  );
};
