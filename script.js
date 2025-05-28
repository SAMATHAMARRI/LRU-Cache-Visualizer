let cache = new Map();
let capacity = 0;

function updateCacheDisplay(highlightKey = null, removedKey = null) {
  const display = document.getElementById("cacheDisplay");
  display.innerHTML = "";
  cache.forEach((value, key) => {
    const node = document.createElement("div");
    node.className = "cache-node";
    node.innerText = `${key}:${value}`;
    if (key === highlightKey) node.classList.add("highlight");
    if (key === removedKey) node.classList.add("removed");
    display.appendChild(node);
  });
}

function showMessage(msg, type = 'info') {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = msg;
  messageDiv.style.color = type === 'error' ? '#ff7675' : '#55efc4';
}

function putInCache() {
  const capInput = document.getElementById("capacity");
  const keyInput = document.getElementById("key");
  const valueInput = document.getElementById("value");
  const k = keyInput.value.trim();
  const v = valueInput.value.trim();

  if (capInput.value) capacity = parseInt(capInput.value);
  if (!k || !v || capacity <= 0) {
    showMessage("Please enter valid key, value, and capacity", 'error');
    return;
  }

  let removedKey = null;
  if (cache.has(k)) {
    cache.delete(k);
    showMessage(`Updated existing key: ${k}`);
  } else if (cache.size >= capacity) {
    removedKey = cache.keys().next().value;
    cache.delete(removedKey);
    showMessage(`Capacity full. Removed least recently used key: ${removedKey}`);
  } else {
    showMessage(`Added key: ${k}`);
  }

  cache.set(k, v);
  updateCacheDisplay(k, removedKey);
}

function getFromCache() {
  const keyInput = document.getElementById("key");
  const k = keyInput.value.trim();

  if (cache.has(k)) {
    const value = cache.get(k);
    cache.delete(k);
    cache.set(k, value);
    showMessage(`✅ Cache Hit! Value = ${value}`);
    updateCacheDisplay(k);
  } else {
    showMessage("❌ Cache Miss!", 'error');
    updateCacheDisplay();
  }
}
