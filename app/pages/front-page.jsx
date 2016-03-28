var React = require('react');
//var StyleSheet = require('scss/pages/FrontPage');

var FrontPage = React.createClass({
    displayName: 'FrontPage',
    mixins: [
    ],
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div className="FrontPage">
                wHoohoo!
            </div>
        );
    }
});


module.exports = FrontPage;
