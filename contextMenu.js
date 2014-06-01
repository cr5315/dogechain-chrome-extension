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

chrome.contextMenus.create({
    title: "Dogechain",
    contexts: ["selection"],
    onclick: dogechain,
});

function dogechain(info, tab) {
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
        chrome.tabs.create({
            url: dogechainURL
        });
    }
}