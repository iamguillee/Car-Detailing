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
    },

    // ===== SERVICIOS EXTRAS =====
    engine: {
        title: 'Engine Wash',
        price: '$20',
        description: 'Professional engine bay cleaning and degreasing service that removes built-up grease, oil, and dirt for a spotless engine compartment.',
        images: [
            'images/ServicesOthers/image1.jpeg',
            'images/ServicesOthers/image2.jpeg'
        ],
        benefits: [
            'Complete engine bay degreasing',
            'Removal of oil and grease buildup',
            'Safe cleaning of electrical components',
            'Enhanced engine appearance',
            'Helps identify potential leaks',
            'Protectant application on plastic components'
        ],
        compact: true
    },

    odor: {
        title: 'Strong Odor Eliminator',
        price: '$20',
        description: 'Deep odor removal treatment using professional-grade products and ozone technology to eliminate smoke, pet, food, and other stubborn odors.',
        images: [
            'images/ServicesOthers/image3.jpeg',
            'images/ServicesOthers/image4.jpeg'
        ],
        benefits: [
            'Eliminates smoke odors completely',
            'Removes pet and animal smells',
            'Ozone treatment available',
            'Deep fabric deodorizing',
            'Air vent cleaning and sanitizing',
            'Long-lasting fresh scent'
        ],
        compact: true
    },

    wax: {
        title: 'Wax Application',
        price: '$15',
        description: 'Premium carnauba wax application that provides a deep, glossy shine and protective barrier against environmental elements.',
        images: [
            'images/ServicesOthers/image5.png',
            'images/ServicesOthers/image6.png'
        ],
        benefits: [
            'Premium carnauba wax formula',
            'Enhanced paint depth and shine',
            'UV protection for paint',
            'Water beading effect',
            'Protection against contaminants',
            'Lasts 4-6 weeks'
        ],
        compact: true
    },

    seat: {
        title: 'Seat Restoration',
        price: '$25 per seat',
        description: 'Individual seat deep cleaning and restoration service that removes stains, dirt, and odors from fabric or leather seats.',
        images: [
            'images/ServicesOthers/SEAT RESTORATION1.png',
            'images/ServicesOthers/SEAT RESTORATION2.png'
        ],
        benefits: [
            'Deep extraction cleaning',
            'Stain removal treatment',
            'Leather conditioning (if applicable)',
            'Fabric protection application',
            'Odor elimination',
            'Restored seat appearance'
        ],
        compact: true
    },

    headlight: {
        title: 'Headlight Restoration',
        price: '$25',
        description: 'Professional headlight restoration service that removes yellowing, oxidation, and cloudiness to restore clarity and improve nighttime visibility.',
        images: [
            'images/ServicesOthers/5.png'
        ],
        benefits: [
            'Removes yellowing and oxidation',
            'Multi-stage sanding process',
            'Professional polishing',
            'UV protective coating',
            'Improved light output',
            'Enhanced vehicle appearance'
        ],
        compact: true
    }
};

let currentSlide = 0;
let currentService = null;

// Abrir modal
function openServiceModal(serviceType) {
    currentService = serviceType;
    const service = servicesData[serviceType];
    const modal = document.getElementById('serviceModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalFooter = modal.querySelector('.modal-footer');

    // Agregar o quitar clase compact para servicios extras
    if (service.compact) {
        modalContent.classList.add('compact');
        modalFooter.style.display = 'none';
    } else {
        modalContent.classList.remove('compact');
        modalFooter.style.display = 'block';
    }

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

    let timeHTML = service.time ? `
        <div class="meta-item">
            <span class="meta-label">ESTIMATED TIME:</span>
            <span class="service-time">${service.time}</span>
        </div>
    ` : '';

    details.innerHTML = `
        <h2>${service.title}</h2>
        <div class="service-meta">
            <div class="meta-item">
                <span class="meta-label">PRICE:</span>
                <span class="service-price">${service.price}</span>
            </div>
            ${timeHTML}
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
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cambiar slide del carousel
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

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