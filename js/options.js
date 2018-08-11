const button = document.getElementById("switch-button");

const STORAGE_KEY = "KillNewsFeed";

chrome.storage.sync.get(STORAGE_KEY, result => {
    if (!result.hasOwnProperty(STORAGE_KEY)) {
        chrome.storage.sync.set(
            {
                [STORAGE_KEY]: true
            },
            () => {
                button.innerHTML = "News Feed Killed";
            }
        );
    } else if (result.KillNewsFeed === false) {
        button.innerHTML = "New Feed Active";
        button.classList.add("inactive");
    }
});

button.addEventListener("click", event => {
    chrome.storage.sync.get(STORAGE_KEY, result => {
        if (result.hasOwnProperty(STORAGE_KEY)) {
            const value = !result[STORAGE_KEY];
            chrome.storage.sync.set(
                {
                    [STORAGE_KEY]: value
                },
                () => {
                    if (value) {
                        button.innerHTML = "News Feed Killed";
                        button.classList.remove("inactive");
                    } else {
                        button.innerHTML = "News Feed Active";
                        button.classList.add("inactive");
                    }
                }
            );
        }
    });
});
