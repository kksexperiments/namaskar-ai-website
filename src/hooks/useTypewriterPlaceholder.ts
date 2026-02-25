import { useEffect, useMemo, useState } from "react";

interface UseTypewriterPlaceholderOptions {
  enabled?: boolean;
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
  restartDelayMs?: number;
}

export const useTypewriterPlaceholder = (
  phrases: string[],
  options: UseTypewriterPlaceholderOptions = {}
) => {
  const {
    enabled = true,
    typingMs = 65,
    deletingMs = 38,
    pauseMs = 1100,
    restartDelayMs = 240,
  } = options;

  const safePhrases = useMemo(
    () => phrases.map((phrase) => phrase.trim()).filter(Boolean),
    [phrases]
  );

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || safePhrases.length === 0) {
      setText("");
      setIsDeleting(false);
      setPhraseIndex(0);
      return;
    }

    const currentPhrase = safePhrases[phraseIndex % safePhrases.length];

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting) {
        if (text === currentPhrase) {
          setIsDeleting(true);
          return;
        }

        setText(currentPhrase.slice(0, text.length + 1));
        return;
      }

      if (text.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((value) => (value + 1) % safePhrases.length);
        return;
      }

      setText(currentPhrase.slice(0, Math.max(0, text.length - 1)));
    }, (() => {
      if (!isDeleting && text === currentPhrase) return pauseMs;
      if (isDeleting && text.length === 0) return restartDelayMs;
      return isDeleting ? deletingMs : typingMs;
    })());

    return () => window.clearTimeout(timeoutId);
  }, [
    deletingMs,
    enabled,
    isDeleting,
    pauseMs,
    phraseIndex,
    restartDelayMs,
    safePhrases,
    text,
    typingMs,
  ]);

  if (safePhrases.length === 0) {
    return "";
  }

  if (!enabled) {
    return safePhrases[0];
  }

  return text || safePhrases[phraseIndex % safePhrases.length].slice(0, 1);
};

export default useTypewriterPlaceholder;
