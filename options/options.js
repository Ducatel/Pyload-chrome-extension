
/**
 * Check if the data connexion are valid and
 * if is valid, save the login/password/adress/port
 * @param  datasConnexion   Contains the data connection
 */
function saveDatasConnexion(datasConnexion){

	var xhr = new XMLHttpRequest();
	try {

		xhr.onreadystatechange = function(){

			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {

				if( xhr.responseText.trim() != "false" ){

					chrome.storage.sync.set(datasConnexion, function() {
						displayNotification(chrome.i18n.getMessage('options_save_complete'));
					});
				}
				else
					displayNotification(chrome.i18n.getMessage('options_bad_login'), true);
			}
		}

		xhr.onerror = function(error) {	console.error(error);}

		var url = datasConnexion['address'] + ":" + datasConnexion['port'] + "/api/login";
		
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("username=" + encodeURIComponent(datasConnexion['login']) + "&" +"password=" + encodeURIComponent(datasConnexion['password']));

		
	} catch(e) { 	
		if(e['code'] == 19)
			displayNotification(chrome.i18n.getMessage('options_pyload_not_found'),true );
		else
			console.error(e);
	 }
}

/**
 * Save options to chrome storage
 */
function save_options() {
	var address = document.getElementById('address').value.trim();
	var port = document.getElementById('port').value.trim();
	var login = document.getElementById('login').value.trim();
	var password = document.getElementById('password').value;

	// delete the last / if present
	// add http://
	address = address.replace(/^\/|\/$/g, '');
	if(address.substr(0,7) != 'http://')
		address = 'http://' + address;

	saveDatasConnexion({'address': address, 'port': port, 'login': login, 'password':password});
}

/**
 * Restore the option value
 */
function restore_options() {
	chrome.storage.sync.get(
	{
		address: 'address',
		port: 'port',
		login: 'login',
		password: 'password'
	}, 
	function(items) {
		document.getElementById('address').value = items.address;
		document.getElementById('port').value= items.port;
		document.getElementById('login').value = items.login;
		document.getElementById('password').value= items.password;
	});
}

/**
 * Launch the save_options function if event are keyup on enter key
 * @param  e event
 */
function launchSave_options(e){
	e = e || window.event;

    if (e.keyCode == '13') 
    	save_options();
}


window.addEventListener("load", function() {

	restore_options();
	document.getElementById('save').addEventListener('click', save_options);
	document.getElementById('password').onkeyup = launchSave_options;
});