jest.dontMock('../src/components/Pager');
var React = require('react/addons'),
      Pager = require('../src/components/Pager'),
      TestUtils = React.addons.TestUtils;
      
// tests Pager.jsx
describe('Pager', function() {
    // tests that no previous button is rendered if page number = 1
    it('should not render a previous button if page number = 1', function () {
        var page = 1;
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} />
        );
        var prev = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'prev-link');
        expect(prev.length).toEqual(0); 
    });
    
    // tests that a next button is rendered if page number = 1
    it('should render a next button if page number = 1', function () {
        var page = 1;
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} />
        );
        var next = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'next-link');
        expect(next.length).toEqual(1); 
    });
    
    // tests that a previous button is rendered if page number > 1
    it('should render a previous button if page number > 1', function () {
        var page = 2;
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} />
        );
        var prev = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'prev-link');
        expect(prev.length).toEqual(1); 
    });
    
    // tests that a next button is rendered if page number > 1
    it('should render a next button if page number > 1', function () {
        var page = 2;
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} />
        );
        var next = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'next-link');
        expect(next.length).toEqual(1); 
    });
    
    // tests that when click next button
    // goes forward a page
    it('clicking the next button should go forward one page', function () {
        var page = 2;
        var changePageFunction = jest.genMockFunction();
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} changePage={changePageFunction} />
        );
        var next = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'next-link');
        TestUtils.Simulate.click(next[0]);
        expect(changePageFunction).toBeCalledWith(3);
    });

    // tests that when click previous button
    // goes back a page
    it('clicking previous button should go back a page', function () {
        var page = 2;
        var changePageFunction = jest.genMockFunction();
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} changePage={changePageFunction} />
        );
        var prev = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'prev-link');
        TestUtils.Simulate.click(prev[0]);
        expect(changePageFunction).toBeCalledWith(1);
    });
    
    // Tests that if noNextPage = true, previous button is still rendered
    // as long as page > 1
    it('if noNextPage = true should still render prev button', function () {
        var page = 2;
        var noNext = true;
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} noNextPage={noNext}/>
        );
        var prev = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'prev-link');
        expect(prev.length).toEqual(1);
    });
    
    // tests that next button not rendered if noNextPage = true
    it('should not render next button if noNextPage = true', function () {
        var page = 2;
        var noNext = true;
        var pager = TestUtils.renderIntoDocument(
            <Pager page={page} noNextPage={noNext} />
        );
        var next = TestUtils.scryRenderedDOMComponentsWithClass(
            pager, 'next-link');
        expect(next.length).toEqual(0);    
    });
});
