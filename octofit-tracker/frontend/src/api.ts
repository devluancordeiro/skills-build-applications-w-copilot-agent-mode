const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

function deriveCodespaceHost(): string | null {
  if (codespaceName) {
    return `${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  const hostname = window.location.hostname;
  const codespaceHost = hostname.replace(/-5173\.app\.github\.dev$/, '-8000.app.github.dev');
  return codespaceHost === hostname ? null : codespaceHost;
}

const derivedHost = deriveCodespaceHost();

export const API_HOST = derivedHost
  ? `https://${derivedHost}`
  : 'http://localhost:8000';

export const API_ROOT = `${API_HOST}/api`;

export function buildApiUrl(resource: string): string {
  return `${API_ROOT}/${resource}`;
}

export function normalizeApiResponse(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const envelope =
      (payload as Record<string, unknown>).data ??
      (payload as Record<string, unknown>).results ??
      (payload as Record<string, unknown>).items ??
      (payload as Record<string, unknown>).docs;

    if (Array.isArray(envelope)) {
      return envelope;
    }
  }

  return [payload];
}
