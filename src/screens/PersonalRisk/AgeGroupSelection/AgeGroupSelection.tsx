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
import { ageGroupStats } from '../utils/ageGroupProbability';

import { SelectionSection } from '../PersonalRisk.style';

import {
  StyledRadio,
  StyledRadioGroup,
  StyledFormControl,
} from './AgeGroupSelection.style';
import RiskDisplay from '../RiskDisplay/RiskDisplay';

interface AgeGroupSelectionProps {
  probability: number | null;
  ageGp: string;
  setAgeGp(ageGp: string): void;
}

const AgeGroupRadio = ({
  ageGp,
  current,
}: {
  ageGp: string;
  current: string;
}) => {
  const { label } = ageGroupStats[ageGp];
  return (
    <StyledRadio
      checked={ageGp === current}
      value={ageGp}
      control={<Radio />}
      label={label}
    />
  );
};

const AgeGroupSelection = (props: AgeGroupSelectionProps) => {
  const handleChange = ({}, result: string) => {
    console.log('result', result);
    props.setAgeGp(result);
  };
  console.log('ageGp probability', props.probability);

  // if (props.show === 'HIDE') return null;
  const currentAgeGroup = props.ageGp;

  return (
    <>
      {_.isNull(props.probability) ? null : (
        <RiskDisplay
          label="Risk Including Age Group"
          probability={props.probability}
        />
      )}
      <StyledFormControl>
        <Typography component="legend">What's your age group?</Typography>
        <StyledRadioGroup
          aria-label="age group"
          name="age group"
          onChange={handleChange}
        >
          <>
            {_.map(_.keys(ageGroupStats), ageGp => {
              return <AgeGroupRadio ageGp={ageGp} current={currentAgeGroup} />;
            })}
          </>
        </StyledRadioGroup>
      </StyledFormControl>
    </>
  );
};

export default AgeGroupSelection;
