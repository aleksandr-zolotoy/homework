<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div class="div">
    <?php
include 'output.php';
require 'output-cycle.php';
require 'counter-even.php';
    ?>
</div>

<div class="output">
    <?php 
    renderTag("h1", "Домашнее задание");

    renderTagCycle("h3", "Заголовок", 3);
    ?>
</div>
</body>
</html>

