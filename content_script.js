// executed at document_start, while page(s) loads
//my testpage is here: file:///C:/Users/sophi/OneDrive/Dokumente/Studium/BA/2clicks/testpage.html

//global variable for given consent 
console.log("Hi");

const observer = new MutationObserver (function(mutations) {
	mutations.forEach(({ addedNodes}) => {
		addedNotes.forEach(node => {
			console.log("Node found" + node.nodeType + "type" + node.nodeName);
			//check for static scripts being added to the DOM 
			/*if (node.nodeType === 1 && node.nodeName === 'script') {
				const src = node.src || '' 
				//const type = node.type;
				//switch (consentGiven) {
						//case true: 
							//console.log("Facebook consent given");
							//break;
						//case false: 
							if (onBlocklist(src)) { // (src, type)
								// block script if on blocklist
								node.type = 'blocked' ;
								const beforeScriptExecuteListener = function(event) {
									console.log("Does this work?");
									//if (node.getAttribute('type' === 'blocked')) {
									//event.preventDefault();
									//doubleclickreplacement(node);
									}
								}
							}*/
				});
						node.removeEventListener('beforescriptexecute', beforeScriptExecuteListener);
			});
					node.addEventListener('beforescriptexecute', beforeScriptExecuteListener);
					
		});
	//});

//});

// match this "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" - div
// or sdk script src="https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v8.0"
function onBlocklist(src, type) {
	//Determine whether to block the script or not by comparing to blocklist
	//if (type === 1 && (src.includes("facebook") && src.includes("sdk.js"))) {
		//return true
	//}
	//return false
	if (src === "https://platform.twitter.com/widgets.js"){
		console.log("Found a twitter Plug in Script!");
		return true; 
	} else 
		return false; 
		
}
/*function doubleclickreplacement(node){
	//var placement = document.getElementsByClassName("fb-share-button")
	var toggleButton = document.createElement(button) 
	toggleButton.id = 'toggleButton';
	toggleButton.innerHTML = "Click me!" ;//TODO: change this, preferably to switch with mouseover explanation
	node.appendChild(toggleButton);
	toggleButton.addEventListener("click", executeOrigScript(document, 'script', 'facebook-jssdk'))
	toggleButton.addEventListener("mouseover", displayExplanation) 
}

function executeOrigScript(d,s,id){
//load facebook sdk
	consentGiven = true; 
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); 
	js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
	fjs.parentNode.insertBefore(js, fjs);
	}*/
	


//function displayExplanation()
// short text explaining what's happening
console.log("Ich laufe gerade!");