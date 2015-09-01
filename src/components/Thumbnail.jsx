/** @jsx React.DOM */
var React = require('react')

/*
 * Shows image. When you click on
 * an image, shows overlay. 
 */
module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            imageUrl: null,  // large image url 
            thumbnailUrl: null // thumbnail url for image
        };
    },
    // show image that when you click on 
    // shows overlay of image
    render: function() {
        return ( 
           <div className="col-lg-3 col-md-3 col-xs-6 thumb">
             <a className="thumbnail fancybox" href={this.props.imageUrl}>
                <img className="img-responsive" src={this.props.thumbnailUrl} />
             </a>
           </div>
        );
    }  
});

