import React from 'react';

/* Evaluate rule op */
function opEvaluate(operator, left, right) {
  if (operator === 'equals') return (left == right);
  if (operator === 'not_equals') return (left != right);
  if (operator === 'contains') {
    if (Array.isArray(left)) return left.includes(right);
    if (typeof left === 'string') return (left || '').toString().includes(right);
    return false;
  }
  if (operator === 'gt') return Number(left) > Number(right);
  if (operator === 'lt') return Number(left) < Number(right);
  return false;
}

/* compute visible fields similar to backend */
function computeVisibleFieldIds(form, data) {
  const visible = new Set();
  if (!form.conditions || form.conditions.length === 0) {
    for (const f of (form.fields || [])) {
      if (f.conditional && f.conditional.enabled) {
        const left = data[f.conditional.fieldId];
        if (opEvaluate(f.conditional.operator, left, f.conditional.value)) visible.add(f.id);
      } else visible.add(f.id);
    }
    return visible;
  }

  // Evaluate groups
  const groups = form.conditions || [];
  for (const group of groups) {
    const results = group.rules.map(r => {
      const left = data[r.field];
      return { rule: r, ok: opEvaluate(r.operator, left, r.value) };
    });
    const allTrue = results.every(x => x.ok);
    if (allTrue) {
      for (const r of results) visible.add(r.rule.field);
      continue;
    }
    for (const r of results) if (r.ok) visible.add(r.rule.field);
  }
  // add fields not referenced by any rule
  const referenced = new Set();
  for (const g of (form.conditions || [])) for (const r of g.rules) referenced.add(r.field);
  for (const f of (form.fields || [])) if (!referenced.has(f.id)) visible.add(f.id);
  return visible;
}

export default function FormPreview({ form, onSubmit }) {
  const [values, setValues] = React.useState({});

  const change = (id, v) => setValues(s => ({ ...s, [id]: v }));

  if (!form) return null;

  const visible = computeVisibleFieldIds(form, values);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(values); }} className="space-y-4">
      {form.fields.map(f => {
        if (!visible.has(f.id)) return null;
        return (
          <div key={f.id} className="p-4 rounded-2xl bg-white/90 shadow">
            <label className="block font-medium mb-2">{f.label}{f.required ? '*' : ''}</label>

            {f.type === 'text' && <input className="w-full p-2 rounded-md" value={values[f.id] || ''} onChange={e => change(f.id, e.target.value)} />}
            {f.type === 'textarea' && <textarea className="w-full p-2 rounded-md" value={values[f.id] || ''} onChange={e => change(f.id, e.target.value)} />}
            {f.type === 'select' && <select className="w-full p-2 rounded-md" value={values[f.id] || ''} onChange={e => change(f.id, e.target.value)}><option value="">-- choose --</option>{(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}</select>}
            {f.type === 'date' && <input type="date" className="p-2 rounded-md" value={values[f.id] || ''} onChange={e => change(f.id, e.target.value)} />}
            {f.type === 'file' && <input type="file" onChange={e => change(f.id, e.target.files[0])} />}
          </div>
        );
      })}

      <div>
        <button type="submit" className="w-full py-3 rounded-xl" style={{ background: 'linear-gradient(90deg,var(--primary), #6366f1)', color: 'white' }}>
          Submit
        </button>
      </div>
    </form>
  );
}
