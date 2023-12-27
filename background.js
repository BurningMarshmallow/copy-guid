chrome.commands.onCommand.addListener(function(command) {
    switch (command) {
        case 'copy-guid-1':
            copyGuid(1);
            break;
        case 'copy-guid-2':
            copyGuid(2);
            break;
        case 'copy-guid-3':
            copyGuid(3);
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

function copyGuid(idx) {
    const getCurrentTab = {
        active: true,
        currentWindow: true
    };
    // Hack found in https://github.com/ricohasgithub/QuickAccents2/blob/main/background.js
    chrome.tabs.query(getCurrentTab, (tabs) => {
        chrome.scripting.executeScript({
            target: {
                tabId: tabs[0].id
            },
            function: copyToClipboard,
            args: [getGuid(tabs[0].url, idx)]
        });
    });
}

function copyToClipboard(text) {
    let input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = text;
    input.select();
    document.execCommand("copy");
    input.remove();
}

function getGuid(text, idx) {
    let guidRegex = /\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/g
	let matches = Array.from(text.matchAll(guidRegex), (m) => m[0]);
	if (idx > matches.length) {
		return "";
	}
	return matches[idx-1];
}
