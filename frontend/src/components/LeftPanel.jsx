import React from "react";
import { motion } from "framer-motion";

const items = [
  { key: "text", label: "Text" },
  { key: "textarea", label: "Paragraph" },
  { key: "select", label: "Dropdown" },
  { key: "radio", label: "Radio" },
  { key: "checkbox", label: "Checkbox" },
  { key: "date", label: "Date" },
  { key: "file", label: "File" },
];

const LeftPanel = ({ onAdd }) => {
  return (
    <aside className="w-72 sticky top-28 h-[calc(100vh-7rem)] overflow-auto pr-3">
      <div className="p-4 card-shadow card-border rounded-2xl card">
        <h4 className="text-sm font-semibold mb-3">Add Field</h4>
        <div className="space-y-2">
          {items.map((it) => (
            <motion.button
              key={it.key}
              whileHover={{ scale: 1.02 }}
              onClick={() => onAdd(it.key)}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/60 hover:shadow-sm"
            >
              {it.label}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="mt-4 p-4 rounded-2xl card card-border card-shadow">
        <h4 className="text-sm font-semibold mb-2">Templates</h4>
        <div className="grid gap-2">
          <button
            className="text-left p-3 w-40 rounded-lg bg-white/60 text-gray-800 
             hover:bg-white hover:shadow-lg transition duration-200 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Contact Form
          </button>

          <button
            className="text-left p-3 w-40 rounded-lg bg-white/60 text-gray-800 
             hover:bg-white hover:shadow-lg transition duration-200 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Survey
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftPanel;
