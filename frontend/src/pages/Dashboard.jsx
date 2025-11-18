import React, { useEffect, useState } from 'react';
import api from '../api/http';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
export default function Dashboard(){
  const [forms, setForms] = useState([]);
  const nav = useNavigate();
useEffect(()=> {
    api.get('/forms').then(r => setForms(r.data)).catch(()=> setForms([]));
  }, []);
const create = async () => {
    const res = await api.post('/forms', { title: 'Untitled form', description: '', fields: [] });
    nav(`/forms/${res.data._id}/edit`);
  };
return (
    <div>
      <Topbar />
      <div className="max-w-6xl mx-auto pt-28 px-6 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Forms</h1>
            <p className="text-sm text-slate-500 mt-1">Create beautiful forms with glassy style.</p>
          </div>
          <div>
            <button onClick={create} className="btn-primary">+ Create Form</button>
          </div>
        </div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map(f => (
            <div key={f._id} className="p-6 rounded-2xl card card-border card-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{f.description}</p>
                </div>
                <div className="text-xs text-slate-400">{new Date(f.createdAt).toLocaleDateString()}</div>
              </div>
<div className="mt-6 flex gap-2">
                <Link to={`/forms/${f._id}/edit`} className="px-3 py-2 rounded-lg bg-indigo-600 text-white">Edit</Link>
                <a className="px-3 py-2 rounded-lg border" href={`${import.meta.env.VITE_API_URL.replace('/api','')}/forms/${f.slug}`} target="_blank">Public</a>
                <Link to={`/forms/${f._id}/submissions`} className="px-3 py-2 rounded-lg border">Submissions</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
