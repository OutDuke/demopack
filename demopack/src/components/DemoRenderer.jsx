// src/components/DemoRenderer.jsx
import React, { useEffect, useState } from "react";

export default function DemoRenderer({ demo }) {
  const steps = (demo && demo.steps) || [];

  // initialize and reset when steps length changes
  const [completed, setCompleted] = useState(() => Array(steps.length).fill(false));
  useEffect(() => {
    setCompleted(Array(steps.length).fill(false));
  }, [steps.length]);

  function toggle(i) {
    setCompleted((c) => {
      const next = [...c];
      next[i] = !next[i];
      // analytics visible in console
      console.log("Onboard.track", { event: "step_toggle", demoId: demo?.id, stepIndex: i, completed: next[i] });
      return next;
    });
  }

  if (!steps.length) {
    return <div className="text-sm text-gray-500">No steps defined.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 border rounded">
            <input type="checkbox" checked={!!completed[i]} onChange={() => toggle(i)} />
            <div>
              <div className="font-medium">{s}</div>
              <div className="text-xs text-gray-500">Step {i + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}