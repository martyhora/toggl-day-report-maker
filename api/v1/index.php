<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once 'vendor/autoload.php';

$app = new \Slim\App;

$app->get('/report/{date}/{workspaceId}/{token}', function (Request $request, Response $response, $args) {
    $day = $args['date'];
    $workspaceId = $args['workspaceId'];
    $userAgent = 'test';
    $apiToken = $args['token'];
    $reportUrl = "https://toggl.com/reports/api/v2/details?user_agent={$userAgent}&since={$day}&until={$day}";

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_USERPWD, "{$apiToken}:api_token");
    curl_setopt($ch, CURLOPT_URL, "{$reportUrl}&workspace_id={$workspaceId}");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    return $response->withJSON(json_decode(curl_exec($ch)));
});

$app->run();


