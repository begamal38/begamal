import { useCallback, useEffect, useRef, useState } from "react";
import { SpeakerSimpleHigh, SpeakerSimpleX } from "@phosphor-icons/react";
import { Lang } from "../data/portfolioData";

interface AmbientAudioPlayerProps {
  lang: Lang;
}

const AUDIO_SRC = "/audio/ambient-organ.mp3";
const STORAGE_PREF_KEY = "begamal_ambient_audio";
const STORAGE_PROMPT_KEY = "begamal_audio_prompt_seen";
const TARGET_GAIN = 0.3;
const FADE_IN_DURATION = 1.8;
const FADE_OUT_DURATION = 0.8;

/**
 * Ambient Interstellar-organ background audio controller using Web Audio API
 * for gapless looping, smooth gain ramping, tab-visibility ducking, and
 * showreel playback ducking. Starts muted/paused per browser autoplay policy.
 */
export function AmbientAudioPlayer({ lang }: AmbientAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_PROMPT_KEY) !== "1";
    } catch {
      return true;
    }
  });

  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const loadingPromiseRef = useRef<Promise<AudioBuffer | null> | null>(null);
  const userEnabledRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!showPrompt) return;
    const timer = window.setTimeout(() => {
      setShowPrompt(false);
      try {
        sessionStorage.setItem(STORAGE_PROMPT_KEY, "1");
      } catch {
        // Ignore storage restrictions
      }
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [showPrompt]);

  const dismissPrompt = useCallback(() => {
    setShowPrompt(false);
    try {
      sessionStorage.setItem(STORAGE_PROMPT_KEY, "1");
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const ensureAudioReady = useCallback(async (): Promise<{
    ctx: AudioContext;
    gain: GainNode;
    buffer: AudioBuffer | null;
  } | null> => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return null;

      if (!ctxRef.current) {
        const ctx = new AudioCtx();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.connect(ctx.destination);
        ctxRef.current = ctx;
        gainRef.current = gain;
      }

      const ctx = ctxRef.current;
      const gain = gainRef.current!;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (!bufferRef.current) {
        if (!loadingPromiseRef.current) {
          loadingPromiseRef.current = fetch(AUDIO_SRC)
            .then((res) => {
              if (!res.ok) return null;
              return res.arrayBuffer();
            })
            .then((arr) => (arr ? ctx.decodeAudioData(arr) : null))
            .then((decoded) => {
              bufferRef.current = decoded;
              return decoded;
            })
            .catch(() => null);
        }
        await loadingPromiseRef.current;
      }

      return { ctx, gain, buffer: bufferRef.current };
    } catch {
      return null;
    }
  }, []);

  const stopSourceNode = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
      } catch {
        // Already stopped
      }
      sourceRef.current = null;
    }
  }, []);

  const fadeInAndPlay = useCallback(
    async (duration = FADE_IN_DURATION) => {
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }

      const ready = await ensureAudioReady();
      if (!ready || !ready.buffer) {
        setIsPlaying(false);
        return;
      }

      const { ctx, gain, buffer } = ready;

      if (!sourceRef.current) {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        source.start(0);
        sourceRef.current = source;
      }

      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      const currentGain = Math.max(0.0001, gain.gain.value);
      gain.gain.setValueAtTime(currentGain, now);
      gain.gain.linearRampToValueAtTime(TARGET_GAIN, now + duration);
      setIsPlaying(true);
    },
    [ensureAudioReady]
  );

  const fadeOutAndPause = useCallback(
    (duration = FADE_OUT_DURATION) => {
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }

      const ctx = ctxRef.current;
      const gain = gainRef.current;
      if (!ctx || !gain) {
        setIsPlaying(false);
        return;
      }

      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), now);
      gain.gain.linearRampToValueAtTime(0.0001, now + duration);
      setIsPlaying(false);

      fadeTimerRef.current = window.setTimeout(() => {
        stopSourceNode();
        fadeTimerRef.current = null;
      }, Math.round(duration * 1000) + 40);
    },
    [stopSourceNode]
  );

  const handleToggle = useCallback(() => {
    dismissPrompt();
    if (isPlayingRef.current) {
      userEnabledRef.current = false;
      try {
        sessionStorage.setItem(STORAGE_PREF_KEY, "off");
      } catch {
        // Ignore storage errors
      }
      fadeOutAndPause(FADE_OUT_DURATION);
    } else {
      userEnabledRef.current = true;
      try {
        sessionStorage.setItem(STORAGE_PREF_KEY, "on");
      } catch {
        // Ignore storage errors
      }
      void fadeInAndPlay(FADE_IN_DURATION);
    }
  }, [dismissPrompt, fadeInAndPlay, fadeOutAndPause]);

  // Smart UX ducking on tab visibility change & Showreel launch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlayingRef.current) {
          fadeOutAndPause(0.5);
        }
      } else if (userEnabledRef.current && !isPlayingRef.current) {
        void fadeInAndPlay(1.2);
      }
    };

    const handleShowreelPlay = () => {
      if (isPlayingRef.current) {
        userEnabledRef.current = false;
        try {
          sessionStorage.setItem(STORAGE_PREF_KEY, "off");
        } catch {
          // Ignore storage errors
        }
        fadeOutAndPause(0.6);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("begamal:showreel-play", handleShowreelPlay);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("begamal:showreel-play", handleShowreelPlay);
    };
  }, [fadeInAndPlay, fadeOutAndPause]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
      }
      stopSourceNode();
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
    };
  }, [stopSourceNode]);

  const ariaLabel =
    lang === "en"
      ? isPlaying
        ? "Mute ambient audio"
        : "Play ambient audio"
      : isPlaying
        ? "كتم الصوت المحيطي"
        : "تشغيل الصوت المحيطي";

  const promptText =
    lang === "en" ? "SOUND · IMMERSIVE MODE" : "الصوت · أجواء سينمائية";

  return (
    <div className="fixed bottom-[max(4.75rem,calc(4.5rem+env(safe-area-inset-bottom)))] end-4 z-40 md:bottom-6 md:end-6">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={ariaLabel}
        aria-pressed={isPlaying}
        className="group relative flex h-10 items-center gap-2.5 rounded-full border border-[#A1A6B0]/30 bg-[#0A0A0C]/85 px-3 text-[#E5E7EB] shadow-[0_10px_28px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[#E5E7EB]/60 hover:bg-[#111318]/92 active:scale-[0.97]"
      >
        {showPrompt && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[3px] rounded-full border border-[#E5E7EB]/35 animate-pulse"
          />
        )}

        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#E5E7EB]">
          {isPlaying ? (
            <SpeakerSimpleHigh size={15} weight="regular" />
          ) : (
            <SpeakerSimpleX size={15} weight="regular" className="text-[#A1A6B0]" />
          )}
        </span>

        {/* 4 ultra-thin animated silver audio bars */}
        <span
          aria-hidden="true"
          className="flex h-3.5 items-end gap-[2.5px]"
        >
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-1 h-3" : "h-[3px] opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-2 h-3.5" : "h-[3px] opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-3 h-2.5" : "h-[3px] opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-4 h-3" : "h-[3px] opacity-40"
            }`}
          />
        </span>

        {/* First-visit subtle micro-label that auto-collapses */}
        <span
          className={`overflow-hidden whitespace-nowrap font-mono-code text-[10px] font-medium tracking-[0.14em] text-[#D4D7DD] transition-all duration-500 ${
            showPrompt
              ? "max-w-[200px] opacity-100 ps-0.5 pe-1"
              : "max-w-0 opacity-0"
          }`}
        >
          {promptText}
        </span>
      </button>
    </div>
  );
}
