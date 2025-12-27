export async function fetchJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || response.statusText || 'Request failed';
    throw new Error(message);
  }

  return data as T;
}

export type PaginatedResponse<T> = {
  items: T[];
  nextCursor: string | null;
};

export type DetailResponse<T> = {
  item: T;
};
