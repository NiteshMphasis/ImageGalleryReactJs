/** @jsx React.DOM */
var React = require('react'),
    Thumbnail = require('./Thumbnail')
/* 
 * Show list of images
 */
module.exports = React.createClass({ 
    getDefaultProps: function () {
        return {
            images: null,
            loading: true
        };
    },
    flickrPhotoUrl: function(image, size_text) {
        // map flickr size text to letter
        // flickr accepts
        var sizeToLetterMap = {
              small_square: 's',
              large_square: 'q',
              thumbnail: 't',
              small_240: 'm',
              small_320: 'n',
              medium_640: 'z',
              medium_800: 'c',
              large_1024: 'b',
              large_1600: 'h',
              large_2048: 'k',
              original: 'o'
        };
        // retrieve the letter for the size text
        var size = sizeToLetterMap[size_text];
        return "https://farm" + image.farm + ".staticflickr.com/" + image.server + "/" + image.id + "_" + image.secret + "_" + size + ".jpg"  
    },
    // show list of images
    render: function() {
        var that = this;
        // show loading or no images found text when there are 
        // no images or images are being fetched
        if (this.props.loading || !this.props.images || (this.props.images && this.props.images.length < 1)) {
            return (
                <div className = "row imagelist">
                    <div className ="col-md-12">
                        {this.props.loading ? 'Loading...' : 'No images were found.'}
                    </div>
                </div>
            )
        }
        // show list of images since there are images to
        // display
        if (this.props.images && this.props.images.length) {
            var images = this.props.images;
            var that = this;
            var imageNodes = images.map(function (image) {
                var large_image = that.flickrPhotoUrl(image, 'medium_800');
                var thumbnail = that.flickrPhotoUrl(image, 'large_square');
                return (
                    <Thumbnail imageUrl={large_image} thumbnailUrl={thumbnail} key={image.id} />
                );
            });
            return (
                <div className="row imagelist">
                    {imageNodes}
                </div>
            );
        }
        return null;
    }
});