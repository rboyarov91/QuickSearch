
  var allCommandsComments;
  var minBrowserBodyHeight;

  

  $(function() {
    minBrowserBodyHeight = $('.browserBody').height();
    chrome.storage.sync.get({savedCommands:[],searchFrom:'command'},function(results){
      allCommandsComments = results.savedCommands;
      var searchCriteria = results.searchFrom;
      var arrayToUse;
      console.log('criteria: ' + searchCriteria)
      switch(searchCriteria){
        //change array to use by the search criteia
        case('command'):
        arrayToUse = getObjectArray(results.savedCommands,"command");
        break;
        case('comment'):
        arrayToUse = getObjectArray(results.savedCommands,"comment");
        break;
        case('both'):
        arrayToUse = getObjectArray(results.savedCommands,"command");
        arrayToUse = arrayToUse.concat(getObjectArray(results.savedCommands,"comment"));
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


      $( "#tags"  ).on( "autocompleteresponse", function( event, ui ) {
        //change size of body to contain the list
        var length = ui.content.length;
        console.log('length: ' + length);
        var height = 36//$('.dropdownListItem').height();
        console.log('list height: '+ height);
        var heightToAdd = height*length;
        console.log('height to add: ' + heightToAdd);
        var newHeight = minBrowserBodyHeight+heightToAdd;
        $('.browserBody').height(newHeight);
        console.log('browser height: ' + minBrowserBodyHeight);

      } );

      $( "#tags" ).keyup(function(){
        if(!$(this).val()){
          console.log('change to browser height');
          $('.browserBody').height(minBrowserBodyHeight);
        }
      });
    
    $( "#tags" ).autocomplete({
      select: function(event, ui) {
        event.preventDefault();
        //if item is a command
              if(getIndex(allCommandsComments,'command',ui.item.label)!=-1){
                $( "#tags" ).val(ui.item.label);
               }
               //if item is comment
              else if(getIndex(allCommandsComments,'comment',ui.item.label)!=-1){
                $( "#tags" ).val(ui.item.value);

              }
    },
    focus: function(event, ui) {
        event.preventDefault();
        //if item is a command
              if(getIndex(allCommandsComments,'command',ui.item.label)!=-1){
                $( "#tags" ).val(ui.item.label);
               }
               //if item is comment
              else if(getIndex(allCommandsComments,'comment',ui.item.label)!=-1){
                $( "#tags" ).val(ui.item.value);

              }
    },
      create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
              //find corresponding command to comment 
              var command;
              var comment;
              var index;
              //if item is a command
              if(getIndex(allCommandsComments,'command',item.label)!=-1){
                command = item.label;
                comment = item.value;
               }
               //if item is comment
              else if(getIndex(allCommandsComments,'comment',item.label)!=-1){
                command = item.value;
                comment=item.label;

              }


                return $('<li>').addClass('dropdownListItem')
                     .append('<a><b>' + command + '</b><br>' + comment + '</a>')
                     .appendTo(ul);
            };
    }});


    $( "#tags" ).on( "autocompleteselect", function(){
      document.getElementById("tags").select();

      document.execCommand('Copy',false, null);

      $('.browserBody').height(minBrowserBodyHeight);



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

    var getObjectArray = function(array, attr) {
      var returnArray = [];
    for(var i = 0; i < array.length; i++) {
      if(attr=='command'){
        returnArray.push({label:array[i][attr],value:array[i]['comment']});
      }
        else{
        returnArray.push({label:array[i][attr],value:array[i]['command']});
        }
    }
    return returnArray;
    }

var getIndex = function(array, attr, value) {
  var ind = [];
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
        ind.push(i);
        }
    }
    if(ind.length>0){
      return ind;
    }else{
    return -1;
  }
}