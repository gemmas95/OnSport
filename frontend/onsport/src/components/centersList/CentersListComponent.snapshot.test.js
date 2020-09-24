import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CentersListComponent from './CentersListComponent';

describe('CenterListComponent', () => {
    const centersListComponentTree = renderer.create(
        <Router>
            <CentersListComponent />
        </Router>
    );
    it('should match', () => {
        expect(centersListComponentTree).toMatchSnapshot();
    });
});
