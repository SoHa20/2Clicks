// executed at document_start, while page(s) loads
//my testpage is here: file:///C:/Users/sophi/OneDrive/Dokumente/Studium/BA/2clicks/testpage.html

//global variable for given consent 
console.log("Hi");
/*let scripts = document.scripts;
console.log(scripts);
for (var i=0; i < scripts.length; i++) {
	console.log("Nummer: " + i);
	console.log(scripts.item(i).src);
	if (onBlocklist(scripts.item(i).src)){
		console.log("blah");
		source = scripts.item(i).src; 
		//const beforeScriptExecuteListener = function(event) {
			//event.preventDefault();
			var toReplace = scripts.item(i);
			var placement = scripts.item(i).parentNode;
			var toggleButton = document.createElement(button); 
			toggleButton.innerHTML = "Click me!";
			placement.appendChild(toggleButton);
			//toReplace.remove();
			//toggleButton.addEventListener("click", executeOrigScript(document, source,'twitterscript', placement));
			//toggleButton.addEventListener("mouseover", displayExplanation);
			
		//}
	}
}*/

var consentGiven; 

const observer = new MutationObserver (function(mutations) {
	mutations.forEach(({ addedNodes}) => {
		addedNodes.forEach(node => {
			console.log("Node found, type:  " + node.nodeType + " name: " + node.nodeName);
			//check for static scripts being added to the DOM 
			if (node.nodeType === 1 && node.nodeName === 'SCRIPT') {
				console.log("found a script!");
				const src = node.src;
				const type = node.type;
				//const type = node.type;
				console.log(src);
				if (onBlocklist(src)) { // (src, type)
					switch(node.id) {
						case "twitterConsented":
							console.log('Consent given');
							break; 
						
						default : 
							// block script if on blocklist
							node.type = 'javascript/blocked' ;
							const beforeScriptExecuteListener = function(event) {
								console.log("Does this work?");
								if (node.getAttribute('type') === 'javascript/blocked') {
									event.preventDefault();
									var placement = node.parentNode;
									var toggleButton = document.createElement('button'); 
									toggleButton.innerHTML = "Click me!"; //make this more explaining, add style of switch
									toggleButton.addEventListener("click",function(){executeOrigScript(document,src, 'twitterConsented', placement);});
									placement.appendChild(toggleButton);
								}
								node.removeEventListener('beforescriptexecute', beforeScriptExecuteListener);
							}
							node.addEventListener('beforescriptexecute', beforeScriptExecuteListener);
					}
				}
						//node.addEventListener('beforescriptexecute', beforeScriptExecuteListener);
			}
		});
	});
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
//});*/

// match this "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" - div
// or sdk script src="https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v8.0"
function onBlocklist(src) {
	//Determine whether to block the script or not by comparing to blocklist
	//if (type === 1 && (src.includes("facebook") && src.includes("sdk.js"))) {
		//return true
	//}
	//return false
	if (src === "https://platform.twitter.com/widgets.js"){
		console.log("Found a twitter Plug in Script!");
		return true; 
	}//if (src === "https://platform.twitter.com/js/button.683df8cb64b87a8e4759b1fa17147ad1.js"){
		//console.log("Found a twitter Plug in Script!");
		//return true; 
	//}
	else 
		return false; 
		
}

function executeOrigScript(d,source, id, node){
	console.log('Button clicked');
	consentGiven = true; 
	newScript = d.createElement('script'); 
	newScript.id = id; 
	newScript.src = source; 
	node.appendChild(newScript);
}
	
/*function doubleclickreplacement(node){
	//var placement = document.getElementsByClassName("fb-share-button")
	/*var toggleButton = document.createElement(button) 
	toggleButton.id = 'toggleButton';
	toggleButton.innerHTML = "Click me!" ;//TODO: change this, preferably to switch with mouseover explanation
	node.appendChild(toggleButton);
	toggleButton.addEventListener("click", executeOrigScript(document, 'script', 'facebook-jssdk'))
	toggleButton.addEventListener("mouseover", displayExplanation) 
}*/

/*function executeOrigScript(d,s,id){
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
