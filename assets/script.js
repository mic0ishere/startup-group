const textarea = document.getElementById("textarea");
document.getElementById("save").onclick = () => {
  if (textarea.value.length <= 0) return chrome.storage.sync.set({ tabs: [] }, () => {});
  const content = textarea.value
    .split("\n")
    .map((c) => c.trim())
    .filter((x) => x.length > 0 && /(http(s?)):\/\//i.test(x));
  textarea.value = content.join("\n");
  if (content.length > 0) chrome.storage.sync.set({ tabs: content }, () => {});
};
chrome.storage.sync.get("tabs", (items) => {
  textarea.value = items.tabs.join("\n")
})