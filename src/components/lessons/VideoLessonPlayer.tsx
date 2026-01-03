import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, CheckCircle, Bookmark, SkipBack, SkipForward } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Lesson {
  _id: string;
  title: string;
  description: string;
  content: {
    text: string;
    videoUrl: string;
    images: string[];
  };
  duration: number;
  objectives: string[];
  subject: string;
}

interface VideoLessonPlayerProps {
  lesson: Lesson;
  onComplete?: () => void;
}

const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({ lesson, onComplete }) => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookmarks, setBookmarks] = useState<{time: number, note: string}[]>([]);
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [bookmarkNote, setBookmarkNote] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
      
      // Track watch time only when playing
      if (isPlaying) {
        setWatchTime(prev => prev + 1);
        // Auto-save progress every 30 seconds
        if (watchTime % 30 === 0) {
          updateProgress();
        }
      }
      
      // Mark as completed if watched 80% or more
      if (video.currentTime / video.duration >= 0.8 && !isCompleted) {
        setIsCompleted(true);
        updateProgress();
        onComplete?.();
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [isCompleted, onComplete]);

  const updateProgress = async () => {
    try {
      await fetch(`http://localhost:5000/api/progress/lesson/${lesson._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: user?.id,
          status: isCompleted ? 'completed' : 'in_progress',
          completionPercentage: Math.round(progress),
          timeSpent: Math.round(watchTime / 60),
          lastPosition: currentTime
        }),
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value) / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setCurrentTime(0);
    setProgress(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }
    return url;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Video Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{lesson.title}</h2>
            <p className="text-blue-100">{lesson.description}</p>
          </div>
          {isCompleted && (
            <div className="flex items-center space-x-2 bg-green-500 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Completed!</span>
            </div>
          )}
        </div>
      </div>

      {/* Video Player */}
      <div className="relative bg-black">
        {lesson.content.videoUrl.includes('youtube') ? (
          <iframe
            src={getEmbedUrl(lesson.content.videoUrl)}
            className="w-full h-64 md:h-96"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={lesson.title}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-64 md:h-96"
              src={lesson.content.videoUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={restart}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      const video = videoRef.current;
                      if (video) video.currentTime = Math.max(0, video.currentTime - 10);
                    }}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      const video = videoRef.current;
                      if (video) video.currentTime = Math.min(duration, video.currentTime + 10);
                    }}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setShowBookmarkForm(true)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume * 100}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <select 
                    value={playbackSpeed} 
                    onChange={(e) => {
                      const speed = parseFloat(e.target.value);
                      setPlaybackSpeed(speed);
                      if (videoRef.current) videoRef.current.playbackRate = speed;
                    }}
                    className="bg-black/50 text-white text-xs rounded px-1 py-1"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                  
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lesson Content */}
      <div className="p-6 space-y-6">
        {/* Learning Objectives */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            🎯 What You'll Learn
          </h3>
          <ul className="space-y-2">
            {lesson.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lesson Text Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            📖 Lesson Notes
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {lesson.content.text}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            📊 Your Progress
          </h3>
          <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span>{Math.round(progress)}% Complete</span>
            <span>Watch time: {Math.round(watchTime / 60)} minutes</span>
          </div>
        </div>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              🔖 My Bookmarks
            </h3>
            <div className="space-y-2">
              {bookmarks.map((bookmark, index) => (
                <div key={index} className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <div>
                    <span className="font-medium">{formatTime(bookmark.time)}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{bookmark.note}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (videoRef.current) videoRef.current.currentTime = bookmark.time;
                    }}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Jump to
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images */}
        {lesson.content.images && lesson.content.images.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              🖼️ Related Images
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {lesson.content.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Lesson image ${index + 1}`}
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Bookmark Form Modal */}
        {showBookmarkForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-bold mb-4">Add Bookmark</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Time: {formatTime(currentTime)}
              </p>
              <input
                type="text"
                value={bookmarkNote}
                onChange={(e) => setBookmarkNote(e.target.value)}
                placeholder="Add a note for this bookmark..."
                className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600"
                autoFocus
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    if (bookmarkNote.trim()) {
                      setBookmarks([...bookmarks, { time: currentTime, note: bookmarkNote }]);
                      setBookmarkNote('');
                      setShowBookmarkForm(false);
                    }
                  }}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Add Bookmark
                </button>
                <button
                  onClick={() => {
                    setShowBookmarkForm(false);
                    setBookmarkNote('');
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLessonPlayer;