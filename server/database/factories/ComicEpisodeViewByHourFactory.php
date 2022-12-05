<?php

namespace Database\Factories;

use App\Models\ComicEpisodeViewByHour;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ComicEpisodeViewByHour>
 */
class ComicEpisodeViewByHourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'views' => $this->faker->numberBetween(1, 1000)
        ];
    }
}
