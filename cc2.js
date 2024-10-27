function filterProducts() {
  // Get selected categories
  const selectedCategories = Array.from(document.querySelectorAll('.filters .filter-section input[type="checkbox"]:checked')).map(el => el.parentNode.textContent.trim());
  
  // Get selected colors
  const selectedColors = Array.from(document.querySelectorAll('.filters .color-palette input[type="checkbox"]:checked')).map(el => el.parentNode.textContent.trim());
  
  // Get max price from the slider
  const maxPrice = parseFloat(document.getElementById('price-range').value.replace('₹', '').replace(',', '')); // Clean up the price

  // Get all product cards
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardColor = card.getAttribute('data-color');
      const cardPrice = parseFloat(card.getAttribute('data-price').replace('₹', '').replace(',', '').trim()); // Clean up price

      // Check if product matches selected filters
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(cardColor);
      const matchesPrice = cardPrice <= maxPrice;

      // Show or hide the card based on matches
      if (matchesCategory && matchesColor && matchesPrice) {
          card.style.display = 'block'; // Show card
      } else {
          card.style.display = 'none'; // Hide card
      }
  });
}

// Event listeners for filter changes
document.querySelectorAll('.filters .filter-section input[type="checkbox"]').forEach(input => {
  input.addEventListener('change', filterProducts);
});

// Update max price display and filter on slider input
const priceRangeInput = document.getElementById('price-range');
priceRangeInput.addEventListener('input', function() {
  document.getElementById('price-display').textContent = ₹$ {this.value}; // Update price display
  filterProducts(); // Re-filter when the price changes
});