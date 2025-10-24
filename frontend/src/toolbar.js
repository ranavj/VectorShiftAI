// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='if' label='If' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='markdown' label='Markdown' />
                <DraggableNode type='http' label='HTTP' />
            </div>
        </div>
    );
};
