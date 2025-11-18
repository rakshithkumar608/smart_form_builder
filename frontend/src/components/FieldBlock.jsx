import React from 'react';
import { motion } from 'framer-motion';

export default function FieldBlock({ field, onSelect, onDuplicate, onDelete, isSelected }) {
  return (
    <motion.div layout whileHover={{ scale: 1.01 }} className={`p-3 rounded-2xl field-card ${isSelected ? 'ring-2 ring-indigo-200' : ''}`}>
      <div className="flex justify-between items-start gap-3">
        <div>
          <div className="font-medium">{field.label || '(Untitled)'}</div>
          <div className="text-xs text-slate-500 mt-1">{field.type}</div>
        </div>
<div className="flex gap-2">
          <button onClick={onDuplicate} className="text-sm text-black rounded-xl font-semibold p-2 bg-sky-400 hover:bg-sky-500 shadow-blue-400">Duplicate</button>
          <button onClick={onDelete} className="text-sm text-black rounded-xl font-semibold p-2 bg-red-400 hover:bg-red-500 shadow-red-300">Delete</button>
        </div>
      </div>
    </motion.div>
  );
}

