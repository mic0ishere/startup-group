chrome.runtime.onStartup.addListener(() => {
  openTabs();
});
const openTabs = () => {
  const tabList = [];
  chrome.storage.sync.get(["tabs", "collapsed"], (items) => {
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
          active: false,
        },
        (tab) => {
          tabList.push(tab);
          if (tabList.length === items.tabs.length) {
            chrome.tabs.group(
              {
                tabIds: tabList.map((x) => x.id),
              },
              (group) => {
                chrome.tabGroups.update(group, {
                  collapsed: items.collapsed,
                });
                console.log(group);
              }
            );
          }
        }
      );
    });
  });
};
