import React from "react";

// Url de base d'intégration de video ou images
const URL_BASE = "https://www.youtube.com/embed/";
const Video = function({ videoId }) {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={`${URL_BASE}${videoId}`} />
    </div>
  );
};

export default Video;
