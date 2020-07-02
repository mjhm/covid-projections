const NEGLIGIBLE_RISK = 0.00000001;

export const reciprocalRiskString = (probability: number) => {
  if (probability < NEGLIGIBLE_RISK) return '';
  if (probability > 0.55) return '';
  return (
    '1/' +
    parseFloat(Math.round(1.0 / probability).toPrecision(2))
      .toLocaleString()
      .replace(/\..*/, '')
  );
};
