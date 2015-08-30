/** @jsx React.DOM */
var React = require('react')
/*
 * Simple pager component.
 * Shows next/back buttons
 * allowing user to navigate to different
 * pages
 */
module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            noNextPage: false, // no more pages to fetch
            page: 1 // page that we are on
        };
    },
    handleNext: function() {
        // go forward
        this.props.changePage(this.props.page + 1);
    },
    handlePrev: function() {
        // go back
        var newpage = this.props.page - 1;
        if (newpage >= 0) {
            this.props.changePage(newpage);
        }
    },
    render: function() {
        // if this is the first page
        // show next button don't show back button
        if (this.props.page == 1) {
            if (this.props.noNextPage) {
                return null;
            }
            return (
                <nav>
                    <ul className ="pager">
                        <li><a href="#" onClick={this.handleNext} className="next-link">Next</a></li>
                    </ul>
                </nav>
            );
        }
        else 
        { 
            // do not render next page button if there is no next page
            if (this.props.noNextPage) {
                return (
                    <nav>
                        <ul className="pager">
                            <li><a href="#" onClick={this.handlePrev} className="prev-link">Previous</a></li>
                        </ul>
                    </nav>
                );
          
            }
            else
            {
                return (
                    <nav>
                        <ul className="pager">
                            <li><a href="#" onClick={this.handlePrev} className="prev-link">Previous</a></li>
                            <li><a href="#" onClick={this.handleNext} className="next-link">Next</a></li>
                        </ul>
                    </nav>
                );
            }
        }
    }
});