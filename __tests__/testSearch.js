jest.dontMock('../src/components/Search');
var React = require('react/addons'),
    Search = require('../src/components/Search'),
    TestUtils = React.addons.TestUtils;

// tests Search.jsx
describe('Search', function() {
    var goBackMockFunction = jest.genMockFunction();
    var search = "soccer";
    var searchbox = TestUtils.renderIntoDocument(
        <Search searchValue={search} setSearchValue={goBackMockFunction} />
    );
    
    // checks renders search box
    it('renders 1 div', function() {
        var items = TestUtils.scryRenderedDOMComponentsWithClass(searchbox, 'searchbox');
        expect(items.length).toEqual(1);
    });
    
    // checks that when submit search form, calls handleSubmit function
    it('when click on submit button setSearchValue function should be called', function() {
        var form = TestUtils.findRenderedDOMComponentWithTag(searchbox, 'form');
        var input = TestUtils.findRenderedDOMComponentWithTag(searchbox, 'input');
        React.findDOMNode(input).value = "foo";
        TestUtils.Simulate.submit(form);
        expect(goBackMockFunction).toBeCalled();
    }); 
});
