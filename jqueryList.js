
  

  $(function() {
    chrome.storage.sync.get({savedCommands:[],searchFrom:[]},function(results){
      var searchCriteria = results.searchFrom;
      var arrayToUse;
      console.log('criteria: ' + searchCriteria)
      switch(searchCriteria){
        //change array to use by the search criteia
        case('command'):
        arrayToUse = getArray(results.savedCommands,"command");
        break;
        case('comment'):
        arrayToUse = getArray(results.savedCommands,"comment");
        break;
        case('both'):
        arrayToUse = getArray(results.savedCommands,"command");
        arrayToUse = arrayToUse.concat(getArray(results.savedCommands,"comment"));
        break;
        default:
        console.log('none of the search criteia were chosen');
        break;
      }
      var newArray=arrayToUse;
      console.log('using following array: ' + newArray);
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