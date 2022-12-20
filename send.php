<?php

 /* Здесь проверяется существование переменных */
  if (isset($_POST['phone-number'])) {$phone = $_POST['phone-number'];}
 if (isset($_POST['name'])) {$name = $_POST['name'];}




/* Сюда впишите свою эл. почту */
 $address = "azimkulov40@gmail.com";

/* А здесь прописывается текст сообщения, \n - перенос строки */
 $mes = "Тема: Заказ обратного звонка!  \nТелефон: $phone\nИмя: $name";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='Заказ'; //сабж
$email='Заказ <Лендинг грили>'; // от кого
 $send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email;");

 header("Location: /");
?>