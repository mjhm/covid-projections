import React from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

export const StyledRiskDisplay = styled(Box)`
  margin-bottom: 0.5rem;
  display: flex;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  border: solid 1px black;
  text-align: center;
`;

export const StyledRiskInfo = styled(({ width, ...props }) => (
  <Typography {...props} />
))<{
  width?: number;
}>`
  width: ${props => props.width || '30%'};
`;

export const StyledRiskInfoLabel = styled(Typography)`
  text-align: left;
  padding-left: 20px;
  width: 30%;
`;
