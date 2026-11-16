// Keep "Show results" disabled until every question has an answer.
// quiz.css already greys the button out, but CSS alone can't stop a keyboard user from pressing it.
for (const form of document.querySelectorAll("form")) {
  const toggle = form.querySelector(".finish-toggle");
  if (!toggle) continue;

  const update = () => {
    toggle.disabled = [...form.querySelectorAll("fieldset")].some(
      (question) => !question.querySelector("input:checked")
    );
  };

  form.addEventListener("change", update);
  // The reset event fires before the inputs are cleared, so re-check right after.
  form.addEventListener("reset", () => setTimeout(update));
  // Browsers can restore earlier answers when you come back to the page.
  window.addEventListener("pageshow", update);
  update();
}
