/**
 * API Handler POST /api/v1/products (Soal 6)
 * Spesifikasi API:
 * Endpoint: POST /api/v1/products
 * Headers: Authorization: Bearer <valid_token>
 * Request Body:
 * {
 *   "name": string (3-100 karakter),
 *   "price": number (1000-10000000),
 *   "stock": integer (0-1000),
 *   "category": string (enum: "electronics", "clothing", "food")
 * }
 * Response:
 * - 201 Created: Product berhasil dibuat
 * - 400 Bad Request: Validasi gagal
 * - 401 Unauthorized: Token tidak valid
 */

export const ALLOWED_CATEGORIES = ['electronics', 'clothing', 'food'];
export const VALID_TOKEN = 'secret-token-123';

export function handlePostProduct(req) {
  const { headers = {}, body } = req || {};

  // 1. Cek Autentikasi
  const authHeader = headers.authorization || headers.Authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return {
      status: 401,
      body: {
        error: 'Unauthorized',
        message: 'Token tidak valid'
      }
    };
  }

  // 2. Cek Body
  if (!body || typeof body !== 'object') {
    return {
      status: 400,
      body: {
        error: 'Bad Request',
        message: 'Validasi gagal: Request body wajib diisi'
      }
    };
  }

  const { name, price, stock, category } = body;

  // Validasi Nama (3-100 karakter)
  if (typeof name !== 'string' || name.length < 3 || name.length > 100) {
    return {
      status: 400,
      body: {
        error: 'Bad Request',
        message: 'Validasi gagal: Nama produk harus berukuran 3-100 karakter'
      }
    };
  }

  // Validasi Harga (1000 - 10000000)
  if (typeof price !== 'number' || isNaN(price) || price < 1000 || price > 10000000) {
    return {
      status: 400,
      body: {
        error: 'Bad Request',
        message: 'Validasi gagal: Harga harus berupa angka antara 1000 hingga 10000000'
      }
    };
  }

  // Validasi Stok (integer 0 - 1000)
  if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0 || stock > 1000) {
    return {
      status: 400,
      body: {
        error: 'Bad Request',
        message: 'Validasi gagal: Stok harus berupa bilangan bulat antara 0 hingga 1000'
      }
    };
  }

  // Validasi Kategori (enum)
  if (!ALLOWED_CATEGORIES.includes(category)) {
    return {
      status: 400,
      body: {
        error: 'Bad Request',
        message: `Validasi gagal: Kategori tidak valid. Pilihan: ${ALLOWED_CATEGORIES.join(', ')}`
      }
    };
  }

  // Berhasil
  return {
    status: 201,
    body: {
      message: 'Product berhasil dibuat',
      data: {
        id: 'prod_' + Math.floor(Math.random() * 100000),
        name,
        price,
        stock,
        category,
        createdAt: new Date().toISOString()
      }
    }
  };
}
