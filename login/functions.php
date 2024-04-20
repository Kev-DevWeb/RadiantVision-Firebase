<?php

function check_login($con)
{
    if(isset($_SESSION['user_id'])) // if user is logged in
    {
        $id = $_SESSION['user_id']; // get the user id
        $query = "select * from users where user_id = '$id' limit 1"; // get the user data from the database

        $result = mysqli_query($con, $query); // execute the query
        if($result && mysqli_num_rows($result) > 0) // if the query is successful and the user exists
        {
            $user_data = mysqli_fetch_assoc($result); // get the user data
            return $user_data; // return the user data
        }
    }

    //redirect to login
    header("Location: login/login.php");
    die;
}

function random_num($length)
{
    $text = "";
    if($length < 5)
    {
        $length = 5;
    }

    $len = rand(4, $length); // generate a random number between 4 and the length
    for ($i = 0; $i < $len; $i++)
    {
        $text .= rand(0, 9); // generate a random number between 0 and 9
    }

    return $text;
}