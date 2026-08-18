import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CreateDemo from './pages/CreateDemo'
import DemoPage from './pages/DemoPage'

export default function App(){
  return (
    <div className="min-h-screen p-6 bg-gray-100">
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="flex items-center justify-between mb-6">
        <Link to="/demo/sample" className="bg-black text-white px-3 py-1 rounded">
          Try Demo
        </Link>
        <h1 className="text-xl font-bold">DemoPack — Rapid Demo Builder</h1>
        <nav>
          <Link to="/" className="mr-4">Create</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CreateDemo/>} />
          <Route path="/demo/:id" element={<DemoPage/>} />
        </Routes>
      </main>
    </div>
    </div>
  )
}