import { env } from './env';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
    /** Código estable del backend (ej. `EMAIL_NOT_VERIFIED`, `INVALID_CREDENTIALS`). */
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type ApiInit = RequestInit & {
  /** Access token a adjuntar como `Authorization: Bearer <token>`. */
  token?: string;
};

export async function api<T>(path: string, init?: ApiInit): Promise<T> {
  const { token, headers, ...rest } = init ?? {};

  const res = await fetch(`${env.apiUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(res.status, body?.error ?? res.statusText, body?.details, body?.code);
  }

  return body as T;
}

/**
 * Distingue "sesión muerta → redirigir a login" de un error de negocio normal
 * (stock insuficiente, validación, etc.), que sí debe mostrarse como tal.
 */
export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}
