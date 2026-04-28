<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // dd(class_exists('UserSeeder'));
        $this->call('UserSeeder');
        $this->call('ProductSeeder');
    }
}
