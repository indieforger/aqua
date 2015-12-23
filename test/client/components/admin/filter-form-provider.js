'use strict';
const Code = require('code');
const Provider = require('../../../../client/components/admin/filter-form-provider.jsx');
const Lab = require('lab');
const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');


const lab = exports.lab = Lab.script();


lab.experiment('Filter Form Provider', () => {

    lab.test('it renders', (done) => {

        const ProviderEl = React.createElement(Provider, {});
        const form = ReactTestUtils.renderIntoDocument(ProviderEl);

        Code.expect(form).to.exist();

        done();
    });
});
