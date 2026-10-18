import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateTransferAmount,
  validateTransferWithBalance
} from '../src/validators/bankTransferValidator.js';

test('Soal 4 - Boundary Value Analysis Form Transfer Bank', async (t) => {
  await t.test('Nominal Transfer: min-1 (Rp9.999) -> Invalid', () => {
    const res = validateTransferAmount(9999);
    assert.equal(res.valid, false);
    assert.match(res.message, /minimal/i);
  });

  await t.test('Nominal Transfer: min (Rp10.000) -> Valid', () => {
    const res = validateTransferAmount(10000);
    assert.equal(res.valid, true);
  });

  await t.test('Nominal Transfer: min+1 (Rp10.001) -> Valid', () => {
    const res = validateTransferAmount(10001);
    assert.equal(res.valid, true);
  });

  await t.test('Nominal Transfer: max-1 (Rp99.999.999) -> Valid', () => {
    const res = validateTransferAmount(99999999);
    assert.equal(res.valid, true);
  });

  await t.test('Nominal Transfer: max (Rp100.000.000) -> Valid', () => {
    const res = validateTransferAmount(100000000);
    assert.equal(res.valid, true);
  });

  await t.test('Nominal Transfer: max+1 (Rp100.000.001) -> Invalid', () => {
    const res = validateTransferAmount(100000001);
    assert.equal(res.valid, false);
    assert.match(res.message, /maksimal/i);
  });

  // Uji BVA Batas Saldo Minimal (Biaya Admin Rp2.500, Saldo Min Rp50.000)
  // Misalkan Saldo Awal = Rp100.000:
  // Maksimum transfer valid = 100.000 - 50.000 - 2.500 = 47.500 (sisa saldo Rp50.000)
  await t.test('BVA Saldo: Tepat pada batas saldo minimum (Transfer 47.500, Saldo 100.000) -> Valid', () => {
    const res = validateTransferWithBalance(47500, 100000);
    assert.equal(res.valid, true);
    assert.equal(res.remainingBalance, 50000);
  });

  await t.test('BVA Saldo: Melanggar batas saldo minimum (Transfer 47.501, Saldo 100.000) -> Invalid', () => {
    const res = validateTransferWithBalance(47501, 100000);
    assert.equal(res.valid, false);
    assert.match(res.message, /saldo minimal/i);
  });
});
