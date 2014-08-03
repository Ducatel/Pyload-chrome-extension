/**
 * Display a notification
 * @param  msg The message you want to display
 * @param isError If true display a notification for error else standard notification. Default value: false
 */
function displayNotification(msg, isError){

	isError = (typeof isError !== 'undefined') ? isError : false;

	var opt = { type: "basic",  title: "Mega-Debrid", message: msg }

	if(isError){
		opt['iconUrl'] = chrome.extension.getURL("img/errorIcon.png");
		opt['eventTime'] = Date.now() + 15000;
	}
	else{
		opt['iconUrl'] = chrome.extension.getURL("img/icon128.png");
		opt['eventTime'] = Date.now() + 3000;
	}

	chrome.notifications.create("", opt,function(notificationId) { });
}
