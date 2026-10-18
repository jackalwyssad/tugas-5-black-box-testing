/**
 * Validator Form Login (Soal 1)
 * Spesifikasi:
 * - Username: 5-20 karakter, hanya huruf dan angka
 * - Password: Minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka
 * - Umur: 17-100 tahun (untuk verifikasi)
 */

export function validateUsername(username) {
  if (typeof username !== 'string' || username.trim() === '') {
    return { valid: false, message: 'Username tidak boleh kosong' };
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return { valid: false, message: 'Username hanya boleh berisi huruf dan angka' };
  }
  if (username.length < 5) {
    return { valid: false, message: 'Username minimal 5 karakter' };
  }
  if (username.length > 20) {
    return { valid: false, message: 'Username maksimal 20 karakter' };
  }
  return { valid: true, message: 'Username valid' };
}

export function validatePassword(password) {
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

export function validateAge(age) {
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

export function validateLoginForm(data) {
  const userCheck = validateUsername(data?.username);
  if (!userCheck.valid) return userCheck;

  const passCheck = validatePassword(data?.password);
  if (!passCheck.valid) return passCheck;

  const ageCheck = validateAge(data?.age);
  if (!ageCheck.valid) return ageCheck;

  return { valid: true, message: 'Login berhasil' };
}
