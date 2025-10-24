// draggableNode.js
import React from 'react';

const ICONS = {
  input:'⌨️', llm:'🤖', output:'📤', text:'📝', delay:'⏳',
  if:'🔀', math:'➗', markdown:'🧾', http:'🌐', customInput: '⌨️', customOutput: '📤',
};

export const DraggableNode = ({ type, label, icon, variant='dark' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const cls = variant === 'light' ? 'vs-tile' : 'vs-chip';
  const iconCls = variant === 'light' ? 'vs-tile__icon' : 'vs-chip__icon';
  const resolved = icon ?? ICONS[type];

  return (
    <div
      className={`vs-font ${cls} ${type}`}
      draggable
      onDragStart={(e)=>onDragStart(e, type)}
      onDragEnd={(e)=> (e.currentTarget.style.cursor='grab')}
    >
      <span className={iconCls}>
        {resolved === 'socket' ? <span className="vs-socket" /> : resolved}
      </span>
      <span className="vs-label">{label}</span>
    </div>
  );
};
