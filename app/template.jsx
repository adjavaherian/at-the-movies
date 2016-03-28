var React = require('react');

var AppTemplate = React.createClass({
    displayName: 'AppTemplate',
    propTypes: {
        children: React.PropTypes.object,
        location: React.PropTypes.object,
        params: React.PropTypes.object,
        serializedFlux: React.PropTypes.string,
        result: React.PropTypes.array
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
        console.log('this result', this.props.result);
    },
    render: function() {

        return (
            <div id="app-template">

                {React.cloneElement(this.props.children, {
                    params: this.props.params,
                    path: this.props.location.pathname,
                    pathname: this.props.location.pathname,
                    query: this.props.location.query,
                    location: this.props.location,
                    result: this.props.result
                })}

            </div>
        );
    }
});

module.exports = AppTemplate;
