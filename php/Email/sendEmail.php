<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $date = $_POST['date'] ?? '';
    $time = $_POST['time'] ?? '';
    $address = $_POST['address'] ?? '';
    $package = $_POST['package'] ?? '';
    $extras = $_POST['extras'] ?? [];

    $full_name = $first_name . ' ' . $last_name;

    // Convertir hora a 12h con AM/PM
    if (!empty($time)) {
        $time_obj = DateTime::createFromFormat('H:i', $time);
        $time_12hr = $time_obj->format('g:i A');
    } else {
        $time_12hr = 'Not specified';
    }

    // Convertir extras a lista
    $extras_list = !empty($extras) ? implode(", ", $extras) : "None";
    $extras_html = !empty($extras) ? "<ul style='margin: 0; padding-left: 20px;'>" : "None";
    foreach ($extras as $extra) {
        $extras_html .= "<li>$extra</li>";
    }
    if (!empty($extras)) {
        $extras_html .= "</ul>";
    }

    // Validación
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }

    if (empty($package)) {
        echo json_encode(['success' => false, 'message' => 'Please select a service package']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'scar89965@gmail.com';
        $mail->Password   = 'rrjwdadfqhhehhey';
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // ========== Correo al negocio ==========
        $mail->setFrom('scar89965@gmail.com', 'Car Detailing');
        $mail->addAddress('empleado@cardetailing.com');
        $mail->isHTML(true);
        $mail->Subject = '🧽 New Appointment Booked - ' . $full_name;
        $mail->Body = "
            <div style='font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;'>
                <div style='background-color: white; padding: 30px; border-radius: 10px;'>
                    <h2 style='color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;'>🚗 New Appointment Request</h2>
                    
                    <h3 style='color: #555; margin-top: 20px;'>Customer Information:</h3>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Name:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'>$full_name</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Email:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'>$email</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Phone:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'>$phone</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Address:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'>$address</td>
                        </tr>
                    </table>

                    <h3 style='color: #555; margin-top: 30px;'>Appointment Details:</h3>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Date:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'>$date</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Time:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'>$time_12hr</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd; vertical-align: top;'><strong>Package Selected:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>$package</strong></td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd; vertical-align: top;'><strong>Extra Services:</strong></td>
                            <td style='padding: 10px; border-bottom: 1px solid #ddd;'>$extras_html</td>
                        </tr>
                    </table>
                </div>
            </div>
        ";
        $mail->send();

        // ========== Correo al cliente ==========
        $mail->clearAddresses();
        $mail->addAddress($email);
        $mail->Subject = 'Appointment Confirmation - Car Detailing';
        $mail->Body = "
            <div style='font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;'>
                <div style='background-color: white; padding: 30px; border-radius: 10px;'>
                    <h2 style='color: #4CAF50;'>✅ Appointment Confirmed!</h2>
                    <p style='font-size: 16px;'>Dear <strong>$full_name</strong>,</p>
                    <p style='font-size: 16px;'>Thank you for booking with us! We have received your appointment request.</p>

                    <div style='background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                        <h3 style='color: #333; margin-top: 0;'>📋  Your Appointment Details:</h3>
                        <table style='width: 100%;'>
                            <tr>
                                <td style='padding: 8px 0;'><strong>Date:</strong></td>
                                <td style='padding: 8px 0;'>$date</td>
                            </tr>
                            <tr>
                                <td style='padding: 8px 0;'><strong>Time:</strong></td>
                                <td style='padding: 8px 0;'>$time_12hr</td>
                            </tr>
                            <tr>
                                <td style='padding: 8px 0; vertical-align: top;'><strong>Package:</strong></td>
                                <td style='padding: 8px 0;'><strong>$package</strong></td>
                            </tr>
                            <tr>
                                <td style='padding: 8px 0; vertical-align: top;'><strong>Extras:</strong></td>
                                <td style='padding: 8px 0;'>$extras_html</td>
                            </tr>
                            <tr>
                                <td style='padding: 8px 0;'><strong>Address:</strong></td>
                                <td style='padding: 8px 0;'>$address</td>
                            </tr>
                        </table>
                    </div>

                    <p style='font-size: 16px;'>We will contact you at <strong>$phone</strong> shortly to confirm your appointment.</p>
                    
                    <hr style='border: none; border-top: 1px solid #ddd; margin: 30px 0;'>
                    
                    <p style='font-size: 14px; color: #666;'>
                        If you need to reschedule or have questions, please contact us.<br>
                        <strong>Phone:</strong> (123) 456-7890<br>
                        <strong>Email:</strong> info@cardetailing.com
                    </p>

                    <p style='font-size: 16px; margin-top: 30px;'>
                        Best regards,<br>
                        <strong style='color: #4CAF50;'>Car Detailing Team</strong> 🚗✨
                    </p>
                </div>
            </div>
        ";
        $mail->send();

        echo json_encode(['success' => true, 'message' => 'Appointment confirmed successfully!']);

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error sending email. Please try again later.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>