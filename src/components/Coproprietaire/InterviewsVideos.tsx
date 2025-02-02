import React, { useState } from 'react';
import { VideoIndex, VideoIndexes } from './Interviews.styles';

const videos = [
  'https://www.youtube.com/embed/zsOgW8sIByc',
  'https://www.youtube.com/embed/iv0gb71XOj4',
  'https://www.youtube.com/embed/wtNmhwa5_DA',
  'https://www.youtube.com/embed/2mO97aF1T4c',
  'https://www.youtube.com/embed/wieL5MpMtnE',
  'https://www.youtube.com/embed/eDnhC9l5pWI',
];

const InterviewsVideos = () => {
  const [videoIndex, setVideoIndex] = useState(0);

  return (
    <>
      <iframe
        width="100%"
        src={videos[videoIndex]}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <VideoIndexes>
        {Array.from({ length: 6 }, (value, index) => (
          <VideoIndex
            key={index}
            active={index === videoIndex}
            onClick={() => setVideoIndex(index)}
          />
        ))}
      </VideoIndexes>
    </>
  );
};

export default InterviewsVideos;
