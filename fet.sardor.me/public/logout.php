<?php
include 'php-scripts/is-valid-user.php';
include 'php-scripts/db-connect.php';

session_destroy();
header("Location: index.php");