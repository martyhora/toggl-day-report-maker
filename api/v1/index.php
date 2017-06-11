<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use TogglApiClient\TogglApi;

require_once 'vendor/autoload.php';

$app = new \Slim\App;

$app->get('/report/{date}/{workspaceId}/{token}', function (Request $request, Response $response, $args) {
    $api = new TogglApi($args['token'], (int) $args['workspaceId']);

    $day = $args['date'];

    return $response->withJSON($api->getReport($day, $day));
});

$app->run();


