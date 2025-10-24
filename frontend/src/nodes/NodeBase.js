// src/nodes/NodeBase.js
import { Handle, Position } from 'reactflow';

export default function NodeBase({
  id,
  title,
  subtitle,
  width = 240,
  minHeight = 100,
  inputs = [],   // [{ id, topPct }]
  outputs = [],  // [{ id, topPct }]
  children,
}) {
  const cardStyle = {
    width,
    minHeight,
    border: '1px solid #2A2F3A',
    borderRadius: 12,
    background: '#0F172A',
    color: '#E2E8F0',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const headerStyle = {
    padding: '10px 12px',
    background: '#111827',
    borderBottom: '1px solid #1F2937',
    fontSize: 14,
    fontWeight: 600,
  };
  const subStyle = { padding: '0 12px 8px 12px', color: '#9CA3AF', fontSize: 12 };
  const bodyStyle = { flex: 1, padding: 12, display: 'flex', gap: 8, flexDirection: 'column' };

  return (
    <div style={cardStyle}>
      {title && <div style={headerStyle}>{title}</div>}
      {subtitle && <div style={subStyle}>{subtitle}</div>}

      {inputs.map((h, idx) => (
        <Handle
          key={h.id || idx}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id || idx}`}
          style={{
            top:
              h.topPct != null
                ? `${h.topPct}%`
                : `${(idx + 1) * (100 / (inputs.length + 1))}%`,
          }}
        />
      ))}

      <div style={bodyStyle}>{children}</div>

      {outputs.map((h, idx) => (
        <Handle
          key={h.id || idx}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id || idx}`}
          style={{
            top:
              h.topPct != null
                ? `${h.topPct}%`
                : `${(idx + 1) * (100 / (outputs.length + 1))}%`,
          }}
        />
      ))}
    </div>
  );
}
