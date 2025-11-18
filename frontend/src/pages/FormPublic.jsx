import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import { useParams } from 'react-router-dom'
import api from '../api/http';
import FormPreview from '../components/FormPreview';

const FormPublic = () => {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  useEffect(() => {
    api.get(`/forms/${slug}`).then(r => setForm(r.data)).catch(() => setForm(null));
  }, [slug]);

  const submit = async (values) => {
    const fd = new FormData();
    const data = {};
    for (const [k, v] of Object.entries(values)) {
         if (v instanceof File) fd.append(k, v);
         else data[k] = v;
    }

    fd.append('data', JSON.stringify(data));
    const base = import.meta.env.VITE_API_URL.replace('/api', '');
    const res = await fetch(`${base}/api/forms/${form._id}/submit`, { method: 'POST', body: fd });
    if (res.ok) alert('Thanks - Submitted!');
    else alert('Submit failed');
  }
  return (
    <div>
      <Topbar />
      <div className="min-h-screen flex items-start justify-center pt-28 pb-20 px-4">
        <div className="max-w-2xl w-full p-8 rounded-3xl card card-border card-shadow">
          {!form ? <div>Loading...</div> : (
            <>
            <h1 className="text-3xl font-bold">{form.title}</h1>
            <p className="text-sm text-slate-600 mt-2">{form.description}</p>
            <div className="mt-6">
              <FormPreview 
              form={form}
              onSubmit={submit}
              />
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormPublic