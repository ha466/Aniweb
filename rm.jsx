import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Ghost, Moon, Scroll, Skull, AlertTriangle, Eye, Sparkles, Key, Lock, Fingerprint } from 'lucide-react';

// --- Configuration ---
const BASE_URL = "https://ha466.github.io/Aniweb/Assets/";

// Helper to handle color themes dynamically
const getThemeStyles = (color) => ({
  text: { color: color },
  bg: { backgroundColor: color },
  border: { borderColor: color },
  shadow: { boxShadow: `0 0 20px ${color}40` }, // 40 is hex opacity
  gradient: { background: `radial-gradient(circle at center, ${color}20, transparent 70%)` }
});

const TRACKS = [
  {
    title: "Let Me Down Slowly",
    artist: "Alec Benjamin",
    filename: "Alec Benjamin - Let Me Down Slowly(MP3_160K).mp3",
    color: "#a8a29e", // Gray Fog
    pathway: "The Fool",
    poem: "I asked the Fool for a miracle flight,\nHe turned me into a paper kite.\nDrifting down through the gray fog's hue,\nMy humanity's gone, but the view is new.",
    lore: "Artifact 3-007 'The Feather'. Induces a sense of weightlessness. Side effect: User may occasionally hallucinate being a bird."
  },
  {
    title: "Moral of the Story",
    artist: "Ashe",
    filename: "Ashe - Moral Of The Story (Lyrics).mp3",
    color: "#facc15", // Gold (Monocle)
    pathway: "Marauder",
    poem: "He adjusted his monocle, smiled so sweet,\nThen stole my thoughts and my favorite seat.\nThe moral is simple, a lesson in dread:\nIf he wears a glass eye, you're already dead.",
    lore: "Sealed Artifact 2-229 'The Parasite'. Warning: If you hear laughter in your right ear, terminate the session immediately."
  },
  {
    title: "Lovely",
    artist: "Billie Eilish, Khalid",
    filename: "Billie Eilish, Khalid - 01. lovely.mp3",
    color: "#e0f2fe", // Platinum/White (Visionary)
    pathway: "Visionary",
    poem: "Walking through a city that isn't quite real,\nWith a dragon's psyche and a heart of steel.\nIt's lonely here in the mind of a God,\nBut the rent is free, which is rather odd.",
    lore: "A recorded dream of a Sequence 0. Do not listen for more than 3 minutes or you may forget your own existence."
  },
  {
    title: "Daylight",
    artist: "David Kushner",
    filename: "David Kushner - Daylight (Official Music Video) - DavidKushnerVEVO.mp3",
    color: "#f97316", // Orange/Sun
    pathway: "Sun",
    poem: "PRAISE THE SUN! (My retinas burn),\nA purification I didn't earn.\nI'm cleansing my sins with holy fire,\nBut now I smell like a burning pyre.",
    lore: "Holy Water concentrate (Audio Format). Highly effective against wraiths. Highly irritating to Nighthawks."
  },
  {
    title: "Dusk Till Dawn",
    artist: "Zayn ft. Sia",
    filename: "Dusk Till Dawn (Official Video) ft. Sia.mp3",
    color: "#9333ea", // Purple (Darkness/Moon)
    pathway: "Darkness",
    poem: "The Crimson Moon rises, the hair starts to grow,\nDo I look like a wolf? Just tell me 'No'.\nWe'll run from the Church until dawn breaks the sky,\nOr until I get hungry and eat a passerby.",
    lore: "Contains the howl of a Sequence 4 Nightwatcher. May induce hair growth on palms."
  },
  {
    title: "Summertime Sadness",
    artist: "Lana Del Rey",
    filename: "Lana Del Rey - Summertime Sadness Official Music Video.mp3",
    color: "#dc2626", // Red (Hunter)
    pathway: "Red Priest",
    poem: "Kiss me hard before you provoke,\nA war that ends in fire and smoke.\nI got my dress on tonight (it's a trap),\nI was a Hunter, now I'm on the map.",
    lore: "Artifact 1-069 'The Witch's Mirror'. Listening changes the user's gender perception for 1d4 hours."
  },
  {
    title: "Suzume",
    artist: "RADWIMPS",
    filename: "Suzume.mp3",
    color: "#3b82f6", // Blue (Door)
    pathway: "Apprentice",
    poem: "Knock on the air, open a gate,\nRun from the cosmos before it's too late.\nI travelled the stars and saw the great black,\nNow I'm a mushroom, and I can't go back.",
    lore: "The key to a random bathroom in the astral plane. Use at your own risk."
  },
  {
    title: "The Underworld",
    artist: "EPIC: The Musical",
    filename: "The Underworld - EPIC_ The Musical (Animatic) [ ezmp3.co ].mp3",
    color: "#44403c", // Dark Stone (Death)
    pathway: "Death",
    poem: "I forgot my name, I forgot my face,\nI'm just a skeleton winning a race.\nThe ferryman's asking for a gold coin fee,\nI only have copper, so he's drowning me.",
    lore: "A whistle made of bone. Summons a messenger who demands payment in candy."
  },
  {
    title: "Sugar Crash",
    artist: "ElyOtto",
    filename: "sugar_crash.mp3",
    color: "#22c55e", // Toxic Green (Planter)
    pathway: "Planter",
    poem: "Mushrooms are growing inside of my lung,\nI tasted the cosmos on the tip of my tongue.\nFrank Lee is happy, he crossbred a cow,\nWith a watermelon. Don't ask me how.",
    lore: "Audio recording of Frank Lee's laboratory. Side effects: Craving raw soil."
  }
];

