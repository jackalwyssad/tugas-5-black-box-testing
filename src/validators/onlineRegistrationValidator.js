/**
 * Validator Form Pendaftaran Online Terpadu (Soal 7 - Bonus)
 * Spesifikasi:
 * - Nama: 3-100 karakter
 * - Email: Format email valid
 * - No. HP: 10-13 digit, diawali 08
 * - Tanggal Lahir: Format YYYY-MM-DD, umur minimal 17 tahun
 * - Password: Minimal 8 karakter, huruf besar, huruf kecil, angka, simbol
 * - Konfirmasi Password: Harus sama dengan password
 */

export function validateName(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    return { valid: false, message: 'Nama tidak boleh kosong' };
  }
  if (name.length < 3) {
    return { valid: false, message: 'Nama minimal 3 karakter' };
  }
  if (name.length > 100) {
    return { valid: false, message: 'Nama maksimal 100 karakter' };
  }
  return { valid: true, message: 'Nama valid' };
}

export function validateEmailOnline(email) {
  if (typeof email !== 'string' || email.trim() === '') {
    return { valid: false, message: 'Email tidak boleh kosong' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Format email tidak valid' };
  }
  return { valid: true, message: 'Email valid' };
}

export function validatePhoneOnline(phone) {
  if (typeof phone !== 'string' || phone.trim() === '') {
    return { valid: false, message: 'Nomor HP tidak boleh kosong' };
  }
  if (!phone.startsWith('08')) {
    return { valid: false, message: 'Nomor HP harus diawali 08' };
  }
  if (!/^\d+$/.test(phone)) {
    return { valid: false, message: 'Nomor HP hanya boleh berisi angka' };
  }
  if (phone.length < 10) {
    return { valid: false, message: 'Nomor HP minimal 10 digit' };
  }
  if (phone.length > 13) {
    return { valid: false, message: 'Nomor HP maksimal 13 digit' };
  }
  return { valid: true, message: 'Nomor HP valid' };
}

export function validateBirthDate(dateStr, referenceDate = new Date()) {
  if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { valid: false, message: 'Format tanggal lahir harus YYYY-MM-DD' };
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  const birth = new Date(year, month - 1, day);

  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day
  ) {
    return { valid: false, message: 'Tanggal kalender tidak valid' };
  }

  // Hitung selisih umur
  let age = referenceDate.getFullYear() - birth.getFullYear();
  const monthDiff = referenceDate.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 17) {
    return { valid: false, message: 'Umur pendaftar minimal 17 tahun' };
  }

  return { valid: true, message: 'Tanggal lahir valid (umur memenuhi syarat)' };
}

export function validatePasswordWithSymbol(password) {
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
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password harus mengandung simbol/karakter khusus' };
  }
  return { valid: true, message: 'Password valid' };
}

export function validateConfirmPassword(password, confirmPassword) {
  if (typeof confirmPassword !== 'string' || confirmPassword === '') {
    return { valid: false, message: 'Konfirmasi password tidak boleh kosong' };
  }
  if (password !== confirmPassword) {
    return { valid: false, message: 'Konfirmasi password harus sama dengan password' };
  }
  return { valid: true, message: 'Konfirmasi password cocok' };
}

export function validateOnlineRegistration(data, refDate = new Date()) {
  const nameRes = validateName(data?.name);
  if (!nameRes.valid) return nameRes;

  const emailRes = validateEmailOnline(data?.email);
  if (!emailRes.valid) return emailRes;

  const phoneRes = validatePhoneOnline(data?.phone);
  if (!phoneRes.valid) return phoneRes;

  const birthRes = validateBirthDate(data?.birthDate, refDate);
  if (!birthRes.valid) return birthRes;

  const passRes = validatePasswordWithSymbol(data?.password);
  if (!passRes.valid) return passRes;

  const confirmRes = validateConfirmPassword(data?.password, data?.confirmPassword);
  if (!confirmRes.valid) return confirmRes;

  return { valid: true, message: 'Pendaftaran online berhasil' };
}
