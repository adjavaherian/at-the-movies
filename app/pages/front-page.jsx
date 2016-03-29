var React = require('react');
var api = require('app/utils/api');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var MovieCard = require('app/components/MovieCard');
var _ = require('lodash');
var StyleSheet = require('scss/FrontPage');

var viz = new Array(10);
    viz.map(function(){return 'hidden'});

var FrontPage = React.createClass({
    displayName: 'FrontPage',
    propTypes: {
        result: React.PropTypes.array
    },
    mixins: [
        FluxMixin, StoreWatchMixin('MovieStore')
    ],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var topTen = flux.stores.MovieStore.state.movies.splice(0,10);
        return {
            topTen : topTen,
            visible: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']
        }
    },
    statics: {
        //serverMount: function(context){
        //    var self = this;
        //    if (typeof window === 'undefined') {
        //        return api.getMoviesByRank(1, 10)
        //            .catch(function(err){
        //                console.debug(err);
        //            })
        //            .then(function(result){
        //                console.log('thennnnn');
        //                return result;
        //            });
        //    }
        //}
    },
    componentWillMount: function() {
        //console.debug('component will mount', this.props.result);

    },
    componentDidMount: function(){
        //console.debug('component did mount', this.props.result);
    },
    expandMovie: function(id){
        console.debug('expand id', this.state.visible[id]);
        var temp = this.state.visible;
        temp[id] = temp[id] === 'hidden' ? '': 'hidden';
        this.setState({
            visible : temp
        });
    },
    topTen: function(){
        var self = this;
        var movies = [];
        this.state.topTen.map(function(movie, i){
            movies.push((
                <li className="title" key={i} onClick={self.expandMovie.bind(self, i)} >
                    <span className="rank">{movie.Rank}). </span>
                    <span className="name">{movie.Name}</span>
                    <MovieCard {...movie} hide={self.state.visible[i]}/>
                </li>
            ))
        });

        return movies;

    },
    render: function() {

        return (
            <div className="FrontPage row">
                <div className="small-12 small-centered columns ">
                    <h1>Top Ten movies by Rank</h1>
                </div>

                <ul className="small-12 columns">
                    {this.topTen()}
                </ul>
            </div>
        );
    }
});


module.exports = FrontPage;
