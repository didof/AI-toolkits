# The Dev Drop — Vol. 01

**Grazie per esserti iscritto.**  
Prometto di non spammare roba a caso.

---

## 🔧 Tool of the Week  
**Name:** DevSnip  
**What:** Browser extension that saves code snippets with one click.  
**Why:** Because copy-pasting from Stack Overflow gets old fast.

---

## 📦 JS Snippet  
**Title:** Debounce a Function (useful for search inputs)

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage
const log = debounce(() => console.log("Typing..."), 300);
document.querySelector("input").addEventListener("input", log);
