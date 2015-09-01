jest.dontMock('../src/components/ThumbnailList');
var React = require('react/addons'),
    Image = require('../src/components/Thumbnail'),
    ThumbnailList = require('../src/components/ThumbnailList'),
    TestUtils = React.addons.TestUtils;

describe('ThumbnailList', function() {
    var photos = [
    {
        id: 1,
        owner: 567,
        secret: '8b27faaaa5',
        server: 5766,
        farm: 6,
        title: 'DSC',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0
    }, {
        id: 2,
        owner: 567,
        secret: '7f371c9a78',
        server: 5785,
        farm: 6,
        title: 'DSC_0193',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0
    }];

    var loading = false;
    var thumbnailList = TestUtils.renderIntoDocument(
        <ThumbnailList images={photos} loading={loading} />
    );
    
    // tests that renders 1 div with 2 images
    it('renders 1 div', function() {
        var items = TestUtils.scryRenderedDOMComponentsWithTag(thumbnailList, 'div');
        expect(items.length).toEqual(1);
    });
    
    // tests that renders two images
    it('renders 2 Images', function() {
        var items = TestUtils.scryRenderedComponentsWithType(thumbnailList, Image);
        expect(items.length).toEqual(2);
    });
});