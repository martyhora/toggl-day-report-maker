<?php

namespace TogglApiClient;

class TogglApi
{
    const REPORT_URL = "https://toggl.com/reports/api/v2/details?user_agent=%s&since=%s&until=%s";

    /** @var string  */
    private $token;

    /** @var int */
    private $workspaceId;

    public function __construct(string $token, int $workspaceId)
    {
        $this->token = $token;
        $this->workspaceId = $workspaceId;
    }

    public function getReport(string $since, string $until) : array
    {
        $userAgent = 'test';
        $reportUrl = sprintf(self::REPORT_URL, $userAgent, $since, $until);

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_USERPWD, "{$this->token}:api_token");
        curl_setopt($ch, CURLOPT_URL, "{$reportUrl}&workspace_id={$this->workspaceId}");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        return json_decode(curl_exec($ch), true);
    }
}