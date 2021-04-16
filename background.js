chrome.runtime.onStartup.addListener(() => {
  openTabs();
});
const openTabs = () => {
  const tabList = [];
  chrome.storage.sync.get("tabs", (items) => {
    if (!items.tabs) {
      return chrome.storage.sync.set(
        {
          tabs: [],
        },
        () => {}
      );
    }
    items.tabs.reverse().forEach((x) => {
      chrome.tabs.create(
        {
          index: 0,
          url: x,
        },
        (tab) => {
          tabList.push(tab);
          if (tabList.length === items.tabs.length) {
            chrome.tabs.group(
              {
                tabIds: tabList.map((x) => x.id),
              },
              (group) => {
                console.log(group);
              }
            );
          }
        }
      );
    });
  });
};
