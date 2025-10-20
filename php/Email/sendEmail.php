<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $date = $_POST['date'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validación básica de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email address. Please check it and try again.'); window.history.back();</script>";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'scar89965@gmail.com'; // tu correo del negocio
        $mail->Password   = 'rrjwdadfqhhehhey'; // contraseña de app (no la normal)
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // ========== Correo al negocio ==========
        $mail->setFrom('scar89965@gmail.com', 'Car Detailing');
        $mail->addAddress('empleado@cardetailing.com'); // destinatario interno
        $mail->isHTML(true);
        $mail->Subject = '🧽 New Appointment Booked';
        $mail->Body = "
            <h3>New appointment details:</h3>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Date:</strong> $date</p>
            <p><strong>Message:</strong> $message</p>
        ";
        $mail->send();

        // ========== Correo de confirmación al cliente ==========
        $mail->clearAddresses();
        $mail->addAddress($email); // cliente
        $mail->Subject = '✅ Appointment Confirmation - Car Detailing';
        $mail->Body = "
            <h2>Thank you, $name!</h2>
            <p>Your appointment request has been received.</p>
            <p><strong>Date:</strong> $date</p>
            <p>We’ll contact you shortly to confirm and discuss your service details.</p>
            <br>
            <p>Best regards,<br><strong>Car Detailing Team</strong></p>
        ";
        $mail->send();

        echo "<script>alert('Your booking was successfully submitted! A confirmation email has been sent.'); window.location.href='../about.html';</script>";

    } catch (Exception $e) {
        echo "<script>alert('Error sending email: {$mail->ErrorInfo}'); window.history.back();</script>";
    }
}
?>