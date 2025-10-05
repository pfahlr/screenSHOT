import { Browser } from "wxt/browser";

export default defineBackground(() => {
  // Setup listener for one-time messages
  browser.runtime.onMessage.addListener((message, _, sendResponse) => {
    // Only respond to hello messages
    if (message.type === "shoot") {
      if (message.name == "page") {
        sendResponse("YEAH!... the whole page... let's do that SHOT...");
      }
      else if (message.name == "screen") {
        sendResponse("The worlds not ready, but we're gonna do a shot anyway. Only the visible screen though.")
      }
      return true;
    }
  });

  // Setup broadcast channel to send messages to all connected ports
  let ports: Browser.runtime.Port[] = [];
  setInterval(() => {
    const message = { date: Date.now(), value: Math.random() };
    ports.forEach((port) => port.postMessage(message));
  }, 1e3);
  browser.runtime.onConnect.addListener((port) => {
    ports.push(port);
    port.onDisconnect.addListener(() => {
      ports.splice(ports.indexOf(port), 1);
    });
  });
});
