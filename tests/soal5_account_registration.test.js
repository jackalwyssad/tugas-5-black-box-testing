import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateFullName,
  validateUsernameReg,
  validateEmail,
  validatePasswordReg,
  validateAgeReg,
  validatePhone,
  validateAccountRegistration
} from '../src/validators/accountRegistrationValidator.js';

test('Soal 5 - Kombinasi EP & BVA Form Registrasi Akun (Minimal 20 Test Case)', async (t) => {
  // Base valid object for positive testing
  const validBase = {
    fullName: 'Jacky Firmansah',
    username: 'jacky123',
    email: 'jacky@example.com',
    password: 'Password123',
    age: 21,
    phone: '08123456789'
  };

  // TC-01: Valid Registration (All Valid)
  await t.test('TC-REG-01: Valid registration form submission', () => {
    const res = validateAccountRegistration(validBase);
    assert.equal(res.valid, true);
    assert.equal(res.message, 'Registrasi akun berhasil');
  });

  // FIELD 1: Nama Lengkap (3-50 karakter)
  await t.test('TC-REG-02 [BVA]: Nama 2 karakter (min-1) -> Invalid', () => {
    assert.equal(validateFullName('Jo').valid, false);
  });
  await t.test('TC-REG-03 [BVA]: Nama 3 karakter (min) -> Valid', () => {
    assert.equal(validateFullName('Joe').valid, true);
  });
  await t.test('TC-REG-04 [BVA]: Nama 4 karakter (min+1) -> Valid', () => {
    assert.equal(validateFullName('John').valid, true);
  });
  await t.test('TC-REG-05 [BVA]: Nama 49 karakter (max-1) -> Valid', () => {
    assert.equal(validateFullName('A'.repeat(49)).valid, true);
  });
  await t.test('TC-REG-06 [BVA]: Nama 50 karakter (max) -> Valid', () => {
    assert.equal(validateFullName('A'.repeat(50)).valid, true);
  });
  await t.test('TC-REG-07 [BVA]: Nama 51 karakter (max+1) -> Invalid', () => {
    assert.equal(validateFullName('A'.repeat(51)).valid, false);
  });
  await t.test('TC-REG-08 [EP]: Nama kosong -> Invalid', () => {
    assert.equal(validateFullName('').valid, false);
  });

  // FIELD 2: Username (5-20 char, alphanumeric, no leading digit)
  await t.test('TC-REG-09 [BVA]: Username 4 karakter (min-1) -> Invalid', () => {
    assert.equal(validateUsernameReg('user').valid, false);
  });
  await t.test('TC-REG-10 [BVA]: Username 5 karakter (min) -> Valid', () => {
    assert.equal(validateUsernameReg('user1').valid, true);
  });
  await t.test('TC-REG-11 [BVA]: Username 20 karakter (max) -> Valid', () => {
    assert.equal(validateUsernameReg('u'.repeat(20)).valid, true);
  });
  await t.test('TC-REG-12 [BVA]: Username 21 karakter (max+1) -> Invalid', () => {
    assert.equal(validateUsernameReg('u'.repeat(21)).valid, false);
  });
  await t.test('TC-REG-13 [EP]: Username diawali angka -> Invalid', () => {
    assert.equal(validateUsernameReg('1user').valid, false);
  });
  await t.test('TC-REG-14 [EP]: Username mengandung simbol -> Invalid', () => {
    assert.equal(validateUsernameReg('user@name').valid, false);
  });

  // FIELD 3: Email (format email valid)
  await t.test('TC-REG-15 [EP]: Email valid -> Valid', () => {
    assert.equal(validateEmail('user@test.com').valid, true);
  });
  await t.test('TC-REG-16 [EP]: Email tanpa @ -> Invalid', () => {
    assert.equal(validateEmail('usertest.com').valid, false);
  });
  await t.test('TC-REG-17 [EP]: Email tanpa domain TLD -> Invalid', () => {
    assert.equal(validateEmail('user@test').valid, false);
  });

  // FIELD 4: Password (min 8 karakter, huruf besar, huruf kecil, angka)
  await t.test('TC-REG-18 [BVA]: Password 7 karakter (min-1) -> Invalid', () => {
    assert.equal(validatePasswordReg('Pass123').valid, false);
  });
  await t.test('TC-REG-19 [BVA]: Password 8 karakter (min) -> Valid', () => {
    assert.equal(validatePasswordReg('Pass1234').valid, true);
  });
  await t.test('TC-REG-20 [EP]: Password tanpa huruf besar -> Invalid', () => {
    assert.equal(validatePasswordReg('password123').valid, false);
  });
  await t.test('TC-REG-21 [EP]: Password tanpa angka -> Invalid', () => {
    assert.equal(validatePasswordReg('Passwordku').valid, false);
  });

  // FIELD 5: Umur (17-100 tahun)
  await t.test('TC-REG-22 [BVA]: Umur 16 tahun (min-1) -> Invalid', () => {
    assert.equal(validateAgeReg(16).valid, false);
  });
  await t.test('TC-REG-23 [BVA]: Umur 17 tahun (min) -> Valid', () => {
    assert.equal(validateAgeReg(17).valid, true);
  });
  await t.test('TC-REG-24 [BVA]: Umur 100 tahun (max) -> Valid', () => {
    assert.equal(validateAgeReg(100).valid, true);
  });
  await t.test('TC-REG-25 [BVA]: Umur 101 tahun (max+1) -> Invalid', () => {
    assert.equal(validateAgeReg(101).valid, false);
  });

  // FIELD 6: No. Telepon (10-13 digit, diawali 08)
  await t.test('TC-REG-26 [BVA]: No. Telepon 9 digit (min-1) -> Invalid', () => {
    assert.equal(validatePhone('081234567').valid, false);
  });
  await t.test('TC-REG-27 [BVA]: No. Telepon 10 digit (min) -> Valid', () => {
    assert.equal(validatePhone('0812345678').valid, true);
  });
  await t.test('TC-REG-28 [BVA]: No. Telepon 13 digit (max) -> Valid', () => {
    assert.equal(validatePhone('0812345678901').valid, true);
  });
  await t.test('TC-REG-29 [BVA]: No. Telepon 14 digit (max+1) -> Invalid', () => {
    assert.equal(validatePhone('08123456789012').valid, false);
  });
  await t.test('TC-REG-30 [EP]: No. Telepon tidak diawali 08 -> Invalid', () => {
    assert.equal(validatePhone('02123456789').valid, false);
  });
});
