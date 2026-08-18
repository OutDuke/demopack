import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function createId(){ return Date.now().toString(36) }

export default function CreateDemo(){
const [title, setTitle] = useState('Startup Onboarding');
const [desc, setDesc] = useState('Complete these steps to get started');
const [steps, setSteps] = useState([
  'Create your account',
  'Verify email',
  'Complete profile',
  'Explore dashboard'
]);
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
    // builds a zip containing the widget script + README + demo json
    const id = createId()
    const demo = { id, title, desc, steps, createdAt: new Date().toISOString() }
    const zip = new JSZip()
    // the widget script (we will include a simple public widget file; here we add a small example)
    const widgetScript = await fetch('/onboard-widget.js').then(r=>r.text())
    zip.file('onboard-widget.js', widgetScript)
    zip.file('demo.json', JSON.stringify(demo, null, 2))
    zip.file('README.txt', `Drop-in Onboarding Widget\n\nSnippet:\n<div id="onboard-root"></div>\n<script src="./onboard-widget.js"></script>\n<script>\n  Onboard.init({ container: '#onboard-root', demo: ${JSON.stringify(demo)} })\n</script>`)
    const content = await zip.generateAsync({type: 'blob'})
    saveAs(content, `onboard-widget-${id}.zip`)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create Demo (60s)</h2>
      <label className="block mb-2">Title
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 mt-1" />
      </label>
      <label className="block mb-2">Short description
        <input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full border p-2 mt-1" />
      </label>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Steps</h3>
        {steps.map((s,i)=>(
          <div key={i} className="flex gap-2 mb-2">
            <input className="flex-1 border p-2" value={s} onChange={e=>updateStep(i, e.target.value)} />
            <button onClick={()=>removeStep(i)} className="px-3">Del</button>
          </div>
        ))}
        <button onClick={addStep} className="mt-2 px-3 py-1 bg-gray-100">Add step</button>
      </div>

      <div className="flex gap-2">
        <button onClick={saveDemo} className="bg-blue-600 text-white px-4 py-2 rounded">Publish demo</button>
        <button onClick={exportWidget} className="bg-green-600 text-white px-4 py-2 rounded">Export widget ZIP</button>
      </div>
      <button
  onClick={() => {
    const snippet = `
<div id="onboard-root"></div>
<script src="https://yourdomain.vercel.app/onboard-widget.js"></script>
<script>
Onboard.init({
  container: "#onboard-root",
  demo: ${JSON.stringify({ title, steps })}
});
</script>`;
    navigator.clipboard.writeText(snippet);
    alert("Snippet copied!");
  }}
  className="bg-purple-600 text-white px-4 py-2 rounded"
>
  Copy Embed Code
</button>

      <p className="mt-4 text-sm text-gray-600">Tip: use "Export widget" to produce a downloadable package you can hand over to buyers (includes widget script + demo json + README).</p>
    </div>
  )
}