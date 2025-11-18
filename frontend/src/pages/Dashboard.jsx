import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/http";

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api
      .get("/forms")
      .then((r) => setForms(r.data))
      .catch(() => setForms([]));
  }, []);

  const create = async () => {
    const res = await api.post("/forms", {
      title: "Untitled form",
      description: "",
      fields: [],
    });
    nav(`/forms/${res.data._id}/edit`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Youe Forms</h2>
        <button
          onClick={create}
          className="p-2 border-green-300 border rounded-xl bg-green-400 hover:bg-green-500 shadow-emerald-700 font-semibold"
        >
          Create Form
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {forms.map((f) => (
          <div key={f._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.description}</p>
            <div className="mt-3 flex gap-2">
              <Link to={`/forms/${f._id}/edit`} className="btn-sm">
                Edit
              </Link>
              <Link
                to={`/forms/${f.slug}`}
                className="btn-sm-outline"
                target="_blank"
              >
                Public
              </Link>
              <Link to={`/forms/${f._id}/submissions`} className="btn-sm">
                Submissions
              </Link>
              <Link to={`/forms/${f._id}/analytics`} className="btn-sm">
                Analytics
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
