import _ from 'lodash';

// From https://www2.census.gov/programs-surveys/demo/tables/families/time-series/households/hh4.xls
const hhSizeDist = [
  [1, 0.283708848],
  [2, 0.345103011],
  [3, 0.150677793],
  [4, 0.12764915],
  [5, 0.057777709],
  [6, 0.022624223],
  [7, 0.012459266],
];

// Various sources range from 0.1 to 0.4
const rateOfHouseholdInfection = 0.2;

export const probNonHouseholdInfection = (
  baselineProbability: number,
  rateOfHouseholdInfection: number,
  hhSizeDistribution: number[][],
) =>
  baselineProbability /
  _.sumBy(
    hhSizeDistribution,
    ([hhSize, hhSizeFraction]) =>
      (1 + (hhSize - 1) * rateOfHouseholdInfection) * hhSizeFraction,
  );

export const calcHouseholdProbability = (
  baselineProbability: number,
  hhSize: number,
) => {
  console.log('hhSize', hhSize);
  if (hhSize === 0) return null;
  const pn = probNonHouseholdInfection(
    baselineProbability,
    rateOfHouseholdInfection,
    hhSizeDist,
  );
  return pn * (1 + (hhSize - 1) * rateOfHouseholdInfection);
};
