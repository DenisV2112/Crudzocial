  const form = document.getElementById("profileForm");
  const logList = document.getElementById("logActividad");

  function cargarPerfil() {
    const perfil = JSON.parse(localStorage.getItem("perfilUsuario"));
    if (perfil) {
      for (const campo in perfil) {
        if (document.getElementById(campo)) {
          document.getElementById(campo).value = perfil[campo];
        }
      }
    }

    const logs = JSON.parse(localStorage.getItem("logsActividad")) || [];
    logList.innerHTML = "";
    logs.forEach(log => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = log;
      logList.appendChild(li);
    });
  }

  function guardarLog(mensaje) {
    const logs = JSON.parse(localStorage.getItem("logsActividad")) || [];
    const ahora = new Date().toLocaleString();
    logs.unshift(`[${ahora}] ${mensaje}`);
    localStorage.setItem("logsActividad", JSON.stringify(logs.slice(0, 10))); // Últimos 10
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const perfil = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      pais: document.getElementById("pais").value,
      ciudad: document.getElementById("ciudad").value,
      direccion: document.getElementById("direccion").value,
      codigoPostal: document.getElementById("codigoPostal").value
    };
    localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
    guardarLog("Perfil actualizado");
    cargarPerfil();
    alert("Perfil actualizado correctamente.");
  });

  function cerrarSesion() {
    guardarLog("Sesión cerrada");
    localStorage.removeItem("perfilUsuario");
    alert("Sesión cerrada");
    location.reload();
  }

  cargarPerfil();