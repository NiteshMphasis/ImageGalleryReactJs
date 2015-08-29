/** @jsx React.DOM */
var React = require('react')

/* 
 * Search box. Specify a search 
 * value to search for photos
 */
module.exports = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var search = React.findDOMNode(this.refs.search).value.trim();
        if (!search) {
            return;
        }
        this.props.setSearchValue(search);
        return;
    },
    render: function() {
        return ( 
           <div className ="searchbox">
               <form method="post" className="searchForm form-inline" onSubmit={this.handleSubmit} role="form">
                    <div className="form-group">
                        <input type="text" className="form-control" ref="search" placeholder="Search for photos..." name="search" /> <button type="submit" className="btn btn-default">Search</button>
                    </div>
                </form>
           </div>
        );
    }  
});

