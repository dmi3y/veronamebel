<?php
require '../vendor/autoload.php';

use Nette\Mail\Message;
use Nette\Mail\SendmailMailer;

/*
* Before sending email making sure:
*
* 1. POST came from the same domain
* 2. Files security, numbers and size limits check
* 3. Existance of required information
*/

$to = 'lapshukov@gmail.com';
$subject = 'Запрос на заказ мебели.';

$name = $_POST['name']; // *
$from = $_POST['email']; // *
$phone = $_POST['phone'];
$body = $_POST['comment'];
$files = $_FILES['uploads'];



var_dump($_SERVER, $_SESSION);


if ($name && $from && FALSE) {

  $mail = new Message;
  $mail->setFrom($from)
      ->addTo($to)
      ->setSubject($subject)
      ->setBody($body);


  $mailer = new SendmailMailer;
  $mailer->send($mail);
}
