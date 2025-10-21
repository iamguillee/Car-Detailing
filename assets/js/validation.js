document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar que se haya seleccionado un paquete
    const packageSelected = document.querySelector('input[name="package"]:checked');

    if (!packageSelected) {
        swal({
            title: "No Package Selected",
            text: "Please select a service package.",
            icon: "warning",
            button: "OK"
        });
        return false;
    }

    // Validar email
    const email = document.getElementById('email').value;
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

    // Validar campos requeridos
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const address = document.getElementById('address').value.trim();

    if (!firstName || !lastName || !phone || !date || !time || !address) {
        swal({
            title: "Missing Information",
            text: "Please fill in all required fields.",
            icon: "warning",
            button: "OK"
        });
        return false;
    }

    // Enviar formulario con AJAX
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
                    text: "Your appointment has been submitted successfully! Please check your email for confirmation details.",
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
            swal({
                title: "Connection Error",
                text: "Could not connect to the server. Please check your internet connection.",
                icon: "error",
                button: "OK"
            });
        });
});

fetch('php/Email/sendEmail.php', {
    method: 'POST',
    body: formData
})
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        return response.text(); // Cambiar a text() primero para ver qué devuelve
    })
    .then(text => {
        console.log('Raw response:', text);
        try {
            const data = JSON.parse(text);
            if (data.success) {
                swal({
                    title: "Booking Confirmed!",
                    text: "Your appointment has been submitted successfully! Please check your email for confirmation details.",
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
        } catch (e) {
            console.error('JSON parse error:', e);
            console.error('Response was:', text);
            swal({
                title: "Server Error",
                text: "The server returned an invalid response. Check console for details.",
                icon: "error",
                button: "OK"
            });
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        swal({
            title: "Connection Error",
            text: "Could not connect to the server. Error: " + error.message,
            icon: "error",
            button: "OK"
        });
    });