import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Music, Clock, Award, BookOpen, Zap, Code } from 'lucide-react';

const poemsData = [
  {
    id: 1,
    title: "सपनों की उड़ान",
    snippet: "आसमान में जो सपने बुने हैं, वो तारों से भी ऊंचे हैं...",
    fullText: `आसमान में जो सपने बुने हैं,
वो तारों से भी ऊंचे हैं,
दिल की गहराइयों में छुपे हैं,
जो अरमान अधूरे हैं।

हर सुबह नई उम्मीद लाती है,
हर शाम एक कहानी सुनाती है,
जिंदगी के इस सफर में,
खुद को हमने पाया है।`,
    mood: "आशावाद",
    tag: "प्रेरणा"
  },
  {
    id: 2,
    title: "रात की चांदनी",
    snippet: "चांद की किरणों में बसी है, एक अनकही कहानी...",
    fullText: `चांद की किरणों में बसी है,
एक अनकही कहानी,
रात के सन्नाटे में गूंजती,
दिल की वीरानी।

तारों से बातें करते हैं,
जब सब सो जाते हैं,
अधूरे ख्वाब रात में,
फिर से जग जाते हैं।`,
    mood: "रोमांटिक",
    tag: "रात"
  },
  {
    id: 3,
    title: "मां की ममता",
    snippet: "मां के आंचल में छुपी है, सारी दुनिया की खुशियां...",
    fullText: `मां के आंचल में छुपी है,
सारी दुनिया की खुशियां,
उसके प्यार में मिलती हैं,
जीवन की सारी रोशनियां।

कोई भी दुख सह लेती है,
बस बच्चे मुस्कुराएं,
मां की ममता अनमोल है,
इसे शब्दों में न समाएं।`,
    mood: "भावुक",
    tag: "परिवार"
  }
];

