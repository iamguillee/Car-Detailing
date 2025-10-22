// Datos de los servicios
const servicesData = {
    premium: {
        title: 'Premium Package',
        price: '$300 - $450',
        time: '4 - 6 hours',
        images: [
            'images/Premium/image1.png',
            'images/Premium/image2.png',
            'images/Premium/image3.jpg',
            'images/Premium/image4.png'
        ],
        description: 'Our most comprehensive service with professional-grade results.',
        procedure: [
            'Complete paint decontamination',
            'Pre-wash with active foam',
            'Exterior wash with protective wax',
            'Ceramic polish (mirror shine and lasting protection)',
            'Deep vacuum of seats, carpets, and trunk',
            'UV protector or interior wax application',
            'Complete interior shine and cleaning',
            'Strong odor eliminator application',
            'Premium finishing fragrance'
        ],
        benefits: [
            'Exhibition-level results',
            'Maximum paint protection',
            'Long-lasting shine',
            'Professional detailing quality'
        ]
    },
    medium: {
        title: 'Medium Package',
        price: '$100 - $125',
        time: '1.5 - 2 hours',
        images: [
            'images/Medium/image1.jpeg',
            'images/Medium/image2.jpeg',
            'images/Medium/image3.jpeg',
            'images/Medium/image4.jpeg'
        ],
        description: 'Deep cleaning with enhanced protection and detail work.',
        procedure: [
            'Pre-wash with active foam to remove surface dirt',
            'Exterior wash with wax (protects and adds shine)',
            'Rim wash and tire shine application',
            'Complete interior vacuum',
            'Detailed interior cleaning (dashboard, doors, plastics, windows)',
            'Plastic protector or interior protective wax',
            'Exterior plastic restorer',
            'Odor eliminator application',
            'Interior fragrance finish'
        ],
        benefits: [
            'Deep cleaning',
            'Enhanced general protection',
            'Restored plastic appearance',
            'Fresh interior environment'
        ]
    },
    basic: {
        title: 'Basic Package',
        price: '$40 - $80',
        time: '40min - 1 hour',
        images: [
            'images/Basic/image1.jpg',
            'images/Basic/image2.jpg',
            'images/Basic/image3.jpg',
            'images/Basic/image4.jpg'
        ],
        description: 'Quick and effective maintenance service for light cleaning needs.',
        procedure: [
            'Exterior vehicle wash',
            'Tire shine application',
            'Basic interior cleaning',
            'General vacuum of seats, carpets, and trunk',
            'Dashboard and windows cleaning (interior and exterior)',
            'Interior fragrance application'
        ],
        benefits: [
            'Quick maintenance',
            'Ideal for light dirt',
            'Affordable pricing',
            'Fast turnaround'
        ]
    },
    pressure: {
        title: 'Pressure Washing',
        price: 'Custom Pricing',
        time: 'Varies',
        images: [
            'images/pressure1.jpg',
            'images/pressure2.jpg',
            'images/pressure3.jpg',
            'images/pressure4.jpg'
        ],
        description: 'Professional pressure washing services for various surfaces.',
        procedure: [
            'Surface assessment and preparation',
            'High-pressure cleaning',
            'Specialized detergent application when needed',
            'Thorough rinsing',
            'Final inspection'
        ],
        surfaces: [
            'Garages and driveways',
            'Exterior walls',
            'Sidewalks and pathways',
            'Roofs and gutters',
            'Decks and patios'
        ],
        benefits: [
            'Removes stubborn dirt and grime',
            'Restores surface appearance',
            'Prevents damage from buildup',
            'Increases property value'
        ]
    }
};

let currentSlide = 0;
let currentService = null;

// Abrir modal
function openServiceModal(serviceType) {
    currentService = serviceType;
    const service = servicesData[serviceType];
    const modal = document.getElementById('serviceModal');

    // Cargar imágenes del carousel
    const carousel = document.getElementById('serviceCarousel');
    carousel.innerHTML = '';
    service.images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
        slide.innerHTML = `<img src="${img}" alt="${service.title}">`;
        carousel.appendChild(slide);
    });
    currentSlide = 0;

    // Cargar detalles del servicio
    const details = document.getElementById('serviceDetails');
    let procedureHTML = service.procedure ? `
            <div class="service-section">
                <h3>Procedure:</h3>
                <ul class="service-list">
                    ${service.procedure.map(item => `<li>✓ ${item}</li>`).join('')}
                </ul>
            </div>
        ` : '';

    let surfacesHTML = service.surfaces ? `
            <div class="service-section">
                <h3>Surfaces We Clean:</h3>
                <ul class="service-list">
                    ${service.surfaces.map(item => `<li>• ${item}</li>`).join('')}
                </ul>
            </div>
        ` : '';

    details.innerHTML = `
    <h2>${service.title}</h2>
    <div class="service-meta">
        <div class="meta-item">
            <span class="meta-label">PRICE:</span>
            <span class="service-price">${service.price}</span>
        </div>
        <div class="meta-item">
            <span class="meta-label">ESTIMATED TIME:</span>
            <span class="service-time">${service.time}</span>
        </div>
    </div>
    <p class="service-description">${service.description}</p>
    ${procedureHTML}
    ${surfacesHTML}
            <div class="service-section">
                <h3>Benefits:</h3>
                <ul class="service-list benefits">
                    ${service.benefits.map(item => `<li>⭐ ${item}</li>`).join('')}
                </ul>
            </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeServiceModal() {
    document.getElementById('serviceModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cambiar slide del carousel
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');

    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add('active');
}

// Cerrar modal al hacer clic fuera
window.onclick = function (event) {
    const modal = document.getElementById('serviceModal');
    if (event.target == modal) {
        closeServiceModal();
    }
}

// Cerrar con tecla ESC
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeServiceModal();
    }
});