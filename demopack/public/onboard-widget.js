// simple drop-in Onboarding Widget
(function(){
  if(window.Onboard) return;
  const Onboard = {
    init: function(opts){
      try {
        const container = document.querySelector(opts.container || '#onboard-root')
        const demo = opts.demo || { title: 'Demo', steps: ['Step A','Step B'] }
        if(!container) {
          console.warn('Onboard: container not found', opts)
          return
        }
        container.innerHTML = ''
        const box = document.createElement('div')
        box.style.border = '1px solid #ddd'
        box.style.padding = '12px'
        box.style.borderRadius = '8px'
        box.style.fontFamily = 'Arial, sans-serif'
        const title = document.createElement('div')
        title.style.fontWeight = '700'
        title.style.marginBottom = '8px'
        title.textContent = demo.title || 'Onboarding'
        box.appendChild(title)
        demo.steps.forEach((s, idx) => {
          const row = document.createElement('div')
          row.style.display = 'flex'
          row.style.alignItems = 'center'
          row.style.gap = '8px'
          row.style.marginBottom = '6px'
          const cb = document.createElement('input')
          cb.type = 'checkbox'
          cb.addEventListener('change', () => {
            // simple event - buyers can capture this
            console.log('Onboard.track', { event: 'step_toggle', index: idx, checked: cb.checked, title: demo.title })
          })
          const label = document.createElement('div')
          label.textContent = s
          row.appendChild(cb)
          row.appendChild(label)
          box.appendChild(row)
        })
        container.appendChild(box)
      } catch(e){ console.error(e) }
    }
  }
  window.Onboard = Onboard
})()