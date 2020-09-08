// executed at document_start, while page loads

console.log("Hi");


var consentGiven; 

const observer = new MutationObserver (function(mutations) {
	mutations.forEach(({ addedNodes}) => {
		addedNodes.forEach(node => {
			console.log("Node found, type:  " + node.nodeType + " name: " + node.nodeName);
			//check for scripts being added to the DOM 
			if (node.nodeType === 1 && node.nodeName === 'SCRIPT') {
				console.log("found a script!");
				const src = node.src;
				const type = node.type;
				console.log(src);
				if (onBlocklist(src)) {
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
									toggleButton.innerHTML = "activate"; 
									toggleButton.addEventListener("click",function(){executeOrigScript(document,src, 'twitterConsented', placement);});
									toggleButton.addEventListener("mouseover", appendExplanation);
									placement.appendChild(toggleButton);
								}
								node.removeEventListener('beforescriptexecute', beforeScriptExecuteListener);
							}
							node.addEventListener('beforescriptexecute', beforeScriptExecuteListener);
					}
				}
			}
		});
	});
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

function onBlocklist(src) {
	//Determine whether to block the script or not by comparing to blocklist
	if (src === "https://platform.twitter.com/widgets.js"){
		console.log("Found a twitter Plug in Script!");
		return true; 
	}
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
function appendExplanation(){
	var explanation = document.createElement('p');
	var explanationText = document.createTextNode("This button activates the twitter plug-in, which will set cookies");
	explanation.appendChild(explanationText);
	document.body.appendChild(explanation);
}
