<?php
namespace App\Services;

use Laravel\Socialite\Two\User;
use Laravel\Socialite\Two\AbstractProvider;

class HuggySocialiteProvider extends AbstractProvider
{
    protected function getAuthUrl($state)
    {
        $huggyAuthUrl = config('services.huggy.auth_url');
        return $this->buildAuthUrlFromBase($huggyAuthUrl . '/oauth/authorize', $state);
    }

    protected function getTokenUrl()
    {
        $huggyAuthUrl = config('services.huggy.auth_url');
        return $huggyAuthUrl . '/oauth/access_token';
    }

    protected function getUserByToken($token)
    {
        $response = $this->getHttpClient()->post($this->getTokenUrl(), [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'code' => $token,
            ],
        ]);

        $responseContents = json_decode($response->getBody(), true);
        $bearerToken = $responseContents ['access_token'];

        $response = $this->getHttpClient()->get('https://api.huggy.app/v3/agents/profile', [
            'headers' => [
                'cache-control' => 'no-cache',
                'Authorization' => 'Bearer ' . $bearerToken,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    /**
     * @return User
     */
    protected function mapUserToObject(array $user)
    {
        return (new User())->setRaw($user)->map([
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
        ]);
    }
}