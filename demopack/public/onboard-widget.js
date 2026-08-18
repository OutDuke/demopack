(function(){
  if(window.Onboard) return;

  const Onboard = {
    init: function(opts){
      const demo = opts.demo || { title: "Onboarding", steps: [] };

      // Floating button
      const btn = document.createElement("div");
      btn.innerHTML = "🚀";
      btn.style.position = "fixed";
      btn.style.bottom = "20px";
      btn.style.right = "20px";
      btn.style.width = "50px";
      btn.style.height = "50px";
      btn.style.background = "#000";
      btn.style.color = "#fff";
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.borderRadius = "50%";
      btn.style.cursor = "pointer";
      btn.style.zIndex = "9999";

      document.body.appendChild(btn);

      // Widget box
      const box = document.createElement("div");
      box.style.position = "fixed";
      box.style.bottom = "80px";
      box.style.right = "20px";
      box.style.width = "300px";
      box.style.background = "#fff";
      box.style.border = "1px solid #ddd";
      box.style.borderRadius = "10px";
      box.style.padding = "15px";
      box.style.display = "none";
      box.style.zIndex = "9999";
      box.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";

      const title = document.createElement("div");
      title.style.fontWeight = "bold";
      title.style.marginBottom = "10px";
      title.innerText = demo.title;

      box.appendChild(title);

      demo.steps.forEach((step, i)=>{
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.gap = "8px";
        row.style.marginBottom = "6px";

        const cb = document.createElement("input");
        cb.type = "checkbox";

        cb.addEventListener("change", ()=>{
          console.log("Onboard.track", {
            step,
            completed: cb.checked
          });
        });

        const text = document.createElement("div");
        text.innerText = step;

        row.appendChild(cb);
        row.appendChild(text);
        box.appendChild(row);
      });

      document.body.appendChild(box);

      // Toggle
      btn.onclick = ()=>{
        box.style.display = box.style.display === "none" ? "block" : "none";
      };
    }
  };

  window.Onboard = Onboard;
})();