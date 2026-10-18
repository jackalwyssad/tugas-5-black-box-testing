import test from 'node:test';
import assert from 'node:assert/strict';
import { handlePostProduct, VALID_TOKEN } from '../src/api/productApi.js';

test('Soal 6 - API Testing POST /api/v1/products', async (t) => {
  const validHeaders = { authorization: `Bearer ${VALID_TOKEN}` };

  // 1. Valid request
  await t.test('Test Case 1: Valid request -> 201 Created', () => {
    const res = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'Laptop Gaming',
        price: 15000000, // Note: max is 10000000, let's use 7500000 to be valid
        stock: 50,
        category: 'electronics'
      }
    });
    // Let's adjust price to 7500000 which is within 1000 - 10000000
    const validRes = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'Laptop Gaming ASUS',
        price: 7500000,
        stock: 50,
        category: 'electronics'
      }
    });
    assert.equal(validRes.status, 201);
    assert.equal(validRes.body.message, 'Product berhasil dibuat');
    assert.ok(validRes.body.data.id);
  });

  // 2. Name < 3 karakter
  await t.test('Test Case 2: Name < 3 karakter -> 400 Bad Request', () => {
    const res = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'AB',
        price: 50000,
        stock: 10,
        category: 'clothing'
      }
    });
    assert.equal(res.status, 400);
    assert.match(res.body.message, /nama produk/i);
  });

  // 3. Price < 1000
  await t.test('Test Case 3: Price < 1000 -> 400 Bad Request', () => {
    const res = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'Pensil 2B',
        price: 999,
        stock: 20,
        category: 'food'
      }
    });
    assert.equal(res.status, 400);
    assert.match(res.body.message, /harga/i);
  });

  // 4. Stock > 1000
  await t.test('Test Case 4: Stock > 1000 -> 400 Bad Request', () => {
    const res = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'Kemeja Batik Pria',
        price: 150000,
        stock: 1001,
        category: 'clothing'
      }
    });
    assert.equal(res.status, 400);
    assert.match(res.body.message, /stok/i);
  });

  // 5. Category invalid
  await t.test('Test Case 5: Category invalid -> 400 Bad Request', () => {
    const res = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'Buku Pemrograman',
        price: 85000,
        stock: 15,
        category: 'stationery'
      }
    });
    assert.equal(res.status, 400);
    assert.match(res.body.message, /kategori tidak valid/i);
  });

  // 6. Unauthorized (Token missing or invalid)
  await t.test('Test Case 6: Unauthorized -> 401 Unauthorized', () => {
    const res = handlePostProduct({
      headers: { authorization: 'Bearer wrong-token' },
      body: {
        name: 'Monitor LED 24 inch',
        price: 1200000,
        stock: 5,
        category: 'electronics'
      }
    });
    assert.equal(res.status, 401);
    assert.equal(res.body.error, 'Unauthorized');
    assert.equal(res.body.message, 'Token tidak valid');
  });

  // Bonus Boundary Test Cases on API
  await t.test('Test Case 7 (BVA Boundary): Price min 1000 & stock min 0 -> 201 Created', () => {
    const res = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'Roti Coklat Manis',
        price: 1000,
        stock: 0,
        category: 'food'
      }
    });
    assert.equal(res.status, 201);
  });

  await t.test('Test Case 8 (BVA Boundary): Stock max 1000 & Price max 10000000 -> 201 Created', () => {
    const res = handlePostProduct({
      headers: validHeaders,
      body: {
        name: 'Smartphone Flagship 5G',
        price: 10000000,
        stock: 1000,
        category: 'electronics'
      }
    });
    assert.equal(res.status, 201);
  });
});
