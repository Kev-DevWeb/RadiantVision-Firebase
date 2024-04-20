<?php
session_start();
include("../login/conexion.php"); // include the connection file
include("../login/functions.php"); // include the functions file

$user_data = check_login($con); // check if the user is logged in
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Cursos Radiant Vision</title>
</head>

<body>
    <a href="../login/logout.php">Cerrar sesión</a>
    <H2>WENAS</H2>

    <p> Hola!, <?php echo $user_data['user_name'];?> </p>
</body>

</html>