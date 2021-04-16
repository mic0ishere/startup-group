const textarea = document.getElementById("textarea");
const checkbox = document.getElementById("checkbox");
document.getElementById("save").onclick = () => {
  console.log(checkbox.checked);
  if (textarea.value.length <= 0)
    return chrome.storage.sync.set(
      { tabs: [], collapsed: checkbox.checked },
      () => {}
    );
  const content = textarea.value
    .split("\n")
    .map((c) => c.trim())
    .filter((x) => x.length > 0 && /(http(s?)):\/\//i.test(x));
  textarea.value = content.join("\n");
  if (content.length > 0)
    chrome.storage.sync.set(
      { tabs: content, collapsed: checkbox.checked },
      () => {}
    );
};
chrome.storage.sync.get(["tabs", "collapsed"], (items) => {
  textarea.value = items.tabs.join("\n");
  checkbox.checked = items.collapsed;
});
