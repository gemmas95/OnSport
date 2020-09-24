import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavComponent from './NavComponent';

describe('NavComponent', () => {
    const navCompoentTree = renderer.create(
        <Router>
            <NavComponent />
        </Router>
    );
    it('should match', () => {
        expect(navCompoentTree).toMatchSnapshot();
    });
});
