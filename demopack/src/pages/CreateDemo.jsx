// src/pages/CreateDemo.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function createId(){ return Date.now().toString(36) }

export default function CreateDemo(){
  const [title, setTitle] = useState('Signup flow — new user')
  const [desc, setDesc] = useState('Quick onboarding checklist')
  const [steps, setSteps] = useState(['Signup','Verify email','Complete profile','Start first project'])
  const nav = useNavigate()

  function addStep(){ setSteps(s => [...s, `Step ${s.length+1}`]) }
  function updateStep(i, v){ setSteps(s => s.map((x, idx)=> idx===i? v : x)) }
  function removeStep(i){ setSteps(s => s.filter((_,idx)=> idx!==i)) }

  function saveDemo(){
    const id = createId()
    const demo = { id, title, desc, steps, createdAt: new Date().toISOString() }
    const stored = JSON.parse(localStorage.getItem('demos'||'[]') || '[]')
    stored.push(demo)
    localStorage.setItem('demos', JSON.stringify(stored))
    nav(`/demo/${id}`)
  }

  async function exportWidget(){
    const id = createId()
    const demo = { id, title, desc, steps, createdAt: new Date().toISOString() }
    const zip = new JSZip()
    const widgetScript = await fetch('/onboard-widget.js').then(r=>r.text())
    zip.file('onboard-widget.js', widgetScript)
    zip.file('demo.json', JSON.stringify(demo, null, 2))
    zip.file('README.txt', `Drop-in Onboarding Widget\n\nSnippet:\n<div id="onboard-root"></div>\n<script src="./onboard-widget.js"></script>\n<script>\n  Onboard.init({ container: '#onboard-root', demo: ${JSON.stringify(demo)} })\n</script>`)
    const content = await zip.generateAsync({type: 'blob'})
    saveAs(content, `onboard-widget-${id}.zip`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <label className="block text-sm text-slate-300 mb-1">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-3 rounded-md bg-white/3 border border-white/6" />
        </div>

        <div style={{minWidth:220}}>
          <div className="micro mb-1">Actions</div>
          <div className="flex flex-col gap-2">
            <button onClick={saveDemo} className="btn btn-primary">Publish demo</button>
            <button onClick={exportWidget} className="btn bg-white/5">Export widget ZIP</button>
            <button onClick={() => { navigator.clipboard.writeText(`<script src="${location.origin}/onboard-widget.js"></script>`); alert('Embed snippet copied'); }} className="btn bg-white/5">Copy Snippet</button>
          </div>
        </div>
      </div>

      <div className="app-card">
        <h3 className="font-semibold mb-3">Steps</h3>
        <div className="space-y-3">
          {steps.map((s,i)=>(
            <div key={i} className="flex items-center gap-3">
              <input className="p-2 w-10 rounded-md bg-white/3 border border-white/6" value={s} onChange={e=>updateStep(i, e.target.value)} />
              <button onClick={()=>removeStep(i)} className="btn bg-red-600/80 text-white">Delete</button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button onClick={addStep} className="btn bg-white/5">Add step</button>
        </div>
      </div>

      <p className="micro">Tip: Use the "Export widget ZIP" to hand over code to buyers with README and demo json included.</p>
    </div>
  )
}