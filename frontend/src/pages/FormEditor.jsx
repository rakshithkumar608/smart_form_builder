import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import LeftPanel from '../components/LeftPanel'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/http'
import FormCanvas from '../components/FormCanvas'
import ConditionalBuilder from '../components/ConditionalBuilder'
import RightPanel from '../components/RightPanel'

const FormEditor = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title:'', description:'', fields: [], conditions: []});
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if(!id) return;
    api.get(`/forms/${id}`).then(r => setForm(r.data)).catch(()=> {})
  }, [id]);

  const addField = (type) => {
    const f = {id: crypto.randomUUID(), label: 'Untitled',type, options: [], placeholder: '', required: false, conditional: { enabled:false } };
    setForm(s => ({ ...s, fields: [...s.fields, f] }));
    setSelectedId(f.id);
  };

  const setFields = (newFields) => setForm(s => ({ ...s, fields: newFields }));
  const select = (id) => setSelectedId(id);
  const updateSelected = (patch) => setForm(s => ({ ...s, fields: s.fields.map(ff => ff.id === selectedId ? { ...ff, ...patch } : ff) }));


  const save = async () => {
    if(id) await api.put(`/forms/${id}`, form);
    else {
      const r = await api.post('/forms', form);
      nav(`/forms/${r.data._id}/edit`);
    }
  };

  const selField = form.fields.find(f => f.id === selectedId);

  return (
    <div>
      <Topbar />
      <div className='max-w-7xl mx-auto pt-28 px-6 pb-20'>
        <div className="flex gap-6">
          <LeftPanel onAdd={addField}/>
          <div className="flex-1">
            <FormCanvas 
            fields={form.fields}
            setFields={setFields}
            onSelect={select}
            selectedId={selectedId}
            />
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3">Conditional Logic (Advanced)</h4>
              <ConditionalBuilder 
              fields={form.fields}
              logicGroups={form.conditions}
              setLogicGroups={(conds) => setForm(s => ({ ...s, conditions: conds}))}
              />
              <div className="mt-3 text-sm text-slate-500">Rules control field visibility. Groups are ORed; rules inside group are ANDed.</div>
            </div>
          </div>
          <RightPanel 
          field={selField}
          onChange={(f) => updateSelected(f)}
          />
        </div>

        <div className="fixed right-8 bottom-8">
          <button 
          onClick={save}
          className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  )
}

export default FormEditor