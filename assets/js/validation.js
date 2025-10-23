document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. VALIDAR CAMPOS REQUERIDOS PRIMERO
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const address = document.getElementById('address').value.trim();

    if (!firstName || !lastName || !email || !phone || !date || !address) {
        swal({
            title: "Missing Information",
            text: "Please fill in all required fields.",
            icon: "warning",
            button: "OK"
        });
        return false;
    }

    // 2. VALIDAR EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        swal({
            title: "Invalid Email",
            text: "Please enter a valid email address.",
            icon: "error",
            button: "OK"
        });
        return false;
    }

    // 3. VALIDAR FECHA
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        swal({
            title: "Invalid Date",
            text: "Appointment date cannot be in the past. Please select today or a future date.",
            icon: "error",
            button: "OK"
        });
        return false;
    }

    // 4. VALIDAR PAQUETE SELECCIONADO
    const packageSelected = document.querySelector('input[name="package"]:checked');
    if (!packageSelected) {
        swal({
            title: "No Package Selected",
            text: "Please select a service package before booking.",
            icon: "warning",
            button: "OK"
        });
        return false;
    }

    // 5. ENVIAR FORMULARIO
    const formData = new FormData(this);

    swal({
        title: "Sending...",
        text: "Please wait while we process your appointment.",
        icon: "info",
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false
    });

    fetch('php/Email/sendEmail.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                swal({
                    title: "Booking Confirmed!",
                    text: "Your appointment has been submitted successfully! Check your email for confirmation details.",
                    icon: "success",
                    button: "OK"
                }).then(() => {
                    document.querySelector('form').reset();
                });
            } else {
                swal({
                    title: "Oops...",
                    text: data.message || "Error sending email. Please try again later.",
                    icon: "error",
                    button: "OK"
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            swal({
                title: "Connection Error",
                text: "Could not connect to the server. Please check your internet connection.",
                icon: "error",
                button: "OK"
            });
        });
});

// Establecer fecha mínima (hoy)
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});