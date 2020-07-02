import _ from 'lodash';

export const countyProbability = (projections: any): number | null => {
  if (!projections || !projections.county) return null;
  console.log('projections', projections);
  if (!projections.baseline) return 0;
  const { actualTimeseries } = projections.baseline;
  const { population } = projections.county;
  const iLastDate = _.findLastIndex(
    actualTimeseries,
    (item: any) => item !== null,
  );
  console.log('iLastDate', iLastDate);
  const curWeekDeaths =
    actualTimeseries[iLastDate].cumulativeDeaths -
    actualTimeseries[iLastDate - 7].cumulativeDeaths;
  const curWeekCases =
    actualTimeseries[iLastDate].cumulativeConfirmedCases -
    actualTimeseries[iLastDate - 7].cumulativeConfirmedCases;

  console.log('curWeekCases', curWeekCases);
  console.log('basic week probability', curWeekCases / population);

  return curWeekCases / population;
};
