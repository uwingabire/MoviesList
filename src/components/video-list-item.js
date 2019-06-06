import React from "react";
const image = " https://image.tmdb.org/t/p/w500";
const VideoListItem = props => {
  const { movie } = props;

  return (
    <li className="list-group-item" onClick={handleOnclick}>
      <div className="media">
        <div className="media-left">
          <img
            className="media-object img-rounded"
            height="100px"
            width="100px"
            src={`${image}${movie.poster_path}`}
          />
        </div>
        <div className="media-body">
          <h5 className="title_list_item">{movie.title}</h5>
        </div>
      </div>
    </li>
  );
  function handleOnclick() {
    props.callBack(movie);
  }
};

export default VideoListItem;
