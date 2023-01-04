const API_URI: string = 'http://178.128.253.62/backend';

export function Url(url: string): string {
  return `${API_URI}${url}`;
}

export const ApiEndpoints = {} as const;
