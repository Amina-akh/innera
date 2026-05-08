import type { MatrixGrid, NumerologyResult } from "@/types/matrix";

const MASTER_NUMBERS = new Set([11, 22, 33]);

function reduceToNumerologyBase(value: number): number {
  let current = Math.abs(value);
  while (current > 9 && !MASTER_NUMBERS.has(current)) {
    current = current
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current;
}

function parseDateParts(birthDate: string): { year: number; month: number; day: number } {
  const [year, month, day] = birthDate.split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error("Дата рождения должна быть в формате YYYY-MM-DD");
  }

  return { year, month, day };
}

export function generateNumerologyProfile(birthDate: string): NumerologyResult {
  const compact = birthDate.replaceAll("-", "");
  if (!/^\d{8}$/.test(compact)) {
    throw new Error("Некорректная дата рождения");
  }

  const digits = compact.split("").map(Number);
  const sourceDigits = [...digits];
  const frequencies = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  } as Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>;

  const { year, month, day } = parseDateParts(birthDate);

  const firstWorkNumber = digits.reduce((acc, digit) => acc + digit, 0);
  const secondWorkNumber = firstWorkNumber
    .toString()
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
  const dayFirstDigit = Number(String(day).padStart(2, "0")[0]);
  const thirdWorkNumber = Math.abs(firstWorkNumber - dayFirstDigit * 2);
  const fourthWorkNumber = thirdWorkNumber
    .toString()
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);

  const workNumbers: [number, number, number, number] = [
    firstWorkNumber,
    secondWorkNumber,
    thirdWorkNumber,
    fourthWorkNumber,
  ];

  const workDigits = workNumbers
    .flatMap((num) => String(Math.abs(num)).split("").map(Number))
    .filter((digit) => digit !== 0);

  const allDigitsForMatrix = [...sourceDigits.filter((digit) => digit !== 0), ...workDigits];

  for (const digit of allDigitsForMatrix) {
    if (digit >= 1 && digit <= 9) {
      frequencies[digit as keyof typeof frequencies] += 1;
    }
  }

  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  const lifePath = reduceToNumerologyBase(sum);

  let moneyCode = (day * month) % 9;
  if (moneyCode === 0) moneyCode = 9;

  const yearSum = reduceToNumerologyBase(
    year
      .toString()
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0),
  );
  let loveCode = (day + month + yearSum) % 9;
  if (loveCode === 0) loveCode = 9;

  const karma = reduceToNumerologyBase(Math.abs(day - month));

  const matrix: MatrixGrid = [
    [frequencies[1] as MatrixGrid[0][0], frequencies[2] as MatrixGrid[0][1], frequencies[3] as MatrixGrid[0][2]],
    [frequencies[4] as MatrixGrid[1][0], frequencies[5] as MatrixGrid[1][1], frequencies[6] as MatrixGrid[1][2]],
    [frequencies[7] as MatrixGrid[2][0], frequencies[8] as MatrixGrid[2][1], frequencies[9] as MatrixGrid[2][2]],
  ];

  return {
    lifePath,
    moneyCode,
    loveCode,
    karma,
    sourceDigits,
    workNumbers,
    workDigits,
    frequencies,
    matrix,
  };
}
