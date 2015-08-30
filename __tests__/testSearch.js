jest.dontMock('../src/components/Search');
var React = require('react/addons'),
    Search = require('../src/components/Search'),
    TestUtils = React.addons.TestUtils;

// tests Issue.jsx
describe('Search', function() {
    var goBackMockFunction = jest.genMockFunction();

    var search = "soccer";
    var searchbox = TestUtils.renderIntoDocument(
        <Search searchValue={search} searchPhoto={goBackMockFunction} />
    );
    
    // checks renders 1 issue-page
    it('renders 1 div', function() {
        var items = TestUtils.scryRenderedDOMComponentsWithClass(searchbox, 'searchbox');
        expect(items.length).toEqual(1);
    });
});