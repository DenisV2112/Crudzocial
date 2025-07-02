const form = document.getElementById("image-form");
const inputFile = document.getElementById("image-input");
const inputName = document.getElementById("image-name");
const gallery = document.getElementById("gallery");

let images = JSON.parse(localStorage.getItem("imagenes")) || [];
renderGallery();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = inputFile.files[0];
  const name = inputName.value.trim();
  if (!file || !name) return alert("Falta imagen o nombre");

  const reader = new FileReader();
  reader.onload = () => {
    const image = {
      id: crypto.randomUUID(),
      name,
      src: reader.result
    };
    images.push(image);
    saveImages();
    renderGallery();
    form.reset();
  };
  reader.readAsDataURL(file);
});

function renderGallery() {
  gallery.innerHTML = "";
  images.forEach(img => {
    const div = document.createElement("div");
    div.className = "image-item";
    div.innerHTML = `
      <img src="${img.src}" alt="${img.name}" />
      <p>${img.name}</p>
      <button onclick="editImage('${img.id}')">Editar</button>
      <button onclick="deleteImage('${img.id}')">Eliminar</button>
    `;
    gallery.appendChild(div);
  });
}

function deleteImage(id) {
  images = images.filter(img => img.id !== id);
  saveImages();
  renderGallery();
}

function editImage(id) {
  const img = images.find(i => i.id === id);
  const newName = prompt("Nuevo nombre:", img.name);
  if (newName) {
    img.name = newName;
    saveImages();
    renderGallery();
  }
}

function saveImages() {
  localStorage.setItem("imagenes", JSON.stringify(images));
}
