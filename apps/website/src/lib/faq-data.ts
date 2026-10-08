export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does Tonely synthesize UI sound effects without MP3 or WAV files?",
    answer:
      "Tonely uses the browser's native Web Audio API oscillators, biquad filters, and exponential gain ramps. Instead of loading static audio media files over the network, every chime, click, pop, and tone is computed mathematically at runtime in microseconds.",
  },
  {
    question: "Why is procedural Web Audio better than traditional audio assets?",
    answer:
      "Traditional audio assets require HTTP network requests that introduce 120ms to 450ms of network latency on the first play, consume bandwidth, and introduce cross-origin and asset-path headaches. Tonely has 0 KB audio assets, triggers with < 1ms latency, and adds under 1.5 KB gzipped to your total bundle.",
  },
  {
    question: "Is Tonely safe for Next.js SSR, React Server Components, and Server Actions?",
    answer:
      "Yes. Tonely is 100% isomorphic and SSR-safe. In server environments (such as Node.js, Next.js Server Components, or Edge runtimes) where window and AudioContext are undefined, Tonely gracefully acts as a silent no-op without throwing errors or breaking hydration.",
  },
  {
    question: "How does Tonely handle browser autoplay audio policies?",
    answer:
      "Modern browsers require a user interaction (like a click, tap, or keypress) before permitting audio output. Tonely automatically manages AudioContext state, resuming suspended contexts upon user gestures so sound feedback plays cleanly without developer boilerplate.",
  },
  {
    question: "Can I map sound effects directly from HTTP status codes?",
    answer:
      "Yes. Tonely provides tonely.fromStatus(statusCode) and tonely.wrapFetch(). An HTTP 200/201 response automatically triggers a harmonic success chime, while 4xx and 5xx errors trigger gentle warning double-tones.",
  },
  {
    question: "What is the bundle size impact of Tonely?",
    answer:
      "Tonely has zero runtime dependencies and is smaller than 1.5 KB gzipped (less than 4 KB uncompressed). It is significantly smaller than a typical single icon SVG or standard audio library like Howler.js.",
  },
];
