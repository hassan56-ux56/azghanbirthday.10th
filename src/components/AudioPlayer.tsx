import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  youtubeVideoId?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  youtubeVideoId = 'SSUbntk63Yg',
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Fallback mp3 stream
  const fallbackSrc =
    'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939b8dbf9.mp3?filename=celebration-party-ambient-124430.mp3';

  // Handle Play/Pause synchronization with YouTube iframe and audio fallback
  useEffect(() => {
    if (iframeRef.current && iframeLoaded) {
      const command = isPlaying ? 'playVideo' : 'pauseVideo';
      try {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: command, args: '' }),
          '*'
        );
      } catch (err) {
        console.error('YouTube player postMessage error:', err);
      }
    }

    // Secondary fallback sync
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay policy prevented playback until user interaction
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, iframeLoaded]);

  return (
    <div className="flex items-center gap-2">
      {/* Embedded YouTube Audio Stream (Video ID: UmdxeOSpuWw) */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${youtubeVideoId}&controls=0`}
        title="Background Birthday Music"
        onLoad={() => setIframeLoaded(true)}
        className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        allow="autoplay"
      />

      {/* Fallback Audio Element */}
      <audio ref={audioRef} src={fallbackSrc} loop preload="auto" />

      {/* Music Controller Pill with dedicated Play & Stop Buttons */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#1A0B2E]/95 border-2 border-[#E6C363]/60 shadow-2xl backdrop-blur-md">
        {/* Dedicated PLAY Button */}
        <button
          onClick={() => {
            if (!isPlaying) onTogglePlay();
          }}
          className={`px-3 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
            isPlaying
              ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
              : 'bg-[#251147] border border-[#E6C363]/40 text-[#FFF0B3] hover:bg-[#E6C363] hover:text-[#190933]'
          }`}
          title="Play Background Music"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>PLAY</span>
        </button>

        {/* Dedicated STOP Button */}
        <button
          onClick={() => {
            if (isPlaying) onTogglePlay();
          }}
          className={`px-3 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
            !isPlaying
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-[#251147] border border-rose-500/40 text-rose-300 hover:bg-rose-900/50 hover:text-white'
          }`}
          title="Stop Background Music"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>STOP</span>
        </button>

        {/* Audio Visualizer / Volume Icon */}
        <div className="px-2 flex items-center">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-[#F5CE62] rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-0.5 bg-[#F5CE62] rounded-full animate-[bounce_1s_infinite_300ms] h-2" />
              <span className="w-0.5 bg-[#F5CE62] rounded-full animate-[bounce_1s_infinite_200ms] h-3" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </div>
    </div>
  );
};


