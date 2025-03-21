import { useState, useEffect } from "react";

const API_KEY = "AIzaSyDbNPrJJEbDSr7YInlpm8oa-YN0wgeB5tU"; 
const SEARCH_QUERY = "laptop rental service rent electronics online";

const MAX_RESULTS = 3; 

function YouTubeVideos() {
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
      fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(
          SEARCH_QUERY
        )}&part=snippet&type=video&order=relevance&maxResults=${MAX_RESULTS}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setVideos(data.items);
          }
        })
        .catch((err) => console.error("Error fetching YouTube videos:", err));
    }, []);
  
    return (
      <div className="youtube-videos">
        <h2 className="YSectionT">Videos About Electronics Rental</h2>
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <iframe
              width="250"
              height="150"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>
            <div className="video-info">
              <h3>{video.snippet.title}</h3>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default YouTubeVideos;