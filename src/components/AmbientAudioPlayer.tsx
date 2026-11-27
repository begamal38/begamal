import { useCallback, useEffect, useRef, useState } from "react";
import { SpeakerSimpleHigh, SpeakerSimpleX, X } from "@phosphor-icons/react";
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
  const [promptVisible, setPromptVisible] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

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
    const onScroll = () => {
      setIsScrolledPastHero(window.scrollY > 220);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_PROMPT_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    const showTimer = window.setTimeout(() => {
      if (!isPlayingRef.current) {
        setPromptVisible(true);
      }
    }, 900);

    const hideTimer = window.setTimeout(() => {
      setPromptVisible(false);
      try {
        sessionStorage.setItem(STORAGE_PROMPT_KEY, "1");
      } catch {
        // Ignore storage restrictions
      }
    }, 15000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const dismissPrompt = useCallback(() => {
    setPromptVisible(false);
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

  const cueEyebrow = lang === "en" ? "AMBIENT SCORE" : "تجربة صوتية";
  const cueBody =
    lang === "en"
      ? "Tap to experience with organ sound"
      : "اضغط لتشغيل الموسيقى المحيطية";
  const mobileCue = lang === "en" ? "TAP SOUND" : "شغّل الصوت";
  const dismissLabel = lang === "en" ? "Dismiss sound hint" : "إخفاء تنبيه الصوت";
  const pillHint = lang === "en" ? "SOUND" : "الصوت";
  const showMobileLabel = promptVisible && !isPlaying && !isScrolledPastHero;

  return (
    <div className="fixed bottom-[max(4.65rem,calc(4.35rem+env(safe-area-inset-bottom)))] end-3 z-[110] flex flex-col items-end md:bottom-6 md:end-6">
      {/* Desktop: Luxury Editorial Whisper Card above the speaker control */}
      <div
        role="status"
        aria-live="polite"
        className={`relative mb-2.5 hidden w-max max-w-[270px] transition-all duration-500 ease-out md:block ${
          promptVisible && !isPlaying
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <div
          onClick={handleToggle}
          className="group relative cursor-pointer rounded-2xl border border-[#A1A6B0]/35 bg-[#0D1017]/95 px-3.5 py-2.5 pe-8 shadow-[0_14px_38px_rgba(0,0,0,0.78),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-colors duration-300 ease-out hover:border-[#E5E7EB]/60"
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5E7EB] shadow-[0_0_8px_rgba(229,231,235,0.85)]"
            />
            <span className="font-mono-code text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4D7DD]">
              {cueEyebrow}
            </span>
          </div>
          <p className="mt-1 text-xs leading-snug text-[#F4F5F7]">
            {cueBody}
          </p>

          <button
            type="button"
            aria-label={dismissLabel}
            onClick={(e) => {
              e.stopPropagation();
              dismissPrompt();
            }}
            className="absolute end-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[#9CA3AF] transition-colors duration-200 hover:bg-white/10 hover:text-[#F4F5F7]"
          >
            <X size={11} weight="bold" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={ariaLabel}
        aria-pressed={isPlaying}
        className="group relative flex h-9 items-center gap-2 rounded-full border border-[#A1A6B0]/35 bg-[#0A0A0C]/90 px-2.5 text-[#E5E7EB] shadow-[0_10px_28px_rgba(0,0,0,0.68),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-md transition-all duration-300 ease-out hover:border-[#E5E7EB]/65 hover:bg-[#111318]/95 active:scale-[0.97] md:h-10 md:gap-2.5 md:px-3.5"
      >
        {!isPlaying && (
          <span
            aria-hidden="true"
            className="audio-halo-ring pointer-events-none absolute inset-0 rounded-full border border-[#E5E7EB]/45"
          />
        )}

        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#E5E7EB]">
          {isPlaying ? (
            <SpeakerSimpleHigh size={15} weight="regular" />
          ) : (
            <SpeakerSimpleX size={15} weight="regular" className="text-[#D4D7DD]" />
          )}
        </span>

        {/* 4 ultra-thin animated silver audio bars */}
        <span
          aria-hidden="true"
          className="flex h-3.5 items-end gap-[2.5px]"
        >
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-1 h-3" : "h-[4px] opacity-55"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-2 h-3.5" : "h-[7px] opacity-70"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-3 h-2.5" : "h-[5px] opacity-55"
            }`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#E5E7EB] transition-all duration-300 ${
              isPlaying ? "audio-bar audio-bar-4 h-3" : "h-[3px] opacity-45"
            }`}
          />
        </span>

        {/* Mobile: ultra-compact hint on first hero view, collapses to icon+bars on scroll */}
        <span
          className={`overflow-hidden whitespace-nowrap font-mono-code text-[10px] font-medium tracking-[0.1em] text-[#D4D7DD] transition-all duration-300 ease-out md:hidden ${
            showMobileLabel ? "max-w-[96px] opacity-100 pe-0.5" : "max-w-0 opacity-0"
          }`}
        >
          {mobileCue}
        </span>

        {/* Desktop compact pill label */}
        <span className="hidden font-mono-code text-[10px] font-medium tracking-[0.14em] text-[#D4D7DD] md:inline">
          {pillHint}
        </span>
      </button>
    </div>
  );
}
