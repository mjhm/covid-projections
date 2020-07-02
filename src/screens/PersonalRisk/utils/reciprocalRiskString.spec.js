const { reciprocalRiskString } = require('./reciprocalRiskString');

describe('reciprocoalRiskString', () => {
  const testPairs = [
    [0.02, '1/50'],
    [0.12, '1/8'],
    [0.04, '1/25'],
    [0.08, '1/13'],
    [0.081, '1/12'],
    [0.0000000001, ''],
    [0.00000004, '1/25,000,000'],
    [0.56, ''],
    [0.55, '1/2'],
  ];
  testPairs.forEach(pair => {
    it(`${pair[0]} ==> ${pair[1]}`, () => {
      expect(reciprocalRiskString(pair[0])).toEqual(pair[1]);
    });
  });
});
