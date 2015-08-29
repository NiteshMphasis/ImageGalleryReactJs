// set configs for app
var configs = {
     'base_url': 'https://api.flickr.com/services/rest/',
     'per_page': 10,
     'api_key': '4259ba9d328b8baa76efa6a0461cd8b6'
};

var React = require('react'),
    App = require('./components/app')

React.render(
    <App config={configs} />,
    document.body
);