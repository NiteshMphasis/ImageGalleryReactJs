/** @jsx React.DOM */
var React = require('react')

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            imageUrl: null,
            thumbnailUrl: null
        };
    },
    render: function() {
        return ( 
           <div className ="col-lg-2 col-md-3 col-xs-6 thumb">
             <a className ="thumbnail fancybox" href={this.props.imageUrl}>
                <img className ="img-responsive" src ={this.props.thumbnailUrl} />
             </a>
           </div>
        );
    }  
});

