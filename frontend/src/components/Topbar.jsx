import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Topbar = () => {
  const {user, logout } = useContext(AuthContext)
  return (
    <motion.header 
    initial={{ y:-20, opacity:0}} 
    animate={{ y:0, opacity:1 }}
    className='fixed left-0 right-0 top-0 z-40'
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between card card-border card-shadow">
        <Link to="/dashboard" className='flex items-center gap-3'>
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow">SF</div>
        <div className="text-lg font-semibold">SmartForms</div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to='/dashboard' className='text-sm hover:text-indigo-600 transition font-semibold'>Dashboard</Link>
          {user ? (
            <>
            <div className="text-sm text-slate-600">Hi, {user.name}</div>
            <button 
            onClick={logout}
            className='btn-ghost'
            >Logout</button>
            </>
          ): (
             <Link to="/login" className="border border-blue-500 p-2 bg-blue-500 rounded-xl shadow-sm hover:bg-blue-500">Sign in</Link>
          )}
        </nav>
      </div>
    </motion.header>
  )
}

export default Topbar