import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'common';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  background-color: white;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 1rem 0 3rem;

  @media (max-width: 932px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  background-color: ${COLORS.LIGHTGRAY};
`;

export const TextContent = styled.div`
  max-width: 600px;
`;

export const LoadingScreen = styled.div`
  min-height: 90vh;
`;

export const Instructions = styled(Typography)`
  padding-bottom: 30px;
`;

export const SelectionSection = styled(({ show, children, ...props }) =>
  show === 'HIDE' ? null : <section {...props}>{children}</section>,
)`
  opacity: ${props => (props.show === 'DIM' ? 0.5 : 1.0)};
  position: relative;
  padding-bottom: 20px;
`;
