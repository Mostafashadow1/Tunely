import type { SoundName } from '../types';

/**
 * Maps an HTTP status code to an appropriate UI sound:
 * - 2xx (200 OK, 201 Created, 204 No Content) -> 'success'
 * - 4xx / 5xx (400 Bad Request, 401 Unauthorized, 404, 500) -> 'error'
 * - 3xx / 1xx -> 'info'
 */
export function soundFromStatus(status: number): SoundName {
  if (status >= 200 && status < 300) {
    return 'success';
  }
  if (status >= 400 && status < 600) {
    return 'error';
  }
  return 'info';
}
