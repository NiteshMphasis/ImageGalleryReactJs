jest.dontMock('../src/components/App');
var React = require('react/addons'),
   Gallery = require('../src/components/Gallery'),
   App = require('../src/components/App'),
   TestUtils = React.addons.TestUtils;

/**
 * Tests app.jsx
 */
describe('App', function() {
    var config = {
         'base_url': 'https://api.flickr.com/services/rest/',
         'per_page': 10,
         'default_tag': 'soccer',
         'api_key': '4259ba9d328b8baa76efa6a0461cd8b6'
    };
    
    // render app component into document
    var app = TestUtils.renderIntoDocument(
        <App config={config} />
    );

    // tests that renders Gallery component by default
    it('should render Gallery component by default', function() {
         var pages = TestUtils.scryRenderedComponentsWithType(app, Gallery);
         expect(pages.length).toEqual(1);
    });
    
    // tests renders Gallery component when called
    it('should render Gallery component when called', function() {
        app.transitionTo('home');
        var pages = TestUtils.scryRenderedComponentsWithType(app, Gallery);
        expect(pages.length).toEqual(1);
    });
});
