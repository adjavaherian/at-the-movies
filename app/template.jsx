var React = require('react');
var api = require('app/utils/api');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AppTemplate = React.createClass({
    displayName: 'AppTemplate',
    propTypes: {
        children: React.PropTypes.object,
        location: React.PropTypes.object,
        params: React.PropTypes.object,
        serializedFlux: React.PropTypes.string,
        flux: React.PropTypes.object,
        result: React.PropTypes.array
    },
    mixins: [FluxMixin, StoreWatchMixin('MovieStore')],
    getInitialState: function() {
        return {
            device: {
                deviceType: 'mobile',
                customVariableSiteType: 'mobileWeb'
            }
        };
    },
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {

        }
    },
    componentDidMount: function() {
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
                    location: this.props.location,
                    result: this.props.result
                })}

                <script
                    dangerouslySetInnerHTML={{__html: this.props.serializedFlux}}
                    id="serializedFlux"
                    type="application/json"
                    />

            </div>
        );
    }
});

module.exports = AppTemplate;
