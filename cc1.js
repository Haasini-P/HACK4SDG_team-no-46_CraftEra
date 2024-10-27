const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active"); // Toggle the sidebar
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active"); // Close the sidebar
});
// --- CIRCLE POP-UP FUNCTIONALITY ---
// Get all circle items
const circleItems = document.querySelectorAll('.circle-item');

// Function to open the pop-up
function openPopUp(imageSrc, label) {
    const popUpBg = document.createElement('div');
    popUpBg.classList.add('popup-bg');

    const popUp = document.createElement('div');
    popUp.classList.add('popup');

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = label;
    img.classList.add('popup-image');

    const popUpLabel = document.createElement('p');
    popUpLabel.textContent = label;
    popUpLabel.classList.add('popup-label');

    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('close-btn');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popUpBg); // Close the pop-up
    });

    popUp.appendChild(closeButton);
    popUp.appendChild(img);
    popUp.appendChild(popUpLabel);
    popUpBg.appendChild(popUp);
    document.body.appendChild(popUpBg); // Show pop-up
}

// Add event listeners to each circle item
circleItems.forEach(item => {
    const imgElement = item.querySelector('.circle-image');
    const labelText = item.querySelector('.circle-label').textContent;

    item.addEventListener('click', () => {
        const imageSrc = imgElement.src;
        openPopUp(imageSrc, labelText); // Trigger pop-up with the clicked image and label
    });
});

const slider = document.querySelector('.slider');
const sliderCards = document.querySelectorAll('.slider-card');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
const totalCards = sliderCards.length;
const autoSlideInterval = 10000; // 4 seconds for better user experience (change as needed)

// Function to update the slider based on the current index
function updateSlider(index) {
    const cardWidth = slider.querySelector('.slider-card').offsetWidth;
    currentTranslate = -index * cardWidth;
    slider.style.transform = translateX(${currentTranslate}px);
}

// Function to update the active dot
function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentIndex) {
            dot.classList.add('active');
        }
    });
}

// Function to automatically slide
function autoSlide() {
    currentIndex = (currentIndex + 1) % totalCards; // Loop back to first card
    updateSlider(currentIndex);
    updateDots(); // Update dots accordingly
}

// Auto-slide every 4 seconds
let autoSlideIntervalID = setInterval(autoSlide, autoSlideInterval);

// --- Manual sliding by dragging ---

// Function to start dragging
function touchStart(index) {
    return function (event) {
        isDragging = true;
        currentIndex = index;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing'); // Add grab effect
        clearInterval(autoSlideIntervalID); // Pause auto-slide when user interacts
    };
}

// Function to continue dragging
function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

// Function to end dragging
function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;

    // If moved by more than half the card's width, move to the next/previous card
    if (movedBy < -100 && currentIndex < totalCards - 1) currentIndex++;
    if (movedBy > 100 && currentIndex > 0) currentIndex--;

    setPositionByIndex();
    slider.classList.remove('grabbing'); // Remove grab effect

    // Resume auto-slide after interaction
    autoSlideIntervalID = setInterval(autoSlide, autoSlideInterval);
}

// Animation for smooth drag
function animation() {
    slider.style.transform = translateX(${currentTranslate}px);
    if (isDragging) requestAnimationFrame(animation);
}

// Get X position based on touch or mouse event
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Set position of slider by index
function setPositionByIndex() {
    const cardWidth = slider.querySelector('.slider-card').offsetWidth;
    currentTranslate = currentIndex * -cardWidth;
    prevTranslate = currentTranslate;
    slider.style.transform = translateX(${currentTranslate}px);
    updateDots();
}

// Add event listeners for touch/mouse drag events
sliderCards.forEach((card, index) => {
    const touchStartHandler = touchStart(index);
    card.addEventListener('touchstart', touchStartHandler);
    card.addEventListener('touchmove', touchMove);
    card.addEventListener('touchend', touchEnd);

    card.addEventListener('mousedown', touchStartHandler);
    card.addEventListener('mousemove', touchMove);
    card.addEventListener('mouseup', touchEnd);
    card.addEventListener('mouseleave', touchEnd);
});
document.addEventListener("DOMContentLoaded", function() {
    const loadMoreButton = document.getElementById('load-more');
    const hiddenItems = document.querySelectorAll('.collection-card.hidden');
    let currentIndex = 0; // To track how many items have been shown

    // Show the next set of hidden items
    loadMoreButton.addEventListener('click', function() {
        const itemsToShow = 4; // Number of items to show each time
        for (let i = 0; i < itemsToShow; i++) {
            if (currentIndex < hiddenItems.length) {
                hiddenItems[currentIndex].classList.remove('hidden'); // Show the item
                currentIndex++;
            }
        }

        // Hide the button if all items are displayed
        if (currentIndex >= hiddenItems.length) {
            loadMoreButton.style.display = 'none'; // Hide the button when no more items
        }
    });
});