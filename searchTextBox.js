
window.onload = function(){ 
	//Get submit button
	var submitbutton = document.getElementById("tfq");
	//Add listener to submit button
	if(submitbutton.addEventListener){
		submitbutton.addEventListener("click", function() {
			var notification = webkitNotifications.createNotification(
  'search.png',  // icon url - can be relative
  'Hello!',  // notification title
  'Lorem ipsum...'  // notification body text
);
  notification.show();
			Console.log(submitbutton.value);	
			if (submitbutton.value == 'Search commands'){//Customize this text string to whatever you want
				submitbutton.value = '';
			}
		});
	}
}