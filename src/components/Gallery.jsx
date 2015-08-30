/** @jsx React.DOM */
var React = require('react')
    Pager = require('./Pager'),
    ThumbnailList = require('./ThumbnailList'),
    Search = require('./Search'),
    $ = require('jquery')

/*
 * Fetches and shows list of images
 * from flickr api
 */
module.exports = React.createClass({
    getInitialState: function() {
        return {
            stopFetching: false,
            loading: true,
            error: false,
            page: 1,
            data: [],
            search: 'soccer'
        };
    },
    getDefaultProps: function () {
        return {
            config: {
                'base_url': 'https://api.flickr.com/services/rest/',
                'per_page': 10,
                'search': 'soccer',
                'api_key': '4259ba9d328b8baa76efa6a0461cd8b6'
            }
        }  
    },
    changePage: function(page) {
        // keep fetching if transitioning back 
        // to previous page
        var stopFetching = this.state.stopFetching;
        if (page < this.state.page) {
            stopFetching = false;
        }
        if (!stopFetching) {
            this.setState({
                stopFetching: stopFetching,
                loading: true,
                error: false,
                page: page
            });   
        }
    },
    // load images from server
    loadImagesFromServer: function() {
        // don't fetch more items, 
        // because there is none
        if (this.state.stopFetching) {
            return false;
        }
        // api url to send a get request to
        var url = this.props.config.base_url + 
            "?method=flickr.photos.search" + 
            "&tags=" + this.state.search +
            "&api_key=" + this.props.config.api_key + 
            "&page=" + this.state.page +
            "&per_page=" + this.props.config.per_page + 
            "&format=json"; 
            
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            cache: false,
    	    jsonp: 'jsoncallback',
            success: function(data) {
                this.processData(data);
            }.bind(this),
            error: function(xhr, status, err) {
                this.failedProcessingData(xhr,status,err);
            }.bind(this)
        });
    },
    // store data retrieved from the server
    processData: function(data) {
        // if retrieved less data
        // then needed, stop fetching
        var stopFetching = false;
        var photos = data.photos.photo;
        if (photos.length == 0 || photos.length < this.props.config.per_page) {
            stopFetching = true;
        }  
        this.setState({
            stopFetching: stopFetching,
            loading: false,
            error: false,
            data: photos
        });
    },
    // there was an error retrieving the data
    failedProcessingData: function(xhr, status, err) {
        this.setState({ 
            error: true
        });
    },
    componentDidMount: function(nPros, nState) {
        this.loadImagesFromServer();
    },
    componentDidUpdate: function(oPros, oState) {
        // only change if fetching new
        // api page
        if (oState.page == this.state.page && oState.search == this.state.search) {
            return false;
        }
        this.loadImagesFromServer();
    },
    // search a tag
    setSearchValue: function (search) {
        if (search != this.state.search) {
            this.setState({
                stopFetching: false,
                loading: true,
                error: false,
                search: search,
                page: 1
            });
        }
    },
    render: function() {
        // there was an error making the request
        if (this.state.error) {
            return (
                <div id="image-gallery" className="container">
                    <div className = "row">
                        <div className = "col-md-12">
                            <p>
                                Error making request. Please try again later.
                            </p>
                        </div>
                    </div>
                </div>
            );  
        }
        // no error, display
        return (
            <div id="image-gallery" className="container">
                <div className="header">
                    <Pager page={this.state.page} changePage={this.changePage} noNextPage={this.state.stopFetching} />
                    <h1 className="page-header">Gallery</h1>
                </div>
                <Search searchValue={this.state.search} setSearchValue={this.setSearchValue} />
                <ThumbnailList images={this.state.data} loading={this.state.loading} />
            </div>
        );
    }
});