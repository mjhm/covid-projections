/* eslint-disable no-empty-pattern */
import React from 'react';
import _ from 'lodash';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
} from '@material-ui/core';

import { SelectionSection } from '../PersonalRisk.style';

import {
  StyledRadio,
  StyledRadioGroup,
  StyledFormControl,
} from './HouseholdSizeSelection.style';
import RiskDisplay from '../RiskDisplay/RiskDisplay';

interface HouseholdSizeSelectionProps {
  probability: number | null;
  hhSize: number;
  setHhSize(hhSize: string): void;
}

const HHRadio = ({ hhSize, current }: { hhSize: string; current: string }) => {
  const value = hhSize.replace(/\D/g, '');
  return (
    <StyledRadio
      checked={value === current}
      value={value}
      control={<Radio />}
      label={hhSize}
    />
  );
};

const HouseholdSizeSelection = (props: HouseholdSizeSelectionProps) => {
  const handleChange = ({}, result: string) => {
    console.log('result', result);
    props.setHhSize(result);
  };
  console.log('hhsize probability', props.probability);

  // if (props.show === 'HIDE') return null;
  const hhSizeStr = props.hhSize.toString();

  return (
    <>
      {_.isNull(props.probability) ? null : (
        <RiskDisplay
          label="Risk Including Household Size"
          probability={props.probability}
        />
      )}
      <StyledFormControl>
        <Typography component="legend">
          How many people are living in your home this week?
        </Typography>
        <StyledRadioGroup
          aria-label="hhsize"
          name="hhsize"
          onChange={handleChange}
        >
          <HHRadio hhSize="1" current={hhSizeStr} />
          <HHRadio hhSize="2" current={hhSizeStr} />
          <HHRadio hhSize="3" current={hhSizeStr} />
          <HHRadio hhSize="4" current={hhSizeStr} />
          <HHRadio hhSize="5" current={hhSizeStr} />
          <HHRadio hhSize="6" current={hhSizeStr} />
          <HHRadio hhSize="7 or more" current={hhSizeStr} />
        </StyledRadioGroup>
      </StyledFormControl>
    </>
  );
};

export default HouseholdSizeSelection;
