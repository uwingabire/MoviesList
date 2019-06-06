import React from "react";
import VideoListItem from "../components/video-list-item";

const VideoList = props => {
  const { movieList } = props;
  return (
    <div>
      <ul>
        {movieList.map(item => {
          return (
            <VideoListItem
              key={item.id}
              movie={item}
              callBack={receiveCallBack}
            />
          );
        })}
      </ul>
    </div>
  );
  function receiveCallBack(movie) {
    props.callBack(movie);
  }
};

export default VideoList;
