import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateTicketCount,
  validatePromoCode,
  validateDepartureDate,
  validateTicketOrder
} from '../src/validators/ticketBookingValidator.js';

test('Soal 2 - Equivalence Partitioning Form Pemesanan Tiket', async (t) => {
  const fakeToday = new Date('2026-10-18T00:00:00Z');

  await t.test('Jumlah Tiket: Valid P1 (1-10 tiket)', () => {
    assert.equal(validateTicketCount(1).valid, true);
    assert.equal(validateTicketCount(5).valid, true);
    assert.equal(validateTicketCount(10).valid, true);
  });

  await t.test('Jumlah Tiket: Invalid P2 (< 1)', () => {
    const res = validateTicketCount(0);
    assert.equal(res.valid, false);
    assert.match(res.message, /minimal 1/i);
  });

  await t.test('Jumlah Tiket: Invalid P3 (> 10)', () => {
    const res = validateTicketCount(11);
    assert.equal(res.valid, false);
    assert.match(res.message, /maksimal 10/i);
  });

  await t.test('Jumlah Tiket: Invalid P4 (Bukan angka / non-integer)', () => {
    assert.equal(validateTicketCount('lima').valid, false);
    assert.equal(validateTicketCount(2.5).valid, false);
  });

  await t.test('Kode Promo: Valid P1 (5-10 karakter)', () => {
    assert.equal(validatePromoCode('HEMAT').valid, true);
    assert.equal(validatePromoCode('PROMO2026').valid, true);
  });

  await t.test('Kode Promo: Valid P2 (Boleh kosong/opsional)', () => {
    assert.equal(validatePromoCode('').valid, true);
    assert.equal(validatePromoCode(null).valid, true);
    assert.equal(validatePromoCode(undefined).valid, true);
  });

  await t.test('Kode Promo: Invalid P3 (< 5 karakter)', () => {
    const res = validatePromoCode('DISC');
    assert.equal(res.valid, false);
    assert.match(res.message, /minimal 5/i);
  });

  await t.test('Kode Promo: Invalid P4 (> 10 karakter)', () => {
    const res = validatePromoCode('DISKONBESAR100');
    assert.equal(res.valid, false);
    assert.match(res.message, /maksimal 10/i);
  });

  await t.test('Tanggal: Valid P1 (Hari ini)', () => {
    assert.equal(validateDepartureDate('2026-10-18', fakeToday).valid, true);
  });

  await t.test('Tanggal: Valid P2 (Masa depan)', () => {
    assert.equal(validateDepartureDate('2026-12-25', fakeToday).valid, true);
  });

  await t.test('Tanggal: Invalid P3 (Masa lalu)', () => {
    const res = validateDepartureDate('2026-10-17', fakeToday);
    assert.equal(res.valid, false);
    assert.match(res.message, /minimal hari ini/i);
  });

  await t.test('Tanggal: Invalid P4 (Format salah)', () => {
    assert.equal(validateDepartureDate('18-10-2026', fakeToday).valid, false);
    assert.equal(validateDepartureDate('2026/10/18', fakeToday).valid, false);
  });

  await t.test('Tanggal: Invalid P5 (Tanggal kalender tidak valid)', () => {
    assert.equal(validateDepartureDate('2026-02-31', fakeToday).valid, false);
  });

  await t.test('Form Order: Valid Complete Order', () => {
    const res = validateTicketOrder({
      ticketCount: 3,
      promoCode: 'LIBURAN',
      departureDate: '2026-10-20'
    }, fakeToday);
    assert.equal(res.valid, true);
  });
});
