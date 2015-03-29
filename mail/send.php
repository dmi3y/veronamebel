use Nette\Mail\Message;

$mail = new Message;
$mail->setFrom('John <john@example.com>')
    ->addTo('peter@example.com')
    ->addTo('jack@example.com')
    ->setSubject('Order Confirmation')
    ->setBody("Hello, Your order has been accepted.");