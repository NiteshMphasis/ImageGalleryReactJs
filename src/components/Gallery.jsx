/** @jsx React.DOM */
var React = require('react')
    Pager = require('./Pager'),
    ThumbnailList = require('./ThumbnailList'),
    Search = require('./Search'),
    $ = require('jquery')

/*
 * Fetches and shows list of images
 * from flickr api
 * by default search tag = soccer
 */
module.exports = React.createClass({
    getInitialState: function() {
        return {
            stopFetching: false,
            loading: true,
            error: false,
            page: 1,
            data: [],
            search: null
        };
    },
    getDefaultProps: function () {
        return {
            config: {
                'base_url': 'https://api.flickr.com/services/rest/',
                'per_page': 10,
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
            "&safe_search=1" + 
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
        if (!photos || photos.length == 0) {
            return;
        }
        else if (photos.length < this.props.config.per_page) {
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
    componentDidUpdate: function(oPros, oState) {
        // only change if fetching new
        // api page or changed search term
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
        if (this.state.error === true) {
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
        // there was a search term, show pager, search box
        // and image list
        if (this.state.search !== null) { 
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
        else
        {
            // no search term, don't show pager or image list
            return (
                 <div id="image-gallery" className="container">
                    <div className="header">
                        <h1 className="page-header">Gallery</h1>
                    </div>
                    <Search setSearchValue={this.setSearchValue} />
                     <p align = "center">
                            What are you looking for? Search for photos.
                     </p>
                 </div>
            );
        }
    }
});