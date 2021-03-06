/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import '../../__mocks__/shallow_usecontext.mock';

import React, { useContext } from 'react';
import { shallow } from 'enzyme';

import { EuiButton as EuiButtonExternal, EuiEmptyPrompt } from '@elastic/eui';

import { APP_SEARCH_PLUGIN, WORKPLACE_SEARCH_PLUGIN } from '../../../../common/constants';
import { AppSearchLogo } from './assets/app_search_logo';
import { WorkplaceSearchLogo } from './assets/workplace_search_logo';

import { NotFound } from './';

describe('NotFound', () => {
  const basicLicense = { isActive: true, type: 'basic' };
  const goldLicense = { isActive: true, type: 'gold' };

  beforeEach(() => {
    (useContext as jest.Mock).mockImplementation(() => ({ license: basicLicense }));
  });

  it('renders an App Search 404 view', () => {
    const wrapper = shallow(<NotFound product={APP_SEARCH_PLUGIN} />);
    const prompt = wrapper.find(EuiEmptyPrompt).dive().shallow();

    expect(prompt.find('h2').text()).toEqual('404 error');
    expect(prompt.find(EuiButtonExternal).prop('href')).toEqual(APP_SEARCH_PLUGIN.SUPPORT_URL);

    const logo = prompt.find(AppSearchLogo).dive().shallow();
    expect(logo.type()).toEqual('svg');
  });

  it('renders a Workplace Search 404 view', () => {
    const wrapper = shallow(<NotFound product={WORKPLACE_SEARCH_PLUGIN} />);
    const prompt = wrapper.find(EuiEmptyPrompt).dive().shallow();

    expect(prompt.find('h2').text()).toEqual('404 error');
    expect(prompt.find(EuiButtonExternal).prop('href')).toEqual(
      WORKPLACE_SEARCH_PLUGIN.SUPPORT_URL
    );

    const logo = prompt.find(WorkplaceSearchLogo).dive().shallow();
    expect(logo.type()).toEqual('svg');
  });

  it('changes the support URL if the user has a gold+ license', () => {
    (useContext as jest.Mock).mockImplementation(() => ({ license: goldLicense }));
    const wrapper = shallow(<NotFound product={APP_SEARCH_PLUGIN} />);
    const prompt = wrapper.find(EuiEmptyPrompt).dive().shallow();

    expect(prompt.find(EuiButtonExternal).prop('href')).toEqual('https://support.elastic.co');
  });

  it('does not render anything without a valid product', () => {
    const wrapper = shallow(<NotFound product={undefined as any} />);

    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
