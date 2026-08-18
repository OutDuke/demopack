// src/components/DemoRenderer.jsx
import React, { useEffect, useState } from "react";

export default function DemoRenderer({ demo }) {
  const steps = (demo && demo.steps) || [];

  const [completed, setCompleted] = useState(() => Array(steps.length).fill(false));
  useEffect(() => {
    setCompleted(Array(steps.length).fill(false));
  }, [steps.length]);

  function toggle(i) {
    setCompleted((c) => {
      const next = [...c];
      next[i] = !next[i];
      console.log("Onboard.track", { event: "step_toggle", demoId: demo?.id, stepIndex: i, completed: next[i] });
      return next;
    });
  }

  const done = completed.filter(Boolean).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;

  if (!steps.length) {
    return <div className="text-sm text-gray-400">No steps defined.</div>;
  }

  return (
    <div>
      <div className="mb-3 micro">Progress</div>
      <div className="progress mb-4" aria-hidden>
        <i style={{ width: `${pct}%` }}></i>
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="app-card flex items-center gap-3 card-hover">
            <input type="checkbox" checked={!!completed[i]} onChange={() => toggle(i)} />
            <div className="flex-1">
              <div className="font-medium text-white">{s}</div>
              <div className="micro">Step {i + 1}</div>
            </div>
            <div className="micro text-slate-400">{completed[i] ? 'Done' : 'Pending'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}