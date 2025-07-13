<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $date = $_POST['date'] ?? '';
    $message = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // o tu servidor
        $mail->SMTPAuth   = true;
        $mail->Username   = 'TUCORREO@gmail.com';
        $mail->Password   = 'TUPASSWORDOAPP';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Emisor y receptor
        $mail->setFrom('TUCORREO@gmail.com', 'Car Detailing');
        $mail->addAddress('EMPLEADO@ejemplo.com');

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Nueva cita agendada';
        $mail->Body    = "
            <h3>Datos del cliente:</h3>
            <p><strong>Nombre:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Teléfono:</strong> $phone</p>
            <p><strong>Fecha de cita:</strong> $date</p>
            <p><strong>Mensaje:</strong> $message</p>
        ";

        $mail->send();
        echo "Correo enviado correctamente";
    } catch (Exception $e) {
        echo "Error al enviar correo: {$mail->ErrorInfo}";
    }
}
?>