import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateUsername,
  validatePassword,
  validateAge,
  validateLoginForm
} from '../src/validators/loginValidator.js';

test('Soal 1 - Equivalence Partitioning Form Login', async (t) => {
  await t.test('Username: Valid P1 (5-20 karakter alfanumerik)', () => {
    const res = validateUsername('user123');
    assert.equal(res.valid, true);
  });

  await t.test('Username: Invalid P2 (< 5 karakter)', () => {
    const res = validateUsername('usr1');
    assert.equal(res.valid, false);
    assert.match(res.message, /minimal 5/i);
  });

  await t.test('Username: Invalid P3 (> 20 karakter)', () => {
    const res = validateUsername('user12345678901234567');
    assert.equal(res.valid, false);
    assert.match(res.message, /maksimal 20/i);
  });

  await t.test('Username: Invalid P4 (Karakter simbol/spasi)', () => {
    const res = validateUsername('user_123!');
    assert.equal(res.valid, false);
    assert.match(res.message, /hanya boleh berisi huruf dan angka/i);
  });

  await t.test('Username: Invalid P5 (Kosong)', () => {
    const res = validateUsername('');
    assert.equal(res.valid, false);
  });

  await t.test('Password: Valid P1 (>=8 char, huruf besar, huruf kecil, angka)', () => {
    const res = validatePassword('Pass1234');
    assert.equal(res.valid, true);
  });

  await t.test('Password: Invalid P2 (< 8 karakter)', () => {
    const res = validatePassword('Pass1');
    assert.equal(res.valid, false);
    assert.match(res.message, /minimal 8/i);
  });

  await t.test('Password: Invalid P3 (Tanpa huruf besar)', () => {
    const res = validatePassword('pass1234');
    assert.equal(res.valid, false);
    assert.match(res.message, /huruf besar/i);
  });

  await t.test('Password: Invalid P4 (Tanpa huruf kecil)', () => {
    const res = validatePassword('PASS1234');
    assert.equal(res.valid, false);
    assert.match(res.message, /huruf kecil/i);
  });

  await t.test('Password: Invalid P5 (Tanpa angka)', () => {
    const res = validatePassword('Passwordku');
    assert.equal(res.valid, false);
    assert.match(res.message, /angka/i);
  });

  await t.test('Umur: Valid P1 (17-100)', () => {
    const res = validateAge(25);
    assert.equal(res.valid, true);
  });

  await t.test('Umur: Invalid P2 (< 17)', () => {
    const res = validateAge(10);
    assert.equal(res.valid, false);
    assert.match(res.message, /minimal 17/i);
  });

  await t.test('Umur: Invalid P3 (> 100)', () => {
    const res = validateAge(150);
    assert.equal(res.valid, false);
    assert.match(res.message, /maksimal 100/i);
  });

  await t.test('Umur: Invalid P4 (Non-numerik)', () => {
    const res = validateAge('abc');
    assert.equal(res.valid, false);
    assert.match(res.message, /angka/i);
  });

  await t.test('Form Login: Valid Case', () => {
    const res = validateLoginForm({
      username: 'johndoe',
      password: 'Password123',
      age: 21
    });
    assert.equal(res.valid, true);
    assert.equal(res.message, 'Login berhasil');
  });
});
