<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
// use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->updateOrInsert(
            ['email' => 'test1@test.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('123456')
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'test@test.com'],
            [
                'name' => 'Jair',
                'password' => bcrypt('123456')
            ]
        );

        // User::firstOrCreate(
        //     ['email' => 'test@test.com'],
        //     ['name' => 'Jair', 'password' => bcrypt('123456')]
        // );
    }
}
