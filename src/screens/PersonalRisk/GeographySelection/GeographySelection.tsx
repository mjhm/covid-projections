import React from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';

import { StyledGeographySelection } from './GeographySelection.style';
import { SelectionSection } from '../PersonalRisk.style';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';
import RiskDisplay from '../RiskDisplay/RiskDisplay';
import { getCountyFromFips } from '../utils/getCountyFromFips';

interface GeographySelectionProps {
  probability: number | null;
  fips: string;
  setFips(fips: string): void;
}

const GeographySelection = (props: GeographySelectionProps) => {
  const handleChange = (result: any) => {
    console.log('result', result);
    props.setFips(result.full_fips_code || '');
  };

  const countyObj = getCountyFromFips(props.fips);
  const initialInputValue = countyObj
    ? countyObj.county + ', ' + countyObj.state_code
    : '';

  return (
    <>
      {_.isNull(props.probability) ? null : (
        <RiskDisplay
          label="Geographic County Risk"
          probability={props.probability}
        />
      )}
      <GlobalSelector
        placeholder="What county do you live in?"
        extendRight={true}
        handleChange={handleChange}
        includeStates={false}
        initialInputValue={initialInputValue}
      />
    </>
  );
};

export default GeographySelection;
