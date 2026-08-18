// src/pages/DemoPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DemoRenderer from '../components/DemoRenderer'

export default function DemoPage(){
  const { id } = useParams()
  const [demo, setDemo] = useState(null)

  useEffect(()=>{
    console.log("DemoPage id:", id)
    if(id === "sample"){
      const sample = {
        id: "sample",
        title: "Startup Onboarding",
        desc: "Complete steps to activate your account",
        steps: [
          "Signup",
          "Verify email",
          "Complete profile",
          "Start first project"
        ]
      }
      console.log("Setting sample demo:", sample)
      setDemo(sample)
      return
    }
    const stored = JSON.parse(localStorage.getItem('demos'||'[]') || '[]')
    const found = stored.find(d=> d.id === id)
    console.log("Found from storage:", found)
    setDemo(found || null)
  }, [id])

  if(!demo) return <div className="p-6">Demo not found. Create one first.</div>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{demo.title}</h2>
      <p className="text-sm mb-4">{demo.desc}</p>
      <DemoRenderer demo={demo} />
    </div>
  )
}