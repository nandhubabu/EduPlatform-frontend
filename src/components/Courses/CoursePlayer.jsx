import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FaPlay,
  FaPause,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeOff,
  FaStepForward,
  FaStepBackward,
  FaList,
  FaStickyNote,
  FaGraduationCap
} from 'react-icons/fa';
import { getCourseById } from '../../services/courseService';
import AlertMessage from '../Alert/AlertMessage';

// YouTube Video Player Component
const YouTubePlayer = ({ videoId, onProgress, onComplete, initialTime = 0 }) => {
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    const newPlayer = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        start: Math.floor(initialTime),
      },
      events: {
        onReady: (event) => {
          setPlayer(event.target);
          setIsReady(true);
          setDuration(event.target.getDuration());
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgressTracking(event.target);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            onComplete?.();
          }
        },
      },
    });
  };

  const startProgressTracking = (playerInstance) => {
    const trackProgress = () => {
      if (playerInstance && isPlaying) {
        const time = playerInstance.getCurrentTime();
        setCurrentTime(time);
        onProgress?.(time);
        
        // Continue tracking if still playing
        if (playerInstance.getPlayerState() === window.YT.PlayerState.PLAYING) {
          setTimeout(trackProgress, 1000);
        }
      }
    };
    trackProgress();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!videoId) {
    return (
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No video available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <div id="youtube-player" className="w-full h-full"></div>
      </div>
      
      {/* Custom Progress Bar */}
      {isReady && duration > 0 && (
        <div className="mt-2 flex items-center space-x-3 text-sm text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
};

// Text Content Viewer
const TextContentViewer = ({ content, title }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <div className="text-gray-700 leading-relaxed">
          {content.htmlContent ? (
            <div dangerouslySetInnerHTML={{ __html: content.htmlContent }} />
          ) : (
            <div className="whitespace-pre-wrap">{content.textContent}</div>
          )}
        </div>
        
        {content.notes && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <FaStickyNote className="mr-2" />
              Notes
            </h4>
            <p className="text-blue-700">{content.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Course Sidebar with Module/Lesson Navigation
const CourseSidebar = ({ course, currentLesson, onLessonSelect, progress = {} }) => {
  const [expandedModules, setExpandedModules] = useState(new Set([0])); // First module expanded by default

  const toggleModule = (moduleIndex) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleIndex)) {
      newExpanded.delete(moduleIndex);
    } else {
      newExpanded.add(moduleIndex);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (lesson) => {
    if (progress[lesson._id]?.completed) {
      return <FaCheckCircle className="text-green-500" />;
    }
    
    switch (lesson.type) {
      case 'video':
        return <FaPlay className="text-red-500" />;
      case 'text':
        return <FaBook className="text-blue-500" />;
      default:
        return <FaBook className="text-gray-500" />;
    }
  };

  const getTotalLessons = () => {
    return course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;
  };

  const getCompletedLessons = () => {
    let completed = 0;
    course.modules?.forEach(module => {
      module.lessons?.forEach(lesson => {
        if (progress[lesson._id]?.completed) completed++;
      });
    });
    return completed;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
          <FaList className="mr-2" />
          Course Content
        </h3>
        <div className="mt-2 text-sm text-gray-600">
          {getCompletedLessons()}/{getTotalLessons()} lessons completed
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getTotalLessons() > 0 ? (getCompletedLessons() / getTotalLessons()) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {course.modules?.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border-b">
            <button
              onClick={() => toggleModule(moduleIndex)}
              className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <h4 className="font-semibold text-gray-800">{module.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {module.lessons?.length || 0} lessons
                </p>
              </div>
              <FaStepForward 
                className={`transform transition-transform ${
                  expandedModules.has(moduleIndex) ? 'rotate-90' : ''
                }`} 
              />
            </button>

            {expandedModules.has(moduleIndex) && (
              <div className="pb-2">
                {module.lessons?.map((lesson, lessonIndex) => (
                  <button
                    key={lessonIndex}
                    onClick={() => onLessonSelect(moduleIndex, lessonIndex, lesson)}
                    className={`w-full p-3 pl-6 text-left hover:bg-gray-50 flex items-center space-x-3 ${
                      currentLesson?.title === lesson.title ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    {getLessonIcon(lesson)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{lesson.title}</p>
                      {lesson.content?.videoDuration && (
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <FaClock className="mr-1" />
                          {Math.ceil(lesson.content.videoDuration / 60)} min
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Course Player Component
const CoursePlayer = () => {
  const { courseId } = useParams();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState({});
  const [showSidebar, setShowSidebar] = useState(true);

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  const currentLesson = course?.modules?.[currentModuleIndex]?.lessons?.[currentLessonIndex];

  const handleLessonSelect = (moduleIndex, lessonIndex, lesson) => {
    setCurrentModuleIndex(moduleIndex);
    setCurrentLessonIndex(lessonIndex);
  };

  const handleVideoProgress = (time) => {
    // Update video progress in state/database
    console.log(`Video progress: ${time} seconds`);
  };

  const handleLessonComplete = () => {
    if (currentLesson) {
      setProgress(prev => ({
        ...prev,
        [currentLesson._id]: { completed: true, completedAt: new Date() }
      }));
      
      // Auto-advance to next lesson
      const currentModule = course.modules[currentModuleIndex];
      if (currentLessonIndex < currentModule.lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
      } else if (currentModuleIndex < course.modules.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentLessonIndex(0);
      }
    }
  };

  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (isLoading) {
    return <AlertMessage type="loading" message="Loading course content..." />;
  }

  if (error) {
    return <AlertMessage type="error" message="Failed to load course content" />;
  }

  if (!course || !course.modules || course.modules.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <FaGraduationCap className="mx-auto text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">Course Content Not Available</h2>
        <p className="text-gray-500">This course is still being prepared. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
              <p className="text-gray-600">{course.description}</p>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <FaList />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentLesson && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {currentLesson.title}
                  </h2>
                  
                  {currentLesson.description && (
                    <p className="text-gray-600 mb-6">{currentLesson.description}</p>
                  )}
                </div>

                {/* Content based on lesson type */}
                {currentLesson.type === 'video' && currentLesson.content?.videoUrl && (
                  <div className="px-6 pb-6">
                    <YouTubePlayer
                      videoId={currentLesson.content.youtubeId || extractYouTubeId(currentLesson.content.videoUrl)}
                      onProgress={handleVideoProgress}
                      onComplete={handleLessonComplete}
                      initialTime={progress[currentLesson._id]?.watchTime || 0}
                    />
                  </div>
                )}

                {currentLesson.type === 'text' && (
                  <div className="px-6 pb-6">
                    <TextContentViewer 
                      content={currentLesson.content}
                      title={currentLesson.title}
                    />
                  </div>
                )}

                {/* Lesson Actions */}
                <div className="px-6 pb-6 flex items-center justify-between border-t pt-4">
                  <button
                    onClick={handleLessonComplete}
                    disabled={progress[currentLesson._id]?.completed}
                    className={`px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 ${
                      progress[currentLesson._id]?.completed
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <FaCheckCircle />
                    <span>
                      {progress[currentLesson._id]?.completed ? 'Completed' : 'Mark as Complete'}
                    </span>
                  </button>

                  {currentLesson.content?.transcript && (
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                      <FaDownload />
                      <span>Transcript</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={`${showSidebar ? 'block' : 'hidden'} lg:block`}>
            <CourseSidebar
              course={course}
              currentLesson={currentLesson}
              onLessonSelect={handleLessonSelect}
              progress={progress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