const encodeUrl = (filename) => {
  return BASE_URL + encodeURIComponent(filename);
};

// Puzzle Component (Unchanged logic, just ensuring styles pass through if needed)
const GreyFogPuzzle = ({ onUnlock }) => {
  const [runesCollected, setRunesCollected] = useState(0);
  const totalRunes = 3;

  const runes = useRef(Array.from({ length: 3 }).map(() => ({
    id: Math.random(),
    top: Math.random() * 80 + 10 + '%',
    left: Math.random() * 80 + 10 + '%',
    speed: 15 + Math.random() * 10 + 's'
  }))).current;

  const handleRuneClick = (e) => {
    e.target.style.transform = "scale(1.5)";
    e.target.style.opacity = "0";
    setTimeout(() => {
        e.target.style.display = 'none';
        const newCount = runesCollected + 1;
        setRunesCollected(newCount);
        if (newCount >= totalRunes) {
            setTimeout(onUnlock, 500);
        }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex items-center justify-center overflow-hidden font-serif">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/foggy-birds.png')] opacity-20 animate-drift"></div>
      
      <div className="relative z-10 text-center p-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl text-stone-200 font-bold mb-4 tracking-widest animate-pulse-slow font-cinzel">
          The Gray Fog
        </h1>
        <p className="text-stone-400 text-lg mb-8 italic">
          "The connection is unstable. Find the {totalRunes} Spirit Runes to anchor your soul."
        </p>
        <div className="flex justify-center gap-4">
            {Array.from({ length: totalRunes }).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-full transition-all duration-500 ${i < runesCollected ? 'bg-stone-200 shadow-[0_0_10px_white]' : 'bg-stone-800'}`}></div>
            ))}
        </div>
      </div>

      {runes.map((rune, index) => (
         <button
            key={rune.id}
            onClick={handleRuneClick}
            className="absolute cursor-pointer text-stone-400 hover:text-white transition-colors animate-float"
            style={{ 
                top: rune.top, 
                left: rune.left, 
                animationDuration: rune.speed 
            }}
         >
            <Key size={48} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
         </button>
      ))}

      <style jsx>{`
        @keyframes drift { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        @keyframes float { 0% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(30px, -50px) rotate(10deg); } 66% { transform: translate(-20px, 20px) rotate(-5deg); } 100% { transform: translate(0, 0) rotate(0deg); } }
        .animate-drift { animation: drift 60s linear infinite; }
        .animate-float { animation: float infinite ease-in-out alternate; }
        .font-cinzel { font-family: 'Cinzel', serif; }
      `}</style>
    </div>
  );
};

export default function LordOfMysteriesPlayer() {
  const [isLocked, setIsLocked] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [corruption, setCorruption] = useState(0);
  const [isDeciphered, setIsDeciphered] = useState(false);
  
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const currentTrack = TRACKS[currentTrackIndex];
  const theme = getThemeStyles(currentTrack.color);

  useEffect(() => {
    setIsDeciphered(false);
  }, [currentTrackIndex]);

  useEffect(() => {
    let interval;
    if (isPlaying && !isLocked) {
      interval = setInterval(() => {
        setCorruption(c => Math.min(c + 1, 100));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isLocked]);

  useEffect(() => {
    if (audioRef.current && !isLocked) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, isLocked]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setCorruption(prev => Math.max(0, prev - 10));
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  // Canvas animation - Dynamic Color
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isLocked) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3,
      speedY: Math.random() * 1 - 0.5,
      speedX: Math.random() * 1 - 0.5,
      opacity: Math.random()
    }));

    // Parse hex color to rgb for canvas
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
    }
    const rgbColor = hexToRgb(currentTrack.color);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isPlaying ? `rgba(0,0,0, 0.1)` : 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX * (isPlaying ? 2 : 0.5);
        p.y += p.speedY * (isPlaying ? 2 : 0.5);
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor}, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isLocked, currentTrack.color]);

  if (isLocked) {
      return <GreyFogPuzzle onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className={`min-h-screen bg-stone-950 text-stone-300 font-serif overflow-hidden relative selection:bg-red-900 selection:text-white transition-all duration-1000 ${corruption > 80 ? 'animate-shake' : ''}`}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-all duration-1000" style={{ background: `radial-gradient(circle at 50% 50%, ${currentTrack.color}40, #0c0a09 70%)` }}>
        {corruption > 50 && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-30 animate-pulse"></div>}
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col md:flex-row items-center justify-center gap-8">
        
        {/* Left Panel: The Playlist */}
        <div className="w-full md:w-1/3 h-64 md:h-[600px] bg-stone-900/80 border border-stone-700 rounded-lg p-6 overflow-y-auto backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.7)] custom-scrollbar transform transition-all hover:shadow-lg"
             style={{ borderColor: `${currentTrack.color}30` }}>
          <div className="flex items-center gap-2 mb-6 border-b border-stone-700 pb-2">
            <Scroll style={{ color: currentTrack.color }} className="animate-pulse" size={24} />
            <h2 style={{ color: currentTrack.color }} className="text-xl tracking-widest font-bold uppercase font-cinzel">Sealed Artifacts</h2>
          </div>
          <div className="space-y-3">
            {TRACKS.map((track, idx) => (
              <div 
                key={idx}
                onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                className={`p-3 rounded cursor-pointer transition-all duration-300 border relative overflow-hidden group ${
                  idx === currentTrackIndex 
                    ? 'bg-stone-800/80 border-opacity-100 translate-x-2' 
                    : 'bg-stone-800/40 border-stone-800 hover:bg-stone-800 hover:border-stone-600'
                }`}
                style={idx === currentTrackIndex ? { borderColor: track.color } : {}}
              >
                <div 
                    className={`absolute inset-0 opacity-10 transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0 ${idx === currentTrackIndex ? 'translate-x-0' : ''}`}
                    style={{ backgroundColor: track.color }}
                ></div>
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-bold text-sm truncate" style={idx === currentTrackIndex ? { color: track.color } : {}}>{track.title}</span>
                  {idx === currentTrackIndex && <Eye size={16} color={track.color} className="animate-spin-slow" />}
                </div>
                <div className="text-xs text-stone-500 truncate relative z-10 flex justify-between">
                    <span>{track.artist}</span>
                    {idx === currentTrackIndex && <span className="opacity-70" style={{ color: track.color }}>[{track.pathway}]</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: The Player */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          
          {/* Visualizer / Card Art */}
          <div className="relative w-full aspect-square md:aspect-video max-w-lg bg-black border-4 border-double rounded-lg shadow-2xl mb-8 overflow-hidden group transition-colors duration-700"
               style={{ borderColor: `${currentTrack.color}40` }}>
             <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={600} height={400} />
             
             <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
             {corruption > 70 && (
                <div className="absolute inset-0 pointer-events-none bg-red-500/10 mix-blend-difference animate-glitch"></div>
             )}

             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <Ghost size={48} style={{ color: currentTrack.color }} className={`mb-4 ${isPlaying ? 'animate-bounce' : 'opacity-50'}`} />
                <h1 className="text-2xl md:text-4xl font-bold text-stone-200 mb-2 drop-shadow-md tracking-tight font-cinzel">
                  {currentTrack.title}
                </h1>
                <p className="font-mono text-sm mb-6" style={{ color: currentTrack.color }}>{currentTrack.artist}</p>
                
                {/* The "Poem" Card */}
                <div className="relative w-full flex justify-center">
                    {!isDeciphered ? (
                        <button 
                            onClick={() => setIsDeciphered(true)}
                            className="bg-stone-900/80 border p-4 rounded transition-all flex flex-col items-center gap-2 backdrop-blur-md group-hover:scale-105"
                            style={{ borderColor: `${currentTrack.color}60`, color: currentTrack.color }}
                        >
                            <Fingerprint size={24} className="animate-pulse" />
                            <span className="text-xs uppercase tracking-widest">Divination Required</span>
                        </button>
                    ) : (
                        <div className="bg-black/80 backdrop-blur-md p-6 rounded border border-stone-600 w-full max-w-sm animate-fade-in-up shadow-xl"
                             style={{ borderTopColor: currentTrack.color }}>
                            <div className="text-xs uppercase mb-2 flex items-center justify-center gap-2" style={{ color: currentTrack.color }}>
                                <Sparkles size={12} /> Deciphered <Sparkles size={12} />
                            </div>
                            <p className="text-stone-200 italic leading-relaxed whitespace-pre-line text-sm md:text-base font-serif">
                                "{currentTrack.poem}"
                            </p>
                        </div>
                    )}
                </div>
             </div>
          </div>

          {/* Controls */}
          <div className="w-full max-w-lg bg-stone-900/90 border-t p-4 rounded-xl flex flex-col gap-4 shadow-xl backdrop-blur-md relative overflow-hidden transition-colors duration-500"
               style={{ borderColor: `${currentTrack.color}30` }}>
             
             {/* Glowing border effect */}
             <div className="absolute top-0 left-0 w-full h-1 opacity-50 transition-colors duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${currentTrack.color}, transparent)` }}></div>

             {/* Progress */}
             <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden">
               <div className={`h-full ${isPlaying ? 'animate-progress' : 'w-0'}`} 
                    style={{ width: '100%', transition: 'width 30s linear', backgroundColor: currentTrack.color }}></div>
             </div>

             <div className="flex items-center justify-between px-4">
                <button onClick={handlePrev} className="text-stone-400 hover:text-white transition-colors transform hover:-translate-x-1"><SkipBack size={24} /></button>
                
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="w-16 h-16 rounded-full border flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all group bg-stone-900"
                  style={{ borderColor: currentTrack.color, boxShadow: `0 0 20px ${currentTrack.color}40` }}
                >
                  {isPlaying ? (
                      <Pause size={28} fill="currentColor" style={{ color: currentTrack.color }} />
                  ) : (
                      <Play size={28} fill="currentColor" className="ml-1" style={{ color: currentTrack.color }} />
                  )}
                </button>

                <button onClick={handleNext} className="text-stone-400 hover:text-white transition-colors transform hover:translate-x-1"><SkipForward size={24} /></button>
             </div>
             
             <audio 
                ref={audioRef} 
                src={encodeUrl(currentTrack.filename)} 
                onEnded={handleNext}
                crossOrigin="anonymous"
             />
          </div>
        </div>

        {/* Right Panel: Lore & Stats */}
        <div className="hidden xl:block w-1/4 h-[600px] flex flex-col gap-4">
          <div className="bg-stone-900/80 border border-stone-700 rounded-lg p-6 flex-1 backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4" style={{ color: currentTrack.color }}>
              <Moon size={20} className={corruption > 50 ? "animate-spin-slow" : ""} />
              <h3 className="font-bold uppercase tracking-widest text-sm font-cinzel">Sanity Check</h3>
            </div>
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-xs mb-1 text-stone-500">
                  <span>Corruption Level</span>
                  <span className={`${corruption > 80 ? "text-red-500 font-bold animate-pulse" : "text-stone-400"}`}>{corruption}%</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden border border-stone-700">
                  <div 
                    className={`h-full transition-all duration-500`} 
                    style={{ width: `${corruption}%`, backgroundColor: currentTrack.color }}
                  ></div>
                </div>
              </div>
              
              <div className={`p-4 bg-black/40 rounded border border-stone-800 mt-8 transition-all duration-700 ${isDeciphered ? 'opacity-100 translate-y-0' : 'opacity-30 blur-sm translate-y-4'}`}>
                 <h4 className="font-bold mb-2 text-sm flex items-center gap-2" style={{ color: currentTrack.color }}>
                   <AlertTriangle size={14} /> 
                   {isDeciphered ? "Artifact Lore" : "Encrypted Data"}
                 </h4>
                 <p className="text-stone-400 text-xs leading-5">
                   {isDeciphered ? currentTrack.lore : "Perform Divination to reveal usage instructions..."}
                 </p>
              </div>

              <div className="mt-auto pt-8 text-center opacity-60">
                 <Skull size={48} className={`mx-auto text-stone-800 mb-2 ${corruption > 90 ? 'animate-bounce text-red-900' : ''}`} />
                 <p className="text-[10px] text-stone-600 uppercase tracking-[0.2em] font-cinzel">Praise The Fool</p>
              </div>
            </div>
            
            {/* Background Texture for Stats */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"></div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1c1917; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #44403c; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }

        @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glitch { 
            0% { transform: translate(0) } 
            20% { transform: translate(-2px, 2px) } 
            40% { transform: translate(-2px, -2px) } 
            60% { transform: translate(2px, 2px) } 
            80% { transform: translate(2px, -2px) } 
            100% { transform: translate(0) }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
        }

        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-glitch { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
}
