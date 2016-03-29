var React = require('react');
var api = require('app/utils/api');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var _ = require('lodash');

var MovieCard = React.createClass({
    displayName: 'FrontPage',
    propTypes: {
        movie: React.PropTypes.object
    },
    mixins: [
        FluxMixin, StoreWatchMixin('MovieStore')
    ],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        var topTen = flux.stores.MovieStore.state.movies.splice(0,10);
        return {
            topTen : topTen,
            movie: this.props
        }
    },
    componentWillMount: function() {
        //console.debug('component will mount', this.props.result);

    },
    componentDidMount: function(){
        //console.debug('component did mount', this.props.result);
    },
    render: function() {
        //console.debug(this.state);
        var classes = ['MovieCard', this.props.hide];
        return (
            <div className={classes.join(' ')}>
                <div className="small-12 small-centered columns ">
                    <div>
                        <span>Director: </span>
                        <span>{this.state.movie.Director}</span>
                    </div>
                    <p>{this.state.movie.Description}</p>
                    <div>
                        <span>Duration: </span>
                        <span>{this.state.movie.Duration}</span>
                    </div>
                    <div className="actors trim">
                        <span>actors: </span>
                        {this.state.movie.Actors.map(function(value, key){
                            return [<a key={key}>{value}</a>, <span>, &nbsp;</span>]
                        })}
                    </div>
                    <div className="genres trim">
                        <span>genres: </span>
                        {this.state.movie.Genres.map(function(value, key){
                            return [<a key={key}>{value}</a>, <span>, &nbsp;</span>]
                        })}
                    </div>
                    <a className="button radius" href="#">buy tickets</a>
                    <div className="rank">rank: {this.state.movie.Rank}</div>
                    <div className="id">id: {this.state.movie.Id}</div>
                </div>
            </div>
        );
    }
});


module.exports = MovieCard;
