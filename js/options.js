const newsFeedButton = document.getElementById('newsfeed-button');
const sidebarsButton = document.getElementById('sidebars-button');
const topmenuButton = document.getElementById('topmenu-button');

const STORAGE_KEY = 'KillNewsFeed';

chrome.storage.sync.get(STORAGE_KEY, result => {
  if (!result.hasOwnProperty(STORAGE_KEY)) {
    chrome.storage.sync.set(
      {
        [STORAGE_KEY]: true,
      },
      () => {
        newsFeedButton.innerHTML = 'News Feed Killed';
      },
    );
  } else if (result.KillNewsFeed === false) {
    newsFeedButton.innerHTML = 'New Feed Active';
    newsFeedButton.classList.add('inactive');
  }
});

newsFeedButton.addEventListener('click', event => {
  chrome.storage.sync.get(STORAGE_KEY, result => {
    if (result.hasOwnProperty(STORAGE_KEY)) {
      const value = !result[STORAGE_KEY];
      chrome.storage.sync.set(
        {
          [STORAGE_KEY]: value,
        },
        () => {
          if (value) {
            newsFeedButton.innerHTML = 'News Feed Killed';
            newsFeedButton.classList.remove('inactive');
          } else {
            newsFeedButton.innerHTML = 'News Feed Active';
            newsFeedButton.classList.add('inactive');
          }
        },
      );
    }
  });
});
