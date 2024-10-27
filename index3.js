// Handle profession filter
document.getElementById('profession-filter').addEventListener('change', function () {
    const selectedProfession = this.value;
    const artisanProfession = document.querySelector('.artisan-profession').innerText.toLowerCase();

    if (selectedProfession === 'all' || artisanProfession === selectedProfession) {
        document.querySelector('.profile-container').style.display = 'block';
    } else {
        document.querySelector('.profile-container').style.display = 'none';
    }
});

// Handle product upload
document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productImage = document.getElementById('product-image').files[0];
    const productDescription = document.getElementById('product-description').value;

    const productContainer = document.getElementById('artisan-products');
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(productImage);
    const nameElement = document.createElement('h4');
    nameElement.textContent = productName;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = productDescription;

    productCard.appendChild(imgElement);
    productCard.appendChild(nameElement);
    productCard.appendChild(descriptionElement);
    productContainer.appendChild(productCard);

    // Clear the form after submission
    document.getElementById('product-form').reset();
});