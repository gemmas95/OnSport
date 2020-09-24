import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FooterComponent from './FooterComponent';

describe('FooterComponent', () => {
    const footerComponentTree = renderer.create(
        <Router>
            <FooterComponent />
        </Router>
    );
    it('should match', () => {
        expect(footerComponentTree).toMatchSnapshot();
    });
});
