import React, { useState } from 'react'

export default function DemoRenderer({ demo }){
  const [completed, setCompleted] = useState(Array(demo.steps.length).fill(false))

  function toggle(i){
    setCompleted(c=>{
      const next = [...c]; next[i] = !next[i]; 
      // emit simple analytics - console log (buyers will see this)
      console.log('Onboard.track', { event: 'step_toggle', demoId: demo.id, stepIndex: i, completed: next[i] })
      return next
    })
  }

  return (
    <div className="bg-white p-6 rounded shadow">
    <div>
      <div className="space-y-3">
        {demo.steps.map((s,i)=>(
          <div key={i} className="flex items-center gap-3 p-3 border rounded">
            <input type="checkbox" checked={completed[i]} onChange={()=>toggle(i)} />
            <div>
              <div className="font-medium">{s}</div>
              <div className="text-xs text-gray-500">Step {i+1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}