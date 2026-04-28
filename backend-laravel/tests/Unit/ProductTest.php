<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;

use App\User;

class ProductTest extends TestCase
{
    // use RefreshDatabase;
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();

        $this->artisan('migrate');
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    // public function test_get_products()
    // {
    //     $response = $this->getJson('/api/products');

    //     $response->assertStatus(200)
    //             ->assertJsonStructure([
    //                 '*' => ['id', 'name', 'price']
    //             ]);
    // }

    public function test_create_product()
    {
        $this->artisan('migrate');

        // $user = \App\User::create([
        //     'name' => 'Test',
        //     'email' => 'test@test.com',
        //     'password' => bcrypt('123456'),
        // ]);

        // $this->actingAs($user);
        $this->withoutMiddleware();

        $data = [
            'name' => 'Producto test',
            'price' => 100,
            'stock' => 10,
            'description' => 'Descripción del producto test'
        ];

        // $response = $this->postJson('/api/products', $data);
        // $response = $this->json('POST', '/api/products', $data);
        $response = $this->post('/api/products', [
            'name' => 'Producto test',
            'price' => 100,
            'stock' => 10,
            // 'description' => 'Descripción del producto test'
        ]);
        // dd($response->json());
        // dd($response->getContent());
        $response->assertStatus(201);
        $this->assertDatabaseHas('products', ['name' => 'Producto test']);
    }
}
