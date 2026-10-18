/**
 * Validator Pemesanan Tiket (Soal 2)
 * Spesifikasi:
 * - Jumlah Tiket: 1-10 tiket
 * - Kode Promo: 5-10 karakter, opsional (boleh kosong)
 * - Tanggal Keberangkatan: Format YYYY-MM-DD, minimal hari ini
 */

export function validateTicketCount(count) {
  if (count === null || count === undefined || count === '' || isNaN(Number(count))) {
    return { valid: false, message: 'Jumlah tiket harus berupa angka' };
  }
  const numericCount = Number(count);
  if (!Number.isInteger(numericCount)) {
    return { valid: false, message: 'Jumlah tiket harus berupa bilangan bulat' };
  }
  if (numericCount < 1) {
    return { valid: false, message: 'Jumlah tiket minimal 1 tiket' };
  }
  if (numericCount > 10) {
    return { valid: false, message: 'Jumlah tiket maksimal 10 tiket' };
  }
  return { valid: true, message: 'Jumlah tiket valid' };
}

export function validatePromoCode(promo) {
  // Opsional (boleh kosong atau undefined/null)
  if (promo === undefined || promo === null || promo === '') {
    return { valid: true, message: 'Kode promo kosong (opsional)' };
  }
  if (typeof promo !== 'string') {
    return { valid: false, message: 'Kode promo harus berupa teks' };
  }
  if (promo.length < 5) {
    return { valid: false, message: 'Kode promo minimal 5 karakter' };
  }
  if (promo.length > 10) {
    return { valid: false, message: 'Kode promo maksimal 10 karakter' };
  }
  return { valid: true, message: 'Kode promo valid' };
}

export function validateDepartureDate(dateStr, today = new Date()) {
  if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { valid: false, message: 'Format tanggal harus YYYY-MM-DD' };
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  // Periksa keabsahan tanggal kalender (contoh: 2026-02-31)
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return { valid: false, message: 'Tanggal kalender tidak valid' };
  }

  // Bandingkan dengan hari ini (jam dinetralkan)
  const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (dateObj < todayZero) {
    return { valid: false, message: 'Tanggal keberangkatan minimal hari ini' };
  }

  return { valid: true, message: 'Tanggal keberangkatan valid' };
}

export function validateTicketOrder(data, today) {
  const countCheck = validateTicketCount(data?.ticketCount);
  if (!countCheck.valid) return countCheck;

  const promoCheck = validatePromoCode(data?.promoCode);
  if (!promoCheck.valid) return promoCheck;

  const dateCheck = validateDepartureDate(data?.departureDate, today);
  if (!dateCheck.valid) return dateCheck;

  return { valid: true, message: 'Pemesanan tiket berhasil diproses' };
}
