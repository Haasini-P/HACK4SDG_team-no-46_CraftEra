function previewImage(event, imgId) {
    const image = document.getElementById(imgId);
    image.src = URL.createObjectURL(event.target.files[0]);
}

function displayUploadedImages(event) {
    const gallery = document.getElementById('productGallery');
    gallery.innerHTML = ""; // Clear any previous images

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(files[i]);
        gallery.appendChild(img);
    }
}