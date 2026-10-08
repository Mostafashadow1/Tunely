import { soundFromStatus } from './status';
import type { TonelyInstance, SoundOptions } from '../types';

/**
 * Wraps a standard window.fetch function to automatically trigger
 * sound feedback based on response status code (e.g. 200 -> success, 4xx/5xx -> error).
 */
export function createFetchWrapper(tonely: TonelyInstance) {
  return function wrappedFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
    soundOptions?: SoundOptions
  ): Promise<Response> {
    const fetchFn = typeof window !== 'undefined' ? window.fetch : globalThis.fetch;
    return fetchFn(input, init)
      .then((res) => {
        tonely.fromStatus(res.status, soundOptions);
        return res;
      })
      .catch((err) => {
        tonely.error(soundOptions);
        throw err;
      });
  };
}

/**
 * Wraps any asynchronous promise to play success chime when resolved,
 * and error warning when rejected.
 */
export function trackPromise<T>(
  tonely: TonelyInstance,
  promise: Promise<T>,
  options?: SoundOptions
): Promise<T> {
  return promise
    .then((result) => {
      tonely.success(options);
      return result;
    })
    .catch((err) => {
      tonely.error(options);
      throw err;
    });
}

