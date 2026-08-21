export type PublicDemoErrorEvent = "confirmation-audio-unavailable";

/**
 * Privacy boundary for optional public-demo diagnostics.
 *
 * Event names are fixed and this function deliberately accepts no error object,
 * vote state, candidate, number, identifier, or other user-provided value.
 * There is no production transport until a monitoring provider and its privacy
 * controls have been explicitly approved.
 */
export function reportPublicDemoError(event: PublicDemoErrorEvent) {
  if (import.meta.env.DEV) {
    console.warn(`[public-demo diagnostic] ${event}`);
  }
}
