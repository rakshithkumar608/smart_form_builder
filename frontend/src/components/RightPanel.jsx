import React from 'react';

export default function RightPanel({ field, onChange }) {
  if (!field) return <div className="w-96 p-4 font-semibold text-xl text-slate-600">Select a field to edit</div>;
const set = (patch) => onChange({ ...field, ...patch });
return (
    <aside className="w-96 p-4 sticky top-28">
      <div className="card p-4 rounded-2xl card-border card-shadow">
        <h4 className="font-semibold mb-3">Field settings</h4>
<label className="text-sm">Label</label>
        <input value={field.label} onChange={e => set({ label: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
<label className="text-sm">Placeholder</label>
        <input value={field.placeholder || ''} onChange={e => set({ placeholder: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
<div className="flex items-center gap-2 mb-3">
          <input type="checkbox" checked={field.required || false} onChange={e => set({ required: e.target.checked })} />
          <label className="text-sm">Required</label>
        </div>
{(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
          <>
            <label className="text-sm mb-1">Options (one per line)</label>
            <textarea value={(field.options || []).join('\n')} onChange={e => set({ options: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </>
        )}
<div className="mt-4">
          <h5 className="font-medium">Conditional Logic</h5>
          <div className="text-sm text-slate-500 mt-1">Show this field only when conditions match.</div>
          {/* placeholder UI - implement ConditionalBuilder component for advanced rules */}
          <div className="mt-3 text-xs text-slate-600">Use the builder to add rules (coming soon)</div>
        </div>
      </div>
    </aside>
  );
}


