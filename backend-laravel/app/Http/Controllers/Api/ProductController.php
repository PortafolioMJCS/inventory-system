<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ProductRequest;

use App\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());

        $client = new Client();
        $user = auth()->user();
        if (!app()->environment('testing')) {
            try {
                $client->post('http://log_service:3001/log', [
                    'json' => [
                        'action' => 'crear_producto',
                        'user' => $user ? $user->name : 'guest',
                        'data' => $product->toArray()
                    ]
                ]);
            } catch (\Exception $e) {
                Log::error('Error enviando log: ' . $e->getMessage());
            }
        }

        return response()->json($product, 201);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function update(ProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());

        $client = new Client();
        $user = auth()->user();
        try {
            $client->post('http://log_service:3001/log', [
                'json' => [
                    'action' => 'actualizar_producto',
                    'user' => $user ? $user->name : 'guest',
                    'data' => $product->toArray()
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error enviando log: ' . $e->getMessage());
        }
        return $product;
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        Product::destroy($id);
        $client = new Client();
        $user = auth()->user();
        try {
            $client->post('http://log_service:3001/log', [
                'json' => [
                    'action' => 'eliminar_producto',
                    'user' => $user ? $user->name : 'guest',
                    'data' => $product->toArray()
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error enviando log: ' . $e->getMessage());
        }
        return response()->json(['message' => 'Deleted']);
    }
}
