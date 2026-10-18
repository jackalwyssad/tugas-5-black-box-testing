/**
 * Validator Pendaftaran Mahasiswa (Soal 3)
 * Spesifikasi:
 * - Nilai Ujian: 0-100
 * - IPK: 0.0-4.0
 * - Semester: 1-14
 */

export function validateExamScore(score) {
  if (score === null || score === undefined || score === '' || isNaN(Number(score))) {
    return { valid: false, message: 'Nilai ujian harus berupa angka' };
  }
  const numericScore = Number(score);
  if (numericScore < 0) {
    return { valid: false, message: 'Nilai ujian minimal 0' };
  }
  if (numericScore > 100) {
    return { valid: false, message: 'Nilai ujian maksimal 100' };
  }
  return { valid: true, message: 'Nilai ujian valid' };
}

export function validateGPA(gpa) {
  if (gpa === null || gpa === undefined || gpa === '' || isNaN(Number(gpa))) {
    return { valid: false, message: 'IPK harus berupa angka' };
  }
  const numericGPA = Number(gpa);
  if (numericGPA < 0.0) {
    return { valid: false, message: 'IPK minimal 0.0' };
  }
  if (numericGPA > 4.0) {
    return { valid: false, message: 'IPK maksimal 4.0' };
  }
  return { valid: true, message: 'IPK valid' };
}

export function validateSemester(semester) {
  if (semester === null || semester === undefined || semester === '' || isNaN(Number(semester))) {
    return { valid: false, message: 'Semester harus berupa angka' };
  }
  const numericSemester = Number(semester);
  if (!Number.isInteger(numericSemester)) {
    return { valid: false, message: 'Semester harus berupa bilangan bulat' };
  }
  if (numericSemester < 1) {
    return { valid: false, message: 'Semester minimal 1' };
  }
  if (numericSemester > 14) {
    return { valid: false, message: 'Semester maksimal 14' };
  }
  return { valid: true, message: 'Semester valid' };
}

export function validateStudentRegistration(data) {
  const scoreCheck = validateExamScore(data?.examScore);
  if (!scoreCheck.valid) return scoreCheck;

  const gpaCheck = validateGPA(data?.gpa);
  if (!gpaCheck.valid) return gpaCheck;

  const semCheck = validateSemester(data?.semester);
  if (!semCheck.valid) return semCheck;

  return { valid: true, message: 'Pendaftaran mahasiswa berhasil' };
}
