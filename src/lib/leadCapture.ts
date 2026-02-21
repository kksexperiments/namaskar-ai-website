import { supabase } from "@/integrations/supabase/client";

export type LeadPathUsed = "endpoint" | "supabase_fallback";

export interface SubmitLeadResult {
  ok: boolean;
  pathUsed: LeadPathUsed | null;
  error?: string;
  duplicate?: boolean;
}

interface SubmitLeadOptions {
  endpoint?: string;
  endpointPayload?: Record<string, unknown>;
  fallbackTable: "waitlist_fallback_submissions" | "newsletter_subscribers";
  fallbackPayload: Record<string, unknown>;
  timeoutMs?: number;
  treatFallbackDuplicateAsSuccess?: boolean;
}

const toErrorMessage = (value: unknown): string => {
  if (value instanceof Error) {
    return value.message;
  }

  return String(value);
};

const postToEndpoint = async (
  endpoint: string,
  payload: Record<string, unknown>,
  timeoutMs: number,
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });

    let responseBody: { ok?: boolean; error?: string } | null = null;
    try {
      responseBody = (await response.json()) as { ok?: boolean; error?: string };
    } catch {
      responseBody = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        error: responseBody?.error || `Endpoint request failed (${response.status})`,
      };
    }

    if (responseBody?.ok === false) {
      return {
        ok: false,
        error: responseBody.error || "Endpoint rejected submission.",
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: toErrorMessage(error),
    };
  }
};

export const submitLead = async ({
  endpoint,
  endpointPayload,
  fallbackTable,
  fallbackPayload,
  timeoutMs = 15_000,
  treatFallbackDuplicateAsSuccess = false,
}: SubmitLeadOptions): Promise<SubmitLeadResult> => {
  let endpointError: string | undefined;

  if (endpoint && endpointPayload) {
    const endpointResult = await postToEndpoint(endpoint, endpointPayload, timeoutMs);
    if (endpointResult.ok) {
      return {
        ok: true,
        pathUsed: "endpoint",
      };
    }

    endpointError = endpointResult.error;
  }

  const { error: fallbackError } = await supabase.from(fallbackTable).insert([fallbackPayload]);

  if (fallbackError) {
    if (treatFallbackDuplicateAsSuccess && fallbackError.code === "23505") {
      return {
        ok: true,
        duplicate: true,
        pathUsed: "supabase_fallback",
      };
    }

    const fallbackMessage = toErrorMessage(fallbackError.message || fallbackError);
    return {
      ok: false,
      pathUsed: null,
      error: endpointError ? `${endpointError} | fallback failed: ${fallbackMessage}` : fallbackMessage,
    };
  }

  return {
    ok: true,
    pathUsed: "supabase_fallback",
  };
};
