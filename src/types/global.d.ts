export {};

declare global {
  interface Window {
    rollbar: Rollbar;
  }
}
