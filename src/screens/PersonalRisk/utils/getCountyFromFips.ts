import _ from 'lodash';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';

export const getCountyFromFips = (fips: string) => {
  let countyObj: Record<string, any> | null = null;

  if (fips) {
    const stateObj = _.find(
      US_STATE_DATASET.state_dataset as Record<string, any>,
      ['state_fips_code', fips.substring(0, 2)],
    );
    countyObj = _.find(
      (US_STATE_DATASET.state_county_map_dataset as Record<string, any>)[
        stateObj.state_code
      ].county_dataset,
      ['full_fips_code', fips],
    );
  }
  console.log('countyObj', countyObj);
  return countyObj;
};
