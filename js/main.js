const STORAGE_KEY = "KillNewsFeed";
let interval;

function removeNewsFeed() {
    const item = document.querySelector("[id^='topnews_main_stream']");
    if (item) {
        item.remove();
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
