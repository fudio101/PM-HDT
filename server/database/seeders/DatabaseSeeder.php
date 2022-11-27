<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Country;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
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
    }
}
