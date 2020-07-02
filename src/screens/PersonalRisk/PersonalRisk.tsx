import React from 'react';
import { useQueryState } from 'react-router-use-location-state';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import Typography from '@material-ui/core/Typography';
import GeographySelection from './GeographySelection/GeographySelection';
import HouseholdSizeSelection from './HouseholdSizeSelection/HouseholdSizeSelection';
import AgeGroupSelection from './AgeGroupSelection/AgeGroupSelection';
import { useProjections } from 'common/utils/model';
import { getCountyFromFips } from './utils/getCountyFromFips';
import { countyProbability } from './utils/countyProbability';
import { calcHouseholdProbability } from './utils/householdProbability';
import { calcAgeGroupProbability } from './utils/ageGroupProbability';

import {
  Wrapper,
  Content,
  Header,
  Instructions,
  SelectionSection,
} from './PersonalRisk.style';

// Filter to present user with the current question and dim all the
// answered questions.
const filterSelectionComponents = (
  pairs: Array<{ predicate: () => boolean; component: JSX.Element }>,
) => {
  const result: JSX.Element[] = [];
  let prevComponent: JSX.Element | null = null;
  pairs.forEach(({ predicate, component }, index) => {
    console.log('predicate', predicate());
    if (predicate()) {
      if (result.length === 0) {
        result.push(
          <SelectionSection show="SHOW">{prevComponent}</SelectionSection>,
        );
      }
      result.push(
        <SelectionSection show={index === 0 ? 'SHOW' : 'DIM'}>
          {component}
        </SelectionSection>,
      );
    }
    prevComponent = component;
  });
  if (result.length === 0) {
    result.push(
      <SelectionSection show="SHOW">{prevComponent}</SelectionSection>,
    );
  }
  console.log('filter result', result);
  return result;
};

const PersonalRisk = () => {
  const [fips, setFips] = useQueryState('fips', '');
  const [hhSize, setHhSize] = useQueryState('hhSize', '0');
  const [ageGp, setAgeGp] = useQueryState('ageGp', '');

  const countyObj = getCountyFromFips(fips);

  const projections = useProjections(
    fips === '' ? 'AZ' : (countyObj || {}).state_code,
    countyObj,
  ) as any;

  const baselineCountyProbability = countyProbability(projections);

  const householdProbability = calcHouseholdProbability(
    baselineCountyProbability || 0,
    parseInt(hhSize, 10),
  );

  const ageGroupProbability = calcAgeGroupProbability(
    householdProbability || baselineCountyProbability || 0,
    ageGp,
  );

  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/personal-risk"
        pageTitle="Personal Risk"
        pageDescription="Estimator for personal risk of contracting Covid 19."
      />
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            One Week Personal Risk Estimation
          </Typography>
        </Content>
      </Header>
      <Content>
        <Instructions>
          These questions attempt to estimate your personal risk of infection of
          Covid-19 over the next week. The answer to each will refine the risk
          calculation. However note that the contribution of each risk factor
          involves guesses of their effects, and many risk factors are not taken
          into account. So please use your own judgement about whatever
          precautions you choose to take to avoid illness.
        </Instructions>
        {filterSelectionComponents([
          {
            predicate: () => ageGp !== '',
            component: (
              <AgeGroupSelection
                probability={ageGroupProbability}
                ageGp={ageGp}
                setAgeGp={ageGp => setAgeGp(ageGp, { method: 'push' })}
              />
            ),
          },
          {
            predicate: () => hhSize !== '0',
            component: (
              <HouseholdSizeSelection
                probability={householdProbability}
                hhSize={parseInt(hhSize, 10)}
                setHhSize={hhSize => setHhSize(hhSize, { method: 'push' })}
              />
            ),
          },
          {
            predicate: () => fips !== '',
            component: (
              <GeographySelection
                probability={baselineCountyProbability}
                fips={fips}
                setFips={fips => setFips(fips, { method: 'push' })}
              />
            ),
          },
        ])}
      </Content>
      <ShareBlock />
    </Wrapper>
  );
};

export default PersonalRisk;
