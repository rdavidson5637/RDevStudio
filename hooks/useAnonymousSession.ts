"use client";

import { useCallback, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AnonymousSession = {
  userId: string | null;
  ready: boolean;
  error: string | null;
  ensure: () => Promise<string | null>;
};

export function useAnonymousSession(): AnonymousSession {
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inflight = useRef<Promise<string | null> | null>(null);

  const ensure = useCallback(async () => {
    if (userId) return userId;
    if (inflight.current) return inflight.current;

    inflight.current = (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: existing } = await supabase.auth.getSession();
        if (existing.session?.user.id) {
          setUserId(existing.session.user.id);
          setReady(true);
          setError(null);
          return existing.session.user.id;
        }

        const { data, error: signInError } = await supabase.auth.signInAnonymously();
        if (signInError || !data.user) {
          const message = signInError?.message?.includes("anonymous")
            ? "Anonymous sign-in is disabled on this project. Enable it in the Supabase dashboard under Authentication > Providers > Anonymous."
            : signInError?.message || "Could not start a session.";
          setError(message);
          setReady(true);
          return null;
        }

        setUserId(data.user.id);
        setReady(true);
        setError(null);
        return data.user.id;
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : "Could not start a session.";
        setError(message);
        setReady(true);
        return null;
      } finally {
        inflight.current = null;
      }
    })();

    return inflight.current;
  }, [userId]);

  return { userId, ready, error, ensure };
}
