// src/App.jsx
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CreateDemo from './pages/CreateDemo'
import DemoPage from './pages/DemoPage'

export default function App(){
  return (
    <div className="min-h-screen">
      <header className="py-6">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-teal-400 flex items-center justify-center font-bold shadow-lg">DP</div>
            <div>
              <div className="text-white font-bold">DemoPack</div>
              <div className="micro">Build demos · Export widgets · Sell integrations</div>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link to="/" className="micro text-slate-300 hover:text-white">Create</Link>
            <a href="#/demo/sample" className="micro text-slate-300 hover:text-white">Sample</a>
            <a href="https://github.com/OutDuke/demopack" target="_blank" rel="noreferrer" className="micro text-slate-300 hover:text-white">Repo</a>
            <Link to="/" className="btn btn-primary">Create Demo</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="app-card mb-6">
              <h1 className="text-2xl font-extrabold mb-2">Create a clickable demo in 60 seconds</h1>
              <p className="micro mb-4">Generate a hosted demo page, export drop-in widgets, and hand-over integration packs to buyers.</p>
              <div className="flex gap-3">
                <Link to="/#/" className="btn btn-primary">Start a Demo</Link>
                <a href="#/demo/sample" className="btn bg-white/5">View Sample</a>
              </div>
            </div>

            {/* router outlet */}
            <div className="app-card">
              <Routes>
                <Route path="/" element={<CreateDemo/>} />
                <Route path="/demo/:id" element={<DemoPage/>} />
              </Routes>
            </div>
          </div>

          <aside>
            <div className="app-card card-hover p-4">
              <h3 className="font-semibold mb-2">Marketplace Ready</h3>
              <p className="micro mb-3">Export your widget ZIP and post it on the trading floor. Buyers see a live demo and can pay for integration slots.</p>
              <ul className="micro list-disc pl-4">
                <li>Copy-paste snippet</li>
                <li>Hosted demo</li>
                <li>1-hour integration slot</li>
              </ul>
            </div>

            <div className="app-card mt-4 p-3 micro">
              <div className="font-semibold">Quick tips</div>
              <ol className="list-decimal pl-5">
                <li>Always show `/demo/sample`</li>
                <li>Use the embed snippet during pitch</li>
                <li>Record a 30s backup video</li>
              </ol>
            </div>
          </aside>
        </section>
      </main>

      <div className="demo-badge">Live demo: <a href="#/demo/sample" className="font-semibold underline ml-2">Open</a></div>
    </div>
  )
}