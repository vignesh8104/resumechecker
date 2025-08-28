import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const stageOrder = ["Applied","Interview","Offer","Rejected"];

export default function KanbanBoard({ columns, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stageOrder.map(stage => (
          <Droppable droppableId={stage} key={stage}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white rounded-2xl p-3 shadow">
                <h2 className="font-semibold mb-2">{stage}</h2>
                {(columns[stage] || []).map((c, idx) => (
                  <Draggable draggableId={c._id} index={idx} key={c._id}>
                    {(prov) => (
                      <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}
                        className="border rounded-xl p-3 mb-2">
                        <div className="font-medium">{c.name}</div>
                        <div className="text-sm text-gray-600">{c.role} • {c.experienceYears} yrs</div>
                        {c.resumeUrl ? <a href={c.resumeUrl} target="_blank" className="text-sm underline">Resume</a> : null}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
