import { env } from './env';

export class HttpError extends Error {
  public readonly status: number;
  public readonly requestId?: string;
  public readonly details?: unknown;

  constructor(message: string, status: number, requestId?: string, details?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.requestId = requestId;
    this.details = details;
  }
}

export interface HttpClientOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  timeoutMs?: number;
}

interface BackendErrorBody {
  error?: {
    code?: string;
    message?: string;
    requestId?: string;
    details?: unknown;
  };
}

/**
 * Cliente HTTP fino sobre `fetch`, preparado para consumir a API do
 * `barberless-backend`: aplica a URL base, timeout configurável via
 * `AbortController` e normaliza tanto erros de rede quanto o formato de
 * erro padronizado do backend (`{ error: { code, message, requestId } }`)
 * em uma única classe `HttpError`.
 *
 * Nesta fase não há chamadas de negócio reais — este client existe como
 * fundação para as próximas fases (autenticação, agenda, etc.).
 */
export async function httpClient<TResponse>(
  path: string,
  { body, timeoutMs = env.NEXT_PUBLIC_API_TIMEOUT_MS, headers, ...init }: HttpClientOptions = {},
): Promise<TResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      let parsedBody: BackendErrorBody = {};
      try {
        parsedBody = (await response.json()) as BackendErrorBody;
      } catch {
        // corpo não é JSON válido — segue com mensagem genérica
      }

      throw new HttpError(
        parsedBody.error?.message ?? `Requisição falhou com status ${response.status}.`,
        response.status,
        parsedBody.error?.requestId,
        parsedBody.error?.details,
      );
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return (await response.json()) as TResponse;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new HttpError(`Tempo limite de ${timeoutMs}ms excedido.`, 408);
    }

    throw new HttpError(error instanceof Error ? error.message : 'Erro de rede desconhecido.', 0);
  } finally {
    clearTimeout(timeout);
  }
}
