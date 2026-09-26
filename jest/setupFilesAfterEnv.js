import "@testing-library/jest-dom";

// jsdom does not implement matchMedia; the app uses it only for responsive
// focus management (useMediaQuery). Defaults to "desktop" (no match).
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
}
