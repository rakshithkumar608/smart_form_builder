
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

function computeVisibleFieldIds(form, data) {
  
  const visible = new Set();

  if (!form.conditions || form.conditions.length === 0) {
    for (const f of (form.fields || [])) {
      if (f.conditional && f.conditional.enabled) {
        const left = data[f.conditional.fieldId];
        if (opEvaluate(f.conditional.operator, left, f.conditional.value)) visible.add(f.id);
        // if conditional false, NOT visible
      } else {
        visible.add(f.id); // no conditional -> visible
      }
    }
    return visible;
  }

  const groups = form.conditions || [];
for (const field of (form.fields || [])) {
   
  }


for (const group of groups) {
    // evaluate all rules in this group
    const results = group.rules.map(r => {
      const left = data[r.field];
      return { rule: r, ok: opEvaluate(r.operator, left, r.value) };
    });
// If all rules true, mark all fields referenced in this group visible
    const allTrue = results.every(x => x.ok);
    if (allTrue) {
      for (const r of results) visible.add(r.rule.field);
      continue;
    }
// Otherwise, for any single rule that is true, mark its field visible
    for (const r of results) {
      if (r.ok) visible.add(r.rule.field);
    }
  }
// Finally, also add fields that have no relation to any condition (i.e., not referenced by any rule)
  const referenced = new Set();
  for (const g of (form.conditions || [])) for (const r of g.rules) referenced.add(r.field);
  for (const f of (form.fields || [])) {
    if (!referenced.has(f.id)) visible.add(f.id); // not controlled by conditions -> visible
  }
return visible;
}
/**
 * Check required fields given form and submitted data:
 * returns { ok: boolean, missing: [fieldId,...], filteredData: {} }
 */
function validateSubmissionByConditions(form, data) {
  const visible = computeVisibleFieldIds(form, data);
  const missing = [];
  const filteredData = {};
for (const f of (form.fields || [])) {
    if (!visible.has(f.id)) continue; // ignore hidden fields
    // if visible, check required
    if (f.required && (data[f.id] === undefined || data[f.id] === null || data[f.id] === '' || (Array.isArray(data[f.id]) && data[f.id].length === 0))) {
      missing.push(f.id);
    }
    // include value in filteredData if present
    if (data[f.id] !== undefined) filteredData[f.id] = data[f.id];
  }
return { ok: missing.length === 0, missing, filteredData, visible: Array.from(visible) };
}
module.exports = { computeVisibleFieldIds, validateSubmissionByConditions, opEvaluate };
