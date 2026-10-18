import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateName,
  validateEmailOnline,
  validatePhoneOnline,
  validateBirthDate,
  validatePasswordWithSymbol,
  validateConfirmPassword,
  validateOnlineRegistration
} from '../src/validators/onlineRegistrationValidator.js';

test('Soal 7 - Studi Kasus Terpadu Form Pendaftaran Online (Minimal 25 Test Case)', async (t) => {
  const refDate = new Date('2026-10-18T00:00:00Z');

  // Base valid dataset
  const validUser = {
    name: 'Jacky Firmansah',
    email: 'jacky@stmik-bandung.ac.id',
    phone: '081234567890',
    birthDate: '2005-05-15', // age 21 in 2026
    password: 'Password123!',
    confirmPassword: 'Password123!'
  };

  // 1. Valid End-to-End Submission
  await t.test('TC-ST-01 [EP]: Valid Complete Form Submission -> Berhasil', () => {
    const res = validateOnlineRegistration(validUser, refDate);
    assert.equal(res.valid, true);
    assert.equal(res.message, 'Pendaftaran online berhasil');
  });

  // FIELD: Nama (3-100 karakter)
  await t.test('TC-ST-02 [BVA]: Nama 2 karakter (min-1) -> Invalid', () => {
    assert.equal(validateName('Al').valid, false);
  });
  await t.test('TC-ST-03 [BVA]: Nama 3 karakter (min) -> Valid', () => {
    assert.equal(validateName('Ali').valid, true);
  });
  await t.test('TC-ST-04 [BVA]: Nama 4 karakter (min+1) -> Valid', () => {
    assert.equal(validateName('Alif').valid, true);
  });
  await t.test('TC-ST-05 [BVA]: Nama 99 karakter (max-1) -> Valid', () => {
    assert.equal(validateName('N'.repeat(99)).valid, true);
  });
  await t.test('TC-ST-06 [BVA]: Nama 100 karakter (max) -> Valid', () => {
    assert.equal(validateName('N'.repeat(100)).valid, true);
  });
  await t.test('TC-ST-07 [BVA]: Nama 101 karakter (max+1) -> Invalid', () => {
    assert.equal(validateName('N'.repeat(101)).valid, false);
  });
  await t.test('TC-ST-08 [EP]: Nama kosong -> Invalid', () => {
    assert.equal(validateName('').valid, false);
  });

  // FIELD: Email
  await t.test('TC-ST-09 [EP]: Email valid -> Valid', () => {
    assert.equal(validateEmailOnline('mahasiswa@univ.ac.id').valid, true);
  });
  await t.test('TC-ST-10 [EP]: Email tanpa simbol @ -> Invalid', () => {
    assert.equal(validateEmailOnline('mahasiswauniv.ac.id').valid, false);
  });
  await t.test('TC-ST-11 [EP]: Email tanpa domain -> Invalid', () => {
    assert.equal(validateEmailOnline('mahasiswa@').valid, false);
  });
  await t.test('TC-ST-12 [EP]: Email kosong -> Invalid', () => {
    assert.equal(validateEmailOnline('').valid, false);
  });

  // FIELD: No. HP (10-13 digit, 08 prefix)
  await t.test('TC-ST-13 [BVA]: No HP 9 digit (min-1) -> Invalid', () => {
    assert.equal(validatePhoneOnline('081234567').valid, false);
  });
  await t.test('TC-ST-14 [BVA]: No HP 10 digit (min) -> Valid', () => {
    assert.equal(validatePhoneOnline('0812345678').valid, true);
  });
  await t.test('TC-ST-15 [BVA]: No HP 13 digit (max) -> Valid', () => {
    assert.equal(validatePhoneOnline('0812345678901').valid, true);
  });
  await t.test('TC-ST-16 [BVA]: No HP 14 digit (max+1) -> Invalid', () => {
    assert.equal(validatePhoneOnline('08123456789012').valid, false);
  });
  await t.test('TC-ST-17 [EP]: No HP tidak diawali 08 -> Invalid', () => {
    assert.equal(validatePhoneOnline('07123456789').valid, false);
  });
  await t.test('TC-ST-18 [EP]: No HP mengandung karakter non-digit -> Invalid', () => {
    assert.equal(validatePhoneOnline('0812-3456-78').valid, false);
  });

  // FIELD: Tanggal Lahir (YYYY-MM-DD, min 17 tahun)
  await t.test('TC-ST-19 [BVA]: Umur tepat 16 tahun 364 hari (kurang 1 hari dari 17 thn) -> Invalid', () => {
    // Reference date: 2026-10-18. 17 years ago is 2009-10-18.
    // 2009-10-19 makes age 16 years old.
    assert.equal(validateBirthDate('2009-10-19', refDate).valid, false);
  });
  await t.test('TC-ST-20 [BVA]: Umur tepat 17 tahun (lahir 2009-10-18) -> Valid', () => {
    assert.equal(validateBirthDate('2009-10-18', refDate).valid, true);
  });
  await t.test('TC-ST-21 [BVA]: Umur 17 tahun lebih 1 hari (lahir 2009-10-17) -> Valid', () => {
    assert.equal(validateBirthDate('2009-10-17', refDate).valid, true);
  });
  await t.test('TC-ST-22 [EP]: Format tanggal tidak valid (bukan YYYY-MM-DD) -> Invalid', () => {
    assert.equal(validateBirthDate('18-10-2000', refDate).valid, false);
  });
  await t.test('TC-ST-23 [EP]: Tanggal kalender tidak eksis (2000-02-30) -> Invalid', () => {
    assert.equal(validateBirthDate('2000-02-30', refDate).valid, false);
  });

  // FIELD: Password (min 8 karakter, huruf besar, huruf kecil, angka, simbol)
  await t.test('TC-ST-24 [BVA]: Password 7 karakter (min-1) -> Invalid', () => {
    assert.equal(validatePasswordWithSymbol('Pass1!a').valid, false);
  });
  await t.test('TC-ST-25 [BVA]: Password 8 karakter (min) -> Valid', () => {
    assert.equal(validatePasswordWithSymbol('Pass12!a').valid, true);
  });
  await t.test('TC-ST-26 [EP]: Password tanpa simbol -> Invalid', () => {
    assert.equal(validatePasswordWithSymbol('Password123').valid, false);
  });
  await t.test('TC-ST-27 [EP]: Password tanpa huruf besar -> Invalid', () => {
    assert.equal(validatePasswordWithSymbol('password123!').valid, false);
  });
  await t.test('TC-ST-28 [EP]: Password tanpa angka -> Invalid', () => {
    assert.equal(validatePasswordWithSymbol('Password!@#').valid, false);
  });

  // FIELD: Konfirmasi Password
  await t.test('TC-ST-29 [EP]: Konfirmasi password cocok -> Valid', () => {
    assert.equal(validateConfirmPassword('Pass123!', 'Pass123!').valid, true);
  });
  await t.test('TC-ST-30 [EP]: Konfirmasi password berbeda -> Invalid', () => {
    assert.equal(validateConfirmPassword('Pass123!', 'Beda123!').valid, false);
  });
});
