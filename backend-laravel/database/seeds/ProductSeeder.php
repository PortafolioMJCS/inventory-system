<?php
use Illuminate\Database\Seeder;
// use App\Product; // o el namespace correcto
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Laptop',
                'description' => 'Laptop de ejemplo',
                'price' => 15000,
                'stock' => 5
            ],
            [
                'name' => 'Mouse',
                'description' => 'Mouse inal&aacute;mbrico',
                'price' => 300,
                'stock' => 20
            ],
            [
                'name' => 'Teclado',
                'description' => 'Teclado mec&aacute;nico',
                'price' => 1200,
                'stock' => 10
            ]
        ];

        foreach ($products as $product) {
            DB::table('products')->updateOrInsert(
                ['name' => $product['name']],
                $product
            );
        }
    }
}