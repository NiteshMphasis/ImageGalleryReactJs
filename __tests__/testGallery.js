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
         'base_url': 'https://api.flickr.com/services/rest/?method=flickr.photos.search',
         'per_page': 10,
         'default_tag': 'soccer',
         'api_key': '4259ba9d328b8baa76efa6a0461cd8b6'
    };
    
    var gallery = TestUtils.renderIntoDocument(
        <Gallery config={config} />
    );
    
    it ('should render a Pager', function () {
        var li = TestUtils.scryRenderedComponentsWithType(gallery, Pager);
        expect(li.length).toEqual(1);
    });
    
    it ('should render a ThumbnailList', function () {
        var li = TestUtils.scryRenderedComponentsWithType(gallery, ThumbnailList);
        expect(li.length).toEqual(1);
    });
    
    it ('should render a Search', function () {
        var li = TestUtils.scryRenderedComponentsWithType(gallery, Search);
        expect(li.length).toEqual(1);
    });
});