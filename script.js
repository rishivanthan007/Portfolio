const words = [
  "Builder.",
  "AI Hacker.",
  "Freelancer.",
  "Student.",
  "Content Creator.",
  "Future Startup Founder.",
];

const target = document.querySelector("#typewriter");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!target) return;

  const word = words[wordIndex];
  target.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex += 1;
    setTimeout(typeLoop, 82);
    return;
  }

  if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(typeLoop, 1050);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 42);
    return;
  }

  deleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  setTimeout(typeLoop, 240);
}

typeLoop();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".section-reveal").forEach((section, index) => {
  section.style.transitionDelay = `${Math.min(index * 80, 420)}ms`;
  revealObserver.observe(section);
});

document.querySelectorAll(".sticker-wall span").forEach((sticker) => {
  sticker.addEventListener("pointermove", (event) => {
    const rect = sticker.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    sticker.style.setProperty("--nudge-x", `${x.toFixed(2)}px`);
    sticker.style.setProperty("--nudge-y", `${y.toFixed(2)}px`);
  });

  sticker.addEventListener("pointerleave", () => {
    sticker.style.removeProperty("--nudge-x");
    sticker.style.removeProperty("--nudge-y");
  });

  sticker.addEventListener("click", (event) => {
    sticker.classList.remove("is-tapped");
    void sticker.offsetWidth;
    sticker.classList.add("is-tapped");

    const pop = document.createElement("span");
    pop.className = "skill-pop";
    pop.style.left = `${event.clientX}px`;
    pop.style.top = `${event.clientY}px`;
    document.body.appendChild(pop);
    pop.addEventListener("animationend", () => pop.remove(), { once: true });
  });
});
