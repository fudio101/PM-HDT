<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Exception;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        Role::factory()->create([
            'name' => 'Admin'
        ]);

        Role::factory()->create([
            'name' => 'Agent'
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'thenguyen1024@gmail.com',
            'password' => Hash::make('Ng01637202484'),
            'role_id' => 1,
        ]);

        Country::factory()->create([
            'name' => 'Nhật Bản'
        ]);

        Country::factory()->create([
            'name' => 'Hàn Quốc'
        ]);

        Country::factory()->create([
            'name' => 'Trung Quốc'
        ]);


//        for ($k = 1; $k <= 40; $k++) {
//            $i = 12;
//            $monthViews = 0;
//            for ($j = 1; $j <= 31; $j++) {
//                $dayViews = random_int(123, 1234);
//                $monthViews += $dayViews;
//
//                ComicEpisodeViewByDay::factory()->create([
//                    'comic_episode_id' => $k,
//                    'views' => $dayViews,
//                    'created_at' => Carbon::create(2022, $i, $j)
//                ]);
//            }
//
//            ComicEpisodeViewByMonth::factory()->create([
//                'comic_episode_id' => $k,
//                'views' => $monthViews,
//                'created_at' => Carbon::create(2022, $i)
//            ]);
//
//            for ($i = 0; $i <= 23; $i++) {
//                $hourViews = random_int(1, 250);
//                ComicEpisodeViewByHour::factory()->create([
//                    'comic_episode_id' => $k,
//                    'views' => $hourViews,
//                    'created_at' => Carbon::create(2022, 12, 15, $i)
//                ]);
//            }
//        }
    }
}
