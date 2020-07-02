const {
  probNonHouseholdInfection,
  calcHouseholdProbability,
} = require('./householdProbability');

describe('probNonHouseholdInfection', () => {
  const baseInput = {
    label: '',
    expected: 1.0,
    baselineProbability: 1.0,
    rateOfHouseholdInfection: 0.0,
    hhSizeDistribution: [
      [1, 0.5],
      [2, 0.5],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
    ],
  };
  const testInputs = [baseInput];

  testInputs.forEach(input => {
    const {
      label,
      expected,
      baselineProbability,
      rateOfHouseholdInfection,
      hhSizeDistribution,
    } = input;
    it(`${label} should be ${expected}`, () => {
      expect(
        probNonHouseholdInfection(
          baselineProbability,
          rateOfHouseholdInfection,
          hhSizeDistribution,
        ),
      ).toEqual(expected);
    });
  });
});
