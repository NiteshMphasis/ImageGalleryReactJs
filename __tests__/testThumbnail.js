jest.dontMock("../src/components/Thumbnail");
var React = require("react/addons"),
   Thumbnail = require("../src/components/Thumbnail"),
   TestUtils = React.addons.TestUtils;
   
/*
 * Tests thumbnail.jsx
 */
describe("Thumbnail", function() {
    var image = {
        id: 1,
        owner: 567,
        secret: '8b27faaaa5',
        server: 5766,
        farm: 6,
        title: 'DSC',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0
    };
    
    var thumbnail = "https://farm" + image.farm + ".staticflickr.com/" + image.server + "/" + image.id + "_" + image.secret + "_q.jpg";
    var image = "https://farm" + image.farm + ".staticflickr.com/" + image.server + "/" + image.id + "_" + image.secret + "_c.jpg";

    var thumbnailbox = TestUtils.renderIntoDocument(
        <Thumbnail imageUrl={image} thumbnailUrl={thumbnail} />
    );
  
    // test that renders image with correct src
    it ('should render an image', function () {
        var img = TestUtils.findRenderedDOMComponentWithTag(thumbnailbox, 'img');
        var imgNode = React.findDOMNode(img);
        expect(imgNode.src).toEqual(thumbnail);
    });
  
    // tests that renders image that links to larger image
    it ('should render an image that links to larger image', function () {
        var link = TestUtils.findRenderedDOMComponentWithTag(thumbnailbox, 'a');
        var linkNode = React.findDOMNode(link);
        expect(linkNode.href).toEqual(image);
    });      
});

