import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FieldBlock from './FieldBlock';

export default function FormCanvas({ fields, setFields, onSelect, selectedId }) {
  const onDragEnd = result => {
    if (!result.destination) return;
    const newFields = Array.from(fields);
    const [moved] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, moved);
    setFields(newFields);
  };
return (
    <div className="flex-1 min-h-[60vh] p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="canvas">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {fields.map((f, i) => (
                <Draggable key={f.id} draggableId={f.id} index={i}>
                  {(prov) => (
                    <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} onClick={() => onSelect(f.id)}>
                      <FieldBlock field={f} onSelect={() => onSelect(f.id)} onDuplicate={() => {
                        const copy = { ...f, id: crypto.randomUUID(), label: f.label + ' copy' };
                        setFields(s => { const arr = [...s]; arr.splice(i+1, 0, copy); return arr; });
                      }} onDelete={() => setFields(s => s.filter(x => x.id !== f.id))} isSelected={selectedId === f.id} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}




