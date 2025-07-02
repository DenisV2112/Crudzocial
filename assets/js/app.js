// Verifica autenticación
function auth() {
  let email = document.getElementById('email').value.toLowerCase();
  let password = document.getElementById('password').value;
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    let user = users[email];
    if (user.password === password) {
      alert("Bienvenido a inventario");
      sessionStorage.setItem("auth", "true");
      window.location = "../other/home.html";
    } else {
      alert("Datos incorrectos");
    }
  } else {
    alert("Este correo no existe");
  }

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// Registro de usuarios
function register() {
  let email = document.getElementById('email').value.toLowerCase();
  let password = document.getElementById('password').value;
  let name = document.getElementById('name').value;
  let lastname = document.getElementById('lastname').value;
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    alert("Este correo ya está registrado. Inicia sesión.");
    window.location = "../index.html";
  } else if (!email || !password || !name || !lastname) {
    alert("Todos los campos son obligatorios.");
  } else {
    users[email] = {
      name: name,
      lastname: lastname,
      password: password
    };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado con éxito.");
    window.location = "../index.html";
  }

  document.getElementById("name").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// Cerrar sesión
function logout() {
  sessionStorage.setItem("auth", "false");
  window.location = "../index.html";
}
