import _ from 'lodash';

// Davies, N.G., Klepac, P., Liu, Y. et al.
// Age-dependent effects in the transmission and control of COVID-19 epidemics.
// Nat Med (2020). https://doi.org/10.1038/s41591-020-0962-9
// https://www.nature.com/articles/s41591-020-0962-9/figures/8
// Population Data from: https://www.statista.com/statistics/241488/population-of-the-us-by-sex-and-age/
// prettier-ignore
export const ageGroupStats: Record<string, any> = {
  a: { label: '0-9', susceptibility: 0.4, clinical: 0.29, population: 40.01 },
  b: { label: '10-19', susceptibility: 0.38, clinical: 0.21, population: 41.97 },
  c: { label: '20-29', susceptibility: 0.79, clinical: 0.27, population: 45.43 },
  d: { label: '30-39', susceptibility: 0.86, clinical: 0.33, population: 43.69 },
  e: { label: '40-49', susceptibility: 0.8, clinical: 0.4, population: 40.46 },
  g: { label: '50-59', susceptibility: 0.82, clinical: 0.49, population: 42.83 },
  h: { label: '60-69', susceptibility: 0.88, clinical: 0.63, population: 37.41 },
  // i: { label: '70+', susceptibility: 0.74, clinical: 0.69, population: 35.34 },
  i: { label: '70+', susceptibility: 0.88, clinical: 0.69, population: 35.34 },
};

const popTotal = _.sumBy(
  _.values(ageGroupStats),
  ({ population }) => population,
);

const normalization =
  1.0 /
  _.sumBy(
    _.values(ageGroupStats),
    elem => (elem.susceptibility * elem.clinical * elem.population) / popTotal,
  );

export const calcAgeGroupProbability = (
  baseProbability: number,
  ageGp: string,
) => {
  if (ageGp === '') return null;
  const agstat = ageGroupStats[ageGp];
  return (
    baseProbability * normalization * agstat.susceptibility * agstat.clinical
  );
};
