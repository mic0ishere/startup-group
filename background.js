chrome.runtime.onStartup.addListener(() => openTabs);
const openTabs = () => {
  const tabList = [];
  chrome.storage.sync.get("tabs", (items) => {
    const tabs = [...items.tabs];
    tabs.reverse().forEach((x) => {
      chrome.tabs.create(
        {
          index: 0,
          url: x,
        },
        (tab) => {
          tabList.push(tab);
          if (tabList.length === tabs.length) {
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
