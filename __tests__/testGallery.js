jest.dontMock('../src/components/Gallery');
var React = require('react/addons'),
    Pager = require('../src/components/Pager'),
    ThumbnailList = require('../src/components/ThumbnailList'),
    Search = require('../src/components/Search'),
    Gallery = require('../src/components/Gallery'),
    TestUtils = React.addons.TestUtils;
    
/*
 * Tests Gallery.jsx 
 */
describe('Gallery', function() {
    var config = {
         'base_url': 'https://api.flickr.com/services/rest/',
         'per_page': 10,
         'api_key': '4259ba9d328b8baa76efa6a0461cd8b6'
    };
    
    var gallery = TestUtils.renderIntoDocument(
        <Gallery config={config} />
    );
    
    // tests Gallery without a search temr
    // shouldn't render a Pager or Image List
    describe ('Gallery without search term', function() {
        // tests renders Search box
        it ('should render a Search', function () {
            var li = TestUtils.scryRenderedComponentsWithType(gallery, Search);
            expect(li.length).toEqual(1);
        });
        
        // should not render a Pager
        it ('should not render a Pager', function () {
            var li = TestUtils.scryRenderedComponentsWithType(gallery, Pager);
            expect(li.length).toEqual(0);
        });

        // tests not render a ThumbnailList
        it ('should render a ThumbnailList', function () {
            var li = TestUtils.scryRenderedComponentsWithType(gallery, ThumbnailList);
            expect(li.length).toEqual(0);
        });  
    });
    
    // tests Gallery with search term set
    // should render Pager and Search Box and ImageList
    describe ('Gallery with search term', function() {
        // tests renders Search box
        it ('should render a Search box', function () {
            gallery.setSearchValue('test');
            expect(gallery.state.search).toEqual('test');
            var li = TestUtils.scryRenderedComponentsWithType(gallery, Search);
            expect(li.length).toEqual(1);
        });
    
        // should render a Pager
        it ('should render a Pager', function () {
            gallery.setSearchValue('test');
            expect(gallery.state.search).toEqual('test');
            var li = TestUtils.scryRenderedComponentsWithType(gallery, Pager);
            expect(li.length).toEqual(1);
        });

        // tests renders a ThumbnailList
        it ('should render a ThumbnailList', function () {
            gallery.setSearchValue('test');
            expect(gallery.state.search).toEqual('test');
            var li = TestUtils.scryRenderedComponentsWithType(gallery, ThumbnailList);
            expect(li.length).toEqual(1);
        }); 
    });
});