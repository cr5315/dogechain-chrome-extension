/**
    Copyright 2014 Benjamin Butzow

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
**/

/**********************************
**         Context Menu          **
**********************************/
chrome.contextMenus.create({
    title: "Dogechain",
    contexts: ["selection"],
    onclick: contextMenuClick,
});

function contextMenuClick(info, tab) {
    var dogechainURL = "http://dogechain.info/";
    var doOpenNewTab = false;
    
    if (info.selectionText.length == 34) {
        // It's an address
        dogechainURL += "address/" + info.selectionText;
        doOpenNewTab = true;
    } else if (info.selectionText.length == 64) {
        // It's a transaction ID
        dogechainURL += "tx/" + info.selectionText;
        doOpenNewTab = true;
    }
    
    if (doOpenNewTab) {
        navigateInNewTab(dogechainURL);
    }
}

/**********************************
**           Omnibox             **
**********************************/
function resetDefaultSuggestion() {
    chrome.omnibox.setDefaultSuggestion({
        description: 'Dogecoin address or transaction ID: %s'
    });
}
resetDefaultSuggestion();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) { 
    // Nothing to see here 
});

chrome.omnibox.onInputCancelled.addListener(function() {
    resetDefaultSuggestion();
});

chrome.omnibox.onInputEntered.addListener(
    function(text) {
        var dogechainURL = "http://dogechain.info/";
        var doRedirect = false;

        if (text.length == 34) {
            // Address
            dogechainURL += "address/" + text;
            doRedirect = true;

        } else if (text.length == 64) {
            // Transaction ID
            dogechainURL += "tx/" + text;
            doRedirect = true;
        }

        if (doRedirect) {
            chrome.tabs.getCurrent(function(tab) {
                navigateInCurrentTab(dogechainURL);
            });
        }
    }
);

/**********************************
**        Other Functions        **
**********************************/
function navigateInCurrentTab(url) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: url});
    });
}

function navigateInNewTab(url) {
    chrome.tabs.create({
        url: url
    });
}