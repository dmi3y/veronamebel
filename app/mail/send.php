<?php
require '../vendor/autoload.php';

use Nette\Mail\Message;
use Nette\Mail\SendmailMailer;

/*
* Before sending email making sure:
*
* 1. It is POST
* 2. Files limit check
* 3. Existance of required information
*/

$to = 'lapshukov@gmail.com';
$subject = 'Запрос на заказ мебели.';

$name = htmlspecialchars($_POST['name']); // *
$from = htmlspecialchars($_POST['email']); // *
$phone = htmlspecialchars($_POST['phone']);
$body = htmlspecialchars($_POST['comment']);
// More sender's info
$body .= "\r\n\r\nSender's info\r\n";
$body .= "HTTP_ACCEPT: " . $_SERVER["HTTP_ACCEPT"] . "\r\n";
$body .= "HTTP_USER_AGENT: " . $_SERVER["HTTP_USER_AGENT"] . "\r\n";
$body .= "HTTP_REFERER: " . $_SERVER["HTTP_REFERER"] . "\r\n";
$body .= "HTTP_ACCEPT_ENCODING: " . $_SERVER["HTTP_ACCEPT_ENCODING"] . "\r\n";
$body .= "HTTP_ACCEPT_LANGUAGE: " . $_SERVER["HTTP_ACCEPT_LANGUAGE"] . "\r\n";
$body .= "REMOTE_ADDR: " . $_SERVER["REMOTE_ADDR"] . "\r\n";
$body .= "REMOTE_PORT: " . $_SERVER["REMOTE_PORT"] . "\r\n";
$body .= "QUERY_STRING: " . $_SERVER["QUERY_STRING"] . "\r\n";
$body .= "REQUEST_URI: " . $_SERVER["REQUEST_URI"] . "\r\n";

$method = $_SERVER['REQUEST_METHOD'];

$files = $_FILES['uploads'];
$ifFilesPassed = TRUE;

if ( $files ) {

  var_dump($files);
}

if ($name && $from && $method === 'POST' && $ifFilesPassed) {

  $mail = new Message;
  $mail->setFrom($from)
      ->addTo($to)
      ->setSubject($subject)
      ->setBody($body);


  $mailer = new SendmailMailer;
  $mailer->send($mail);
}
