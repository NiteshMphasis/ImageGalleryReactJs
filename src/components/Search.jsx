/** @jsx React.DOM */
var React = require('react')

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
               <form method = "post" className="form-inline" onSubmit={this.handleSubmit} role="form">
                    <div className="form-group">
                        <input type = "text" className="form-control" ref="search" placeholder = "Search for photos..." /> <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                </form>
           </div>
        );
    }  
});

