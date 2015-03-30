<?php
require '../vendor/autoload.php';

use Nette\Mail\Message;
use Nette\Mail\SendmailMailer;

/*
* Before sending email making sure:
*
* 1. POST came from the same domain
* 2. Files number and size limits check
* 3. Existance of required information
*/

$to = 'lapshukov@gmail.com';
$from = '';
$subject = 'Запрос на заказ мебели.';
$body = '';

var_dump($_POST, $_FILES);
if (FALSE) {

  $mail = new Message;
  $mail->setFrom($from)
      ->addTo($to)
      ->setSubject($subject)
      ->setBody($body);


  $mailer = new SendmailMailer;
  $mailer->send($mail);
}

