var React = require('react');
var api = require('app/utils/api');
//var StyleSheet = require('scss/pages/FrontPage');

var FrontPage = React.createClass({
    displayName: 'FrontPage',
    mixins: [
    ],
    getInitialState: function() {
        return {
            movies : []
        };
    },
    statics: {
        serverMount: function(){
            var self = this;
            if (typeof window === 'undefined') {
                return api.getMovies()
                    .catch(function(err){
                        console.debug(err);
                    })
                    .then(function(result){
                        console.log('thennnnn');
                        return result.splice(0, 10);
                    });
            }
        }
    },
    componentWillMount: function() {
        console.debug('component will mount', this.props.result);

    },
    componentDidMount: function(){
        console.debug('component did mount', this.props.result);
    },
    render: function() {
        //console.log(this.props);
        return (
            <div className="FrontPage">
                <ul>
                    {this.props.result[0].map(function(movie, i){
                        return <li key={i} >{movie.Name}</li>;
                    })}
                </ul>
            </div>
        );
    }
});


module.exports = FrontPage;
