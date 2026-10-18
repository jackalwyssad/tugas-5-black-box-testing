import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateExamScore,
  validateGPA,
  validateSemester,
  validateStudentRegistration
} from '../src/validators/studentRegistrationValidator.js';

test('Soal 3 - Boundary Value Analysis Form Pendaftaran Mahasiswa', async (t) => {
  // 1. Nilai Ujian (0 - 100)
  await t.test('Nilai Ujian: min-1 (-1) -> Invalid', () => {
    assert.equal(validateExamScore(-1).valid, false);
  });
  await t.test('Nilai Ujian: min (0) -> Valid', () => {
    assert.equal(validateExamScore(0).valid, true);
  });
  await t.test('Nilai Ujian: min+1 (1) -> Valid', () => {
    assert.equal(validateExamScore(1).valid, true);
  });
  await t.test('Nilai Ujian: max-1 (99) -> Valid', () => {
    assert.equal(validateExamScore(99).valid, true);
  });
  await t.test('Nilai Ujian: max (100) -> Valid', () => {
    assert.equal(validateExamScore(100).valid, true);
  });
  await t.test('Nilai Ujian: max+1 (101) -> Invalid', () => {
    assert.equal(validateExamScore(101).valid, false);
  });

  // 2. IPK (0.0 - 4.0, step 0.1)
  await t.test('IPK: min-1 (-0.1) -> Invalid', () => {
    assert.equal(validateGPA(-0.1).valid, false);
  });
  await t.test('IPK: min (0.0) -> Valid', () => {
    assert.equal(validateGPA(0.0).valid, true);
  });
  await t.test('IPK: min+1 (0.1) -> Valid', () => {
    assert.equal(validateGPA(0.1).valid, true);
  });
  await t.test('IPK: max-1 (3.9) -> Valid', () => {
    assert.equal(validateGPA(3.9).valid, true);
  });
  await t.test('IPK: max (4.0) -> Valid', () => {
    assert.equal(validateGPA(4.0).valid, true);
  });
  await t.test('IPK: max+1 (4.1) -> Invalid', () => {
    assert.equal(validateGPA(4.1).valid, false);
  });

  // 3. Semester (1 - 14)
  await t.test('Semester: min-1 (0) -> Invalid', () => {
    assert.equal(validateSemester(0).valid, false);
  });
  await t.test('Semester: min (1) -> Valid', () => {
    assert.equal(validateSemester(1).valid, true);
  });
  await t.test('Semester: min+1 (2) -> Valid', () => {
    assert.equal(validateSemester(2).valid, true);
  });
  await t.test('Semester: max-1 (13) -> Valid', () => {
    assert.equal(validateSemester(13).valid, true);
  });
  await t.test('Semester: max (14) -> Valid', () => {
    assert.equal(validateSemester(14).valid, true);
  });
  await t.test('Semester: max+1 (15) -> Invalid', () => {
    assert.equal(validateSemester(15).valid, false);
  });

  // Valid full form registration
  await t.test('Form Mahasiswa: Valid Submission', () => {
    const res = validateStudentRegistration({
      examScore: 85,
      gpa: 3.75,
      semester: 5
    });
    assert.equal(res.valid, true);
  });
});
