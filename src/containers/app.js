import React, { Component } from "react";
import SearchBar from "../components/search-bar";
import VideoList from "./video-list";
import VideoDetail from "../components/video-detail";
import axios from "axios";
import Video from "../components/video";

const API_END_POINT = " https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = "api_key=dec8b3b0193378101bcef66852af0b7e";
const SEARCH_URL = "search/movie?language=fr&include_adult=false";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { moviesList: {}, currentMovie: {} };
  }

  // chargement des données, on recupere les films les plus populaires en Ajax
  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    axios
      .get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
      .then(response => {
        this.setState(
          {
            currentMovie: response.data.results[0],
            moviesList: response.data.results.slice(1, 6)
          },
          function() {
            this.applyVideoToCurrentMovie();
          }
        );
      });
  }

  applyVideoToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(response => {
        const youtubekey = response.data.videos.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubekey;
        this.setState({ currentMovie: newCurrentMovieState });
      });
  }

  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, function() {
      this.applyVideoToCurrentMovie();
      this.getRecommendationsMovies();
    });
  }

  onClickSearchBar(searchTexteMovie) {
    axios
      .get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchTexteMovie}`)
      .then(response => {
        if (response.data && response.data.results[0]) {
          console.log(
            "data key: " +
              response.data.results[0].id +
              " / current key: " +
              this.state.currentMovie.id
          );
          if (response.data.results[0].id != this.state.currentMovie.id) {
            this.setState(
              { currentMovie: response.data.results[0] },
              function() {
                this.applyVideoToCurrentMovie();
                this.getRecommendationsMovies();
              }
            );
          }
        }
      });
  }

  getRecommendationsMovies() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }/recommendations?${API_KEY}&language=fr`
      )
      .then(response => {
        if (response.data && response.data.results) {
          this.setState({ moviesList: response.data.results.slice(0, 5) });
        }
      });
  }

  render() {
    const rendervideoList = () => {
      if (this.state.moviesList.length >= 5) {
        return (
          <VideoList
            movieList={this.state.moviesList}
            callBack={this.onClickListItem.bind(this)}
          />
        );
      }
    };
    return (
      <div>
        <div className="search_bar">
          <SearchBar searchVideo={this.onClickSearchBar.bind(this)} />
        </div>
        <div className="row ">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4">{rendervideoList()}</div>
        </div>
      </div>
    );
  }
}

export default App;
