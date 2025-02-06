export interface ICalculateGradientOutput {
  positiveGradient: number | null;
  negativeGradient: number | null;
  cumulativeGradient: number | null;
}