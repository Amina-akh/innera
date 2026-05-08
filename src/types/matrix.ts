export type MatrixCellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type MatrixGrid = [
  [MatrixCellValue, MatrixCellValue, MatrixCellValue],
  [MatrixCellValue, MatrixCellValue, MatrixCellValue],
  [MatrixCellValue, MatrixCellValue, MatrixCellValue],
];

export interface NumerologyResult {
  lifePath: number;
  moneyCode: number;
  loveCode: number;
  karma: number;
  sourceDigits: number[];
  workNumbers: [number, number, number, number];
  workDigits: number[];
  frequencies: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, number>;
  matrix: MatrixGrid;
}
