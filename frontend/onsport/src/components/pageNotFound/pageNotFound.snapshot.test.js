import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
    const pageNotFoundTree = renderer.create(
        <Router>
            <PageNotFound />
        </Router>
    );
    it('should match', () => {
        expect(pageNotFoundTree).toMatchSnapshot();
    });
});
