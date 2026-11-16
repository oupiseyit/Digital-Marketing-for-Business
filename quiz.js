// Shared by every quiz page and learn.html: language switch, shuffling, and the "Show results" lock.

const LANGS = { both: "English + ខ្មែរ", km: "ខ្មែរ", en: "English" };

const shuffled = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Wrap the English text of a question and answer in <span class="en"> so CSS can hide it.
// Legend: "<span.n>01</span> English<span.km>Khmer</span>".
// Explain: "<b>Answer:</b> English<br>ចម្លើយ៖ Khmer".
function tagLanguages(fieldset) {
  const wrap = (nodes, cls) => {
    if (!nodes.length) return;
    const span = document.createElement("span");
    span.className = cls;
    nodes[0].before(span);
    span.append(...nodes);
  };
  const legend = fieldset.querySelector("legend");
  wrap(
    [...legend.childNodes].filter(
      (n) =>
        n.textContent.trim() &&
        !n.classList?.contains("n") &&
        !n.classList?.contains("km")
    ),
    "en"
  );
  const explain = fieldset.querySelector(".explain");
  const br = explain?.querySelector("br");
  if (br) {
    const nodes = [...explain.childNodes];
    const i = nodes.indexOf(br);
    wrap(nodes.slice(0, i), "en");
    wrap(nodes.slice(i + 1), "km-a");
  }
  // An option that reads the same in both languages (e.g. "Omni"): show it once, in every mode.
  for (const en of fieldset.querySelectorAll("label .en")) {
    const km = en.nextElementSibling;
    if (
      km?.classList.contains("km") &&
      km.textContent.trim() === en.textContent.trim()
    ) {
      km.remove();
      en.classList.remove("en");
    }
  }
}

function setLang(lang) {
  document.documentElement.dataset.lang = lang;
  try {
    localStorage.setItem("quiz-lang", lang);
  } catch {}
}

function setupQuiz(form) {
  const questions = [...form.querySelectorAll("fieldset")].map((el) => {
    tagLanguages(el);
    return { el, labels: [...el.querySelectorAll("label")] };
  });
  const bar = form.querySelector(".result");

  const tools = document.createElement("div");
  tools.className = "tools";
  tools.innerHTML = `
    <label>Language · ភាសា
      <select>${Object.entries(LANGS)
        .map(([v, t]) => `<option value="${v}">${t}</option>`)
        .join("")}</select>
    </label>
    <label><input type="checkbox" class="shuffle-q"> Random questions · សំណួរចៃដន្យ</label>
    <label><input type="checkbox" class="shuffle-o"> Random options · ជម្រើសចៃដន្យ</label>`;
  form.before(tools);

  const select = tools.querySelector("select");
  select.value = document.documentElement.dataset.lang;
  select.onchange = () => setLang(select.value);

  const shuffleQ = tools.querySelector(".shuffle-q");
  const shuffleO = tools.querySelector(".shuffle-o");
  const arrange = () => {
    for (const q of shuffleQ.checked ? shuffled(questions) : questions) {
      const labels = shuffleO.checked ? shuffled(q.labels) : q.labels;
      q.el.querySelector(".explain").before(...labels);
      form.insertBefore(q.el, bar); // the result bar must stay last for the CSS counters
    }
  };
  shuffleQ.onchange = shuffleO.onchange = arrange;

  // Keep "Show results" disabled until every question has an answer.
  // quiz.css already greys the button out, but CSS alone can't stop a keyboard user from pressing it.
  const toggle = form.querySelector(".finish-toggle");
  const update = () => {
    if (toggle)
      toggle.disabled = questions.some(
        (q) => !q.el.querySelector("input:checked")
      );
  };
  form.addEventListener("change", update);
  // The reset event fires before the inputs are cleared, so re-check (and reshuffle) right after.
  form.addEventListener("reset", () =>
    setTimeout(() => {
      update();
      arrange();
    })
  );
  // Browsers can restore earlier answers when you come back to the page.
  window.addEventListener("pageshow", update);
  update();
}

let saved = null;
try {
  saved = localStorage.getItem("quiz-lang");
} catch {}
document.documentElement.dataset.lang = saved in LANGS ? saved : "both";

// learn.html builds its form after loading, so it calls setupQuiz itself.
for (const form of document.querySelectorAll("form")) {
  if (form.querySelector("fieldset")) setupQuiz(form);
}
