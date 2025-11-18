import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';
/**
 * ConditionalBuilder props:
 * - fields: array of form.fields (used to populate field dropdowns)
 * - logicGroups: state array (see below)
 * - setLogicGroups: setter
 *
 * State shape:
 * logicGroups = [
 *  { id: 'g1', rules: [ { id:'r1', field: 'fieldId', operator:'equals', value: '' }, ... ] },
 *  ...
 * ]
 */
export default function ConditionalBuilder({ fields = [], logicGroups, setLogicGroups }) {
  // init if not provided
  React.useEffect(() => {
    if (!logicGroups) setLogicGroups([{ id: uuid(), rules: [{ id: uuid(), field: '', operator: 'equals', value: '' }] }]);
  }, []);
const addGroup = () => {
    setLogicGroups([...logicGroups, { id: uuid(), rules: [{ id: uuid(), field: '', operator: 'equals', value: '' }] }]);
  };
const deleteGroup = (groupId) => setLogicGroups(logicGroups.filter(g => g.id !== groupId));
const addRule = (groupId) => {
    setLogicGroups(logicGroups.map(g => g.id === groupId ? { ...g, rules: [...g.rules, { id: uuid(), field: '', operator: 'equals', value: '' }] } : g));
  };
const deleteRule = (groupId, ruleId) => {
    setLogicGroups(logicGroups.map(g => g.id === groupId ? { ...g, rules: g.rules.filter(r => r.id !== ruleId) } : g));
  };
const updateRule = (groupId, ruleId, key, val) => {
    setLogicGroups(logicGroups.map(g => g.id === groupId ? { ...g, rules: g.rules.map(r => r.id === ruleId ? { ...r, [key]: val } : r) } : g));
  };
const onDragEnd = (result) => {
    if (!result.destination) return;
// drag groups (type 'group')
    if (result.type === 'group') {
      const newGroups = Array.from(logicGroups);
      const [moved] = newGroups.splice(result.source.index, 1);
      newGroups.splice(result.destination.index, 0, moved);
      setLogicGroups(newGroups);
      return;
    }
// drag rules inside a group — result.type holds groupId in our droppable
    const groupId = result.type;
    const groupIndex = logicGroups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return;
    const group = logicGroups[groupIndex];

const newRules = Array.from(group.rules);
    const [movedRule] = newRules.splice(result.source.index, 1);
    newRules.splice(result.destination.index, 0, movedRule);
const newGroups = [...logicGroups];
    newGroups[groupIndex] = { ...group, rules: newRules };
    setLogicGroups(newGroups);
  };
return (
    <div className="p-4 rounded-2xl card card-border card-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Conditional Logic</h3>
        <button onClick={addGroup} className="px-3 py-1 rounded bg-indigo-600 text-white">+ Add Group</button>
      </div>
<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="groups" type="group">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {logicGroups.map((group, gIndex) => (
                <Draggable key={group.id} draggableId={group.id} index={gIndex}>
                  {(prov) => (
                    <motion.div ref={prov.innerRef} {...prov.draggableProps} initial={{ opacity: 0.02 }} animate={{ opacity: 1 }} className="p-3 bg-white/90 rounded-lg border">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div {...prov.dragHandleProps} className="cursor-grab text-slate-400">⠿</div>
                          <div className="font-medium">Group {gIndex + 1}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => deleteGroup(group.id)} className="text-red-500">Delete</button>
                        </div>
                      </div>
<Droppable droppableId={`rules-${group.id}`} type={group.id}>
                        {(dropProvided) => (
                          <div ref={dropProvided.innerRef} {...dropProvided.droppableProps} className="space-y-2">
                            {group.rules.map((rule, rIndex) => (
                              <Draggable key={rule.id} draggableId={rule.id} index={rIndex}>
                                {(rProv) => (
                                  <div ref={rProv.innerRef} {...rProv.draggableProps} className="flex gap-2 items-center bg-white p-2 rounded shadow-sm">
                                    <div {...rProv.dragHandleProps} className="cursor-grab text-slate-400">⠿</div>
<select className="p-2 border rounded" value={rule.field} onChange={e => updateRule(group.id, rule.id, 'field', e.target.value)}>
                                      <option value="">Choose field</option>
                                      {fields.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                                    </select>
<select className="p-2 border rounded" value={rule.operator} onChange={e => updateRule(group.id, rule.id, 'operator', e.target.value)}>
                                      <option value="equals">equals</option>
                                      <option value="not_equals">not equals</option>
                                      <option value="contains">contains</option>
                                      <option value="gt">greater than</option>
                                      <option value="lt">less than</option>
                                    </select>
<input className="flex-1 p-2 border rounded" value={rule.value} onChange={e => updateRule(group.id, rule.id, 'value', e.target.value)} placeholder="Value" />
<button onClick={() => deleteRule(group.id, rule.id)} className="text-red-500">✖</button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {dropProvided.placeholder}
                          </div>
                        )}
                      </Droppable>
<div className="mt-3">
                        <button onClick={() => addRule(group.id)} className="px-3 py-1 rounded bg-indigo-500 text-white">+ Add Rule</button>
                      </div>
                    </motion.div>
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