export default function HackerPortfolio() {
  const [time, setTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [ready, setReady] = useState(false);
  const playerRef = useRef(null);

  // Music playlist - Replace with your own YouTube playlist ID
  const playlistId = "PLGRQY5iKPp93d5o_WArzmqsAJ6ofBU1iM"; // Your YouTube playlist ID
  
  const bootText = `> Initializing writer_profile.exe...
> Loading achievements...
> Connecting to literary_network...
> System ready. Welcome.`;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Show full text immediately for better performance
    setTerminalText(bootText);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    let mounted = true;
    
    const initializePlayer = () => {
      if (!mounted) return;
      
      const playerElement = document.getElementById('youtube-player');
      if (!playerElement) {
        console.log('Player element not found, retrying...');
        setTimeout(initializePlayer, 100);
        return;
      }
      
      try {
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '360',
          width: '640',
          playerVars: {
            listType: 'playlist',
            list: playlistId,
            autoplay: 0,
            loop: 1,
          },
          events: {
            onReady: (event) => {
              console.log('YouTube player is ready!');
              if (mounted) {
                setReady(true);
              }
            },
            onStateChange: (event) => {
              console.log('Player state changed:', event.data);
              if (!mounted) return;
              
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            },
            onError: (event) => {
              console.error('YouTube player error:', event.data);
            }
          },
        });
      } catch (error) {
        console.error('Error creating player:', error);
      }
    };

    const loadYouTubeAPI = () => {
      // Check if API is already loaded
      if (window.YT && window.YT.Player) {
        console.log('YouTube API already loaded');
        initializePlayer();
        return;
      }

      // Check if script is already being loaded
      if (window.YT && !window.YT.Player) {
        console.log('YouTube API loading...');
        window.onYouTubeIframeAPIReady = initializePlayer;
        return;
      }

      // Load the API script
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        console.log('Loading YouTube API script...');
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = initializePlayer;
      }
    };

    loadYouTubeAPI();

    return () => {
      mounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };
  }, [playlistId]);

  const togglePlay = () => {
    console.log('Toggle play clicked. Ready:', ready, 'Player:', playerRef.current);
    
    if (!playerRef.current) {
      console.log('Player not initialized');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausing...');
        playerRef.current.pauseVideo();
      } else {
        console.log('Playing...');
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono overflow-x-hidden">
      {/* Scanlines Effect - Static for performance */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-b from-transparent via-yellow-400/3 to-transparent"></div>
      
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(yellow 1px, transparent 1px), linear-gradient(90deg, yellow 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Terminal */}
        <div className="mb-8 border-2 border-yellow-400 bg-black/90 p-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          <div className="flex items-center gap-2 mb-4 text-yellow-400">
            <Terminal className="w-5 h-5" />
            <span className="text-sm">SYSTEM_BOOT.log</span>
          </div>
          <pre className="text-xs leading-relaxed text-yellow-400/80">
            {terminalText}
            {showCursor && <span className="bg-yellow-400 text-black">█</span>}
          </pre>
        </div>

        {/* Main Header */}
        <div className="mb-12 text-center">
          <div className="inline-block border-2 border-yellow-400 px-8 py-6 bg-black/90 shadow-[0_0_30px_rgba(234,179,8,0.4)] mb-4">
            <h1 className="text-6xl font-bold tracking-wider mb-2 text-yellow-400">
              [ DHAWAL ]
            </h1>
            <div className="flex items-center justify-center gap-2 text-yellow-400/80">
              <Code className="w-4 h-4" />
              <span className="text-sm tracking-widest">PUBLISHED_POET.exe | WRITER.sys</span>
              <Code className="w-4 h-4" />
            </div>
          </div>
          <p className="text-yellow-400/60 text-sm tracking-wide">
            &gt; Crafting words in Hindi & English | System ID: POET_007
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Retro Clock */}
          <div className="border-2 border-yellow-400 bg-black/90 p-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              <Clock className="w-5 h-5" />
              <span className="text-xs tracking-wider">SYSTEM_TIME</span>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-yellow-400 tabular-nums tracking-wider">
                {formatTime(time)}
              </div>
              <div className="text-yellow-400/60 text-xs tracking-wide">
                {formatDate(time)}
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 border border-yellow-400/40 bg-yellow-400/20"
                  style={{ 
                    height: `${20 + (i * 5)}px`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Gramophone Music Player */}
          <div className="border-2 border-yellow-400 bg-black/90 p-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              <Music className="w-5 h-5" />
              <span className="text-xs tracking-wider">AUDIO_MODULE</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-yellow-400/60 text-xs mb-4">
                &gt; {ready ? 'PLAYLIST_LOADED' : 'LOADING_PLAYER...'}
              </div>

              {/* Visual gramophone */}
              <div className="relative mb-4">
                <div className={`w-24 h-24 border-4 border-yellow-400 rounded-full flex items-center justify-center transition-transform ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
                  <div className="w-16 h-16 border-2 border-yellow-400 rounded-full"></div>
                </div>
                <div className="absolute -top-2 right-0 w-8 h-12 border-2 border-yellow-400 bg-black rotate-12"></div>
              </div>
              
              <button
                onClick={togglePlay}
                disabled={!ready}
                className="border border-yellow-400 px-6 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? '[PAUSE]' : '[PLAY]'}
              </button>
              
              {/* Hidden YouTube player */}
              <div id="youtube-player"></div>
              
              {isPlaying && (
                <div className="mt-3 flex gap-1">
                  {[15, 25, 20, 30, 18].map((height, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-yellow-400 transition-all duration-300"
                      style={{ height: `${height}px` }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-2 border-yellow-400 bg-black/90 p-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              <Zap className="w-5 h-5" />
              <span className="text-xs tracking-wider">STATS_OVERVIEW</span>
            </div>
            <div className="space-y-3">
              <StatLine label="POEMS_WRITTEN" value="25+" />
              <StatLine label="PUBLICATIONS" value="02" />
              <StatLine label="AWARDS_WON" value="05+" />
              <StatLine label="REACH" value="22K+" />
              <StatLine label="FOLLOWERS" value="1K+" />
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
          <div className="border-2 border-yellow-400 bg-black/90 p-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <div className="flex items-center gap-2 mb-6 text-yellow-400">
              <Award className="w-5 h-5" />
              <span className="text-xs tracking-wider">ACHIEVEMENTS.log</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AchievementCard
                title="[PUBLISHED]"
                desc="Amar Ujala - National Daily"
                metric="Hindi Poetry"
              />
              <AchievementCard
                title="[PUBLISHED]"
                desc="Kidz Herald - Youth Magazine"
                metric="Creative Writing"
              />
              <AchievementCard
                title="[AWARD]"
                desc="Multiple Poetry Prizes"
                metric="School & College Level"
              />
              <AchievementCard
                title="[PERFORMANCE]"
                desc="Stage Recitals"
                metric="Multiple Venues"
              />
              <AchievementCard
                title="[REACH]"
                desc="LinkedIn Impressions"
                metric="22,000+"
              />
              <AchievementCard
                title="[COMMUNITY]"
                desc="Active Following"
                metric="1,000+ Followers"
              />
            </div>
          </div>
        </div>

        {/* Writings Section */}
        <div className="mb-12">
          <div className="border-2 border-yellow-400 bg-black/90 p-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <div className="flex items-center gap-2 mb-6 text-yellow-400">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs tracking-wider">WRITINGS_DATABASE.txt</span>
            </div>
            
            {!selectedPoem ? (
              <div className="space-y-4">
                {poemsData.map((poem, index) => (
                  <button
                    key={poem.id}
                    onClick={() => setSelectedPoem(poem)}
                    className="w-full text-left border border-yellow-400/40 p-4 hover:border-yellow-400 hover:bg-yellow-400/5 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-yellow-400 text-sm tracking-wide">
                        [{String(index + 1).padStart(2, '0')}] {poem.title}
                      </span>
                      <div className="flex gap-2">
                        <span className="text-xs border border-yellow-400/40 px-2 py-1 text-yellow-400/60">
                          {poem.mood}
                        </span>
                        <span className="text-xs border border-yellow-400/40 px-2 py-1 text-yellow-400/60">
                          {poem.tag}
                        </span>
                      </div>
                    </div>
                    <p className="text-yellow-400/60 text-xs group-hover:text-yellow-400/80 transition-colors">
                      &gt; {poem.snippet}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedPoem(null)}
                  className="mb-4 text-yellow-400/60 hover:text-yellow-400 text-sm"
                >
                  &lt; BACK_TO_LIST
                </button>
                <div className="border border-yellow-400/40 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl text-yellow-400 tracking-wide">
                      {selectedPoem.title}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs border border-yellow-400/40 px-2 py-1 text-yellow-400/60">
                        {selectedPoem.mood}
                      </span>
                      <span className="text-xs border border-yellow-400/40 px-2 py-1 text-yellow-400/60">
                        {selectedPoem.tag}
                      </span>
                    </div>
                  </div>
                  <pre className="text-yellow-400/80 whitespace-pre-line leading-relaxed text-base">
                    {selectedPoem.fullText}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Terminal */}
        <div className="border-2 border-yellow-400 bg-black/90 p-4 shadow-[0_0_20px_rgba(234,179,8,0.3)] text-center">
          <p className="text-yellow-400/60 text-xs tracking-wider">
            © 2025 DHAWAL.WRITER.SYS | ALL_RIGHTS_RESERVED | SESSION_ID: {Date.now()}
          </p>
          <p className="text-yellow-400/40 text-xs mt-2">
            &gt; "शब्दों में छुपी है ज़िंदगी की कहानी" | SYSTEM_UPTIME: {formatTime(time)}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatLine({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-yellow-400/60 text-xs tracking-wider">{label}:</span>
      <span className="text-yellow-400 text-sm font-bold tracking-wide">[{value}]</span>
    </div>
  );
}

function AchievementCard({ title, desc, metric }) {
  return (
    <div className="border border-yellow-400/40 p-4 hover:border-yellow-400 hover:bg-yellow-400/5 transition-all duration-200">
      <div className="text-yellow-400 text-xs tracking-wider mb-2">{title}</div>
      <div className="text-yellow-400/80 text-sm mb-1">{desc}</div>
      <div className="text-yellow-400/60 text-xs">&gt; {metric}</div>
    </div>
  );
}