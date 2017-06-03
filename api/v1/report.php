<?php

header('Content-Type: application/json');

$day = isset($_GET['date']) ? $_GET['date'] : '';
$workspaceId = isset($_GET['workspaceId']) ? $_GET['workspaceId'] : '';
$userAgent = 'test';
$apiToken = isset($_GET['token']) ? $_GET['token'] : '';
$reportUrl = "https://toggl.com/reports/api/v2/details?user_agent={$userAgent}&since={$day}&until={$day}";

$ch = curl_init();

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_USERPWD, "{$apiToken}:api_token");
curl_setopt($ch, CURLOPT_URL, "{$reportUrl}&workspace_id={$workspaceId}");
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

echo curl_exec($ch);