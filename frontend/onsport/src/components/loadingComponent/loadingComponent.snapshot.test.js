import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingComponent from './loadingComponent';

describe('LoadingComponent', () => {
    const loadingComponentTree = renderer.create(
        <Router>
            <LoadingComponent />
        </Router>
    );
    it('should match', () => {
        expect(loadingComponentTree).toMatchSnapshot();
    });
});
