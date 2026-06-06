const button = document.getElementById("checkButton");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  const currentTime = new Date().toLocaleTimeString("sl-SI");

  message.textContent = `Aplikacija deluje. Preverjeno ob ${currentTime}.`;
});