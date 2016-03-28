var React = require('react');

var AppTemplate = React.createClass({
    displayName: 'AppTemplate',
    propTypes: {
        children: React.PropTypes.object,
        location: React.PropTypes.object,
        params: React.PropTypes.object,
        serializedFlux: React.PropTypes.string
    },
    mixins: [
    ],
    statics: {

    },
    getInitialState: function() {
        return {
            device: {
                deviceType: 'mobile',
                customVariableSiteType: 'mobileWeb'
            }
        };
    },
    componentDidMount: function() {
        var self = this;
    },
    componentWillUnmount: function() {
        var self = this;

    },
    render: function() {

        return (
            <div id="app-template">

                {React.cloneElement(this.props.children, {
                    params: this.props.params,
                    path: this.props.location.pathname,
                    pathname: this.props.location.pathname,
                    query: this.props.location.query,
                    location: this.props.location
                })}

            </div>
        );
    }
});

module.exports = AppTemplate;
