/**
 * Validator Registrasi Akun (Soal 5)
 * Spesifikasi:
 * - Nama Lengkap: 3-50 karakter, tidak boleh kosong
 * - Username: 5-20 karakter, huruf & angka, tidak boleh diawali angka
 * - Email: Format email valid
 * - Password: Minimal 8 karakter, huruf besar, huruf kecil, angka
 * - Umur: 17-100 tahun
 * - No. Telepon: 10-13 digit, diawali 08
 */

export function validateFullName(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    return { valid: false, message: 'Nama lengkap tidak boleh kosong' };
  }
  const len = name.length;
  if (len < 3) {
    return { valid: false, message: 'Nama lengkap minimal 3 karakter' };
  }
  if (len > 50) {
    return { valid: false, message: 'Nama lengkap maksimal 50 karakter' };
  }
  return { valid: true, message: 'Nama lengkap valid' };
}

export function validateUsernameReg(username) {
  if (typeof username !== 'string' || username.trim() === '') {
    return { valid: false, message: 'Username tidak boleh kosong' };
  }
  if (username.length < 5) {
    return { valid: false, message: 'Username minimal 5 karakter' };
  }
  if (username.length > 20) {
    return { valid: false, message: 'Username maksimal 20 karakter' };
  }
  if (/^[0-9]/.test(username)) {
    return { valid: false, message: 'Username tidak boleh diawali angka' };
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return { valid: false, message: 'Username hanya boleh berupa huruf dan angka' };
  }
  return { valid: true, message: 'Username valid' };
}

export function validateEmail(email) {
  if (typeof email !== 'string' || email.trim() === '') {
    return { valid: false, message: 'Email tidak boleh kosong' };
  }
  // Standard RFC-compliant practical regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Format email tidak valid' };
  }
  return { valid: true, message: 'Email valid' };
}

export function validatePasswordReg(password) {
  if (typeof password !== 'string' || password === '') {
    return { valid: false, message: 'Password tidak boleh kosong' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password minimal 8 karakter' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password harus mengandung huruf besar' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password harus mengandung huruf kecil' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password harus mengandung angka' };
  }
  return { valid: true, message: 'Password valid' };
}

export function validateAgeReg(age) {
  if (age === null || age === undefined || age === '' || isNaN(Number(age))) {
    return { valid: false, message: 'Umur harus berupa angka' };
  }
  const numericAge = Number(age);
  if (!Number.isInteger(numericAge)) {
    return { valid: false, message: 'Umur harus berupa bilangan bulat' };
  }
  if (numericAge < 17) {
    return { valid: false, message: 'Umur minimal 17 tahun' };
  }
  if (numericAge > 100) {
    return { valid: false, message: 'Umur maksimal 100 tahun' };
  }
  return { valid: true, message: 'Umur valid' };
}

export function validatePhone(phone) {
  if (typeof phone !== 'string' || phone.trim() === '') {
    return { valid: false, message: 'Nomor telepon tidak boleh kosong' };
  }
  if (!/^08[0-9]+$/.test(phone)) {
    if (!phone.startsWith('08')) {
      return { valid: false, message: 'Nomor telepon harus diawali 08' };
    }
    return { valid: false, message: 'Nomor telepon hanya boleh berupa angka' };
  }
  if (phone.length < 10) {
    return { valid: false, message: 'Nomor telepon minimal 10 digit' };
  }
  if (phone.length > 13) {
    return { valid: false, message: 'Nomor telepon maksimal 13 digit' };
  }
  return { valid: true, message: 'Nomor telepon valid' };
}

export function validateAccountRegistration(data) {
  const nameRes = validateFullName(data?.fullName);
  if (!nameRes.valid) return nameRes;

  const userRes = validateUsernameReg(data?.username);
  if (!userRes.valid) return userRes;

  const emailRes = validateEmail(data?.email);
  if (!emailRes.valid) return emailRes;

  const passRes = validatePasswordReg(data?.password);
  if (!passRes.valid) return passRes;

  const ageRes = validateAgeReg(data?.age);
  if (!ageRes.valid) return ageRes;

  const phoneRes = validatePhone(data?.phone);
  if (!phoneRes.valid) return phoneRes;

  return { valid: true, message: 'Registrasi akun berhasil' };
}
