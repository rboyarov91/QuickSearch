
  

  $(function() {
    chrome.storage.sync.get({savedCommands:[]},function(results){
      var arrayToUse = getArray(results.savedCommands,"command");
      var newArray=arrayToUse;
      var arrayFunction = function(request, response) {
        var results = $.ui.autocomplete.filter(newArray, request.term);

        response(results.slice(0, 5));
    };
      $( "#tags" ).autocomplete( "option", "source", arrayFunction )
    }); 
    
    $( "#tags" ).autocomplete({
    });


    $( "#tags" ).on( "autocompleteselect", function(){
      document.getElementById("tags").select();

      document.execCommand('Copy',false, null);

      var status = document.getElementById('status');
        status.textContent = 'Command copied to clipboard';
        setTimeout(function() {
        status.textContent = '';
        window.close();
    }, 750);
    }
     );
  });

    var getArray = function(array, attr) {
      var returnArray = [];
    for(var i = 0; i < array.length; i++) {
        returnArray.push(array[i][attr]);
    }
    return returnArray;
}