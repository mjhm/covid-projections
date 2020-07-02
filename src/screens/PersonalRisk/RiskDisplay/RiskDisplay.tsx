import React from 'react';
import { reciprocalRiskString } from '../utils/reciprocalRiskString';

import {
  StyledRiskDisplay,
  StyledRiskInfo,
  StyledRiskInfoLabel,
} from './RiskDisplay.style';
import { NE } from 'components/StateSvg';

type RiskDisplayProps = {
  label: string;
  probability: number;
};

const RiskDisplay = (props: RiskDisplayProps) => {
  const percentRisk = (100 * props.probability).toFixed(4);
  const fractionalRisk = reciprocalRiskString(props.probability);
  return (
    <StyledRiskDisplay>
      <StyledRiskInfoLabel>{props.label}</StyledRiskInfoLabel>
      {fractionalRisk ? (
        <>
          <StyledRiskInfo>{fractionalRisk}</StyledRiskInfo>
          <StyledRiskInfo width={'10%'}>or</StyledRiskInfo>
        </>
      ) : null}
      <StyledRiskInfo>{percentRisk}%</StyledRiskInfo>
    </StyledRiskDisplay>
  );
};

export default RiskDisplay;
