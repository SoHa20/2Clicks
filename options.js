function saveOptIn(event){
	event.preventDefault();
	
	browser.storage.sync.set({
		facebookOptOut: facebookOptOut.value
	});
}

function getOptions() {

  function setChoice(result) {
    document.querySelector("facebookPermaOptIn").value = result.facebookOptIn || false;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("facebookPermaOptIn");
  getting.then(setChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptIn);
	
		