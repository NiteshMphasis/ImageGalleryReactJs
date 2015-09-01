/** @jsx React.DOM */
var React = require('react'),
    Gallery = require('./Gallery')

/*
 * Mini routing. 
 * Shows default page - image gallery
 */
module.exports = React.createClass({
    getInitialState: function() {
        return {
            pageToRender: "home",
            paramsForPage: {}
        };
    },
    transitionTo: function(page, params) {
        // don't change page
        // same page as before
        if (page == this.state.pageToRender) {
            return false;
        }
        this.setState({
            pageToRender: page,
            paramsForPage: params
        });
    },
    render: function() {
        var f = this.state.pageToRender;
        if (typeof(this[f]) == "function") {
            return this[f](this.state.paramsForPage);
        }
        return this.home();
    },
    // show gallery of images
    home: function(params) {
        return (
            <Gallery config={this.props.config} transitionTo={this.transitionTo} />
        );
    },
});