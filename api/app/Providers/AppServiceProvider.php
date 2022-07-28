<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Laravel\Socialite\Contracts\Factory as SocialiteFactory;
use Coderello\SocialGrant\Resolvers\SocialUserResolverInterface;

use App\Services\SocialUserResolver;
use App\Services\HuggySocialiteProvider;

class AppServiceProvider extends ServiceProvider
{
    public $bindings = [
        SocialUserResolverInterface::class => SocialUserResolver::class,
    ];
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $socialite = $this->app->make(SocialiteFactory::class);

        $socialite->extend('huggy', function () use ($socialite) {
            $config = config('services.huggy');
            return $socialite->buildProvider(HuggySocialiteProvider::class, $config);
        });
    }
}
