const STORAGE_KEY = 'KillNewsFeed';
let interval;

function removeNewsFeed() {
  const newsFeed = document.querySelector("[id^='topnews_main_stream']");
  const mainContainer = document.getElementById('mainContainer');
  const topmenu = document.getElementById('pagelet_bluebar');
  if (newsFeed) {
    newsFeed.remove();
  }
  if (mainContainer) {
    mainContainer.remove();
  }
  if (topmenu) {
    topmenu.remove();
  }
}

chrome.storage.sync.get(STORAGE_KEY, value => {
  if (value.hasOwnProperty(STORAGE_KEY) && value[STORAGE_KEY] === true) {
    removeNewsFeed();
    interval = window.setInterval(removeNewsFeed, 3000);
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes[STORAGE_KEY].newValue) {
    removeNewsFeed();
    interval = window.setInterval(removeNewsFeed, 3000);
  } else {
    window.clearInterval(interval);
  }
});
