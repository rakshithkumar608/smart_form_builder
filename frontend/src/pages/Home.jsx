import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold ">Smart Form Builder</h1>
      <p className="mt-4">Build dynamic forms, collect responses, view analytics.</p>
      <div className="mt-6 space-x-4">
        <Link to="/register" className='p-2 border mt-3 rounded-lg bg-blue-400 text-xl font-semibold hover:bg-blue-500 border-blue-700 shadow-xl'>Get Started</Link>
        <Link to="/dashboard" className='p-2 border mt-3 rounded-lg bg-blue-400 text-xl font-semibold hover:bg-blue-500 border-blue-700 shadow-xl'>Dashboard</Link>

      </div>
    </div>
  )
}

export default Home