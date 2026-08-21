import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

class AudioStub {
  currentTime = 0;
  error: MediaError | null = null;

  addEventListener() {}

  removeEventListener() {}

  pause() {}

  play() {
    return Promise.resolve();
  }
}

Object.defineProperty(globalThis, "Audio", {
  configurable: true,
  value: AudioStub,
});

afterEach(() => {
  cleanup();
});
