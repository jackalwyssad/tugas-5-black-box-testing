/**
 * Validator Transfer Bank (Soal 4)
 * Spesifikasi:
 * - Nominal Transfer: Rp10.000 - Rp100.000.000
 * - Biaya Admin: Rp2.500 (fixed)
 * - Saldo Minimal: Rp50.000
 */

export const ADMIN_FEE = 2500;
export const MIN_BALANCE = 50000;
export const MIN_TRANSFER = 10000;
export const MAX_TRANSFER = 100000000;

export function validateTransferAmount(amount) {
  if (amount === null || amount === undefined || amount === '' || isNaN(Number(amount))) {
    return { valid: false, message: 'Nominal transfer harus berupa angka' };
  }
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return { valid: false, message: 'Nominal transfer harus lebih besar dari 0' };
  }
  if (numericAmount < MIN_TRANSFER) {
    return { valid: false, message: `Nominal transfer minimal Rp${MIN_TRANSFER.toLocaleString('id-ID')}` };
  }
  if (numericAmount > MAX_TRANSFER) {
    return { valid: false, message: `Nominal transfer maksimal Rp${MAX_TRANSFER.toLocaleString('id-ID')}` };
  }
  return { valid: true, message: 'Nominal transfer valid' };
}

export function validateTransferWithBalance(amount, currentBalance) {
  const amountCheck = validateTransferAmount(amount);
  if (!amountCheck.valid) return amountCheck;

  const numericAmount = Number(amount);
  const numericBalance = Number(currentBalance);

  if (isNaN(numericBalance)) {
    return { valid: false, message: 'Saldo pengirim tidak valid' };
  }

  const totalRequired = numericAmount + ADMIN_FEE;
  const remainingBalance = numericBalance - totalRequired;

  if (remainingBalance < MIN_BALANCE) {
    return {
      valid: false,
      message: `Saldo tidak mencukupi untuk menyisakan saldo minimal Rp${MIN_BALANCE.toLocaleString('id-ID')} setelah biaya admin Rp${ADMIN_FEE.toLocaleString('id-ID')}`,
      remainingBalance
    };
  }

  return {
    valid: true,
    message: 'Transfer berhasil diproses',
    amount: numericAmount,
    adminFee: ADMIN_FEE,
    totalDeduction: totalRequired,
    remainingBalance
  };
}
