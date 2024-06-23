const apiKey = 'LlavedeAPIFlicker'; // Poner la Key de API de Flickr del usuario
const userId = 'IDUsuario'; // P0ner el Id del usuario de Flickr
const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

var nroActualFoto = 0;
let photos = [];

// Funcionar para renderizar la foto
function ponerFoto() {
    const photo = photos[nroActualFoto];
    const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    const imgElement = document.createElement('img');
    imgElement.src = photoUrl;

    const galleryElement = document.getElementById('gallery');
    galleryElement.innerHTML = ''; // Limpia la foto anterior
    galleryElement.appendChild(imgElement);
}

// Funcion para cargar las fotos a través de la API de Flickr
function cargarFotos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            photos = data.photos.photo;
            ponerFoto();
        })
        .catch(error => console.error('Error obteniendo data de la API de Flickr:', error));
}

// Funcion para manejar el evento de ir a la foto anterior
function irFotoAnterior() {
    nroActualFoto = (nroActualFoto - 1 + photos.length) % photos.length;
    ponerFoto();
}

// Funcion para manejar el evento de ir a la foto siguiente
function irFotoSiguiente() {
    nroActualFoto = (nroActualFoto + 1) % photos.length;
    ponerFoto();
}

// Registro de los eventos de clickear los botones.
document.getElementById('anterior').addEventListener('click', irFotoAnterior);
document.getElementById('posterior').addEventListener('click', irFotoSiguiente);

// Carga las fotos cuando la página está cargada
window.addEventListener('load', cargarFotos);