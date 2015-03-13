var main = function() {
  $('.save').click(function() {


    var comment = $('.comment').val(); //value in command box
    var command = $('.command').val(); //value in comment box
    var itemToSave = {command:command,comment:comment};
    populateTable(itemToSave);
    save({command:command,comment:comment});
    $('.status-box').val('');
    $('.save').addClass('disabled'); 

  });
  
  $('.status-box').keyup(function() {
    var commentLength = $('.comment').val().length;
    var commandLength = $('.command').val().length;
    if((commentLength > 0) && (commandLength > 0)) {
      $('.save').removeClass('disabled'); 
    }
    else {
      $('.save').addClass('disabled');
    }
  });
  
  $('.save').addClass('disabled');

  $('.clear').click(function(){

  chrome.storage.sync.clear();
  $('.posts').empty();
  })
}


$(document).ready(main);

var restore  = function(){
    chrome.storage.sync.get({savedCommands:[]},function(result){
     if (typeof result !== 'undefined') {
       var allResults = result.savedCommands;
      for(i = 0;i<allResults.length;i++){
      populateTable(allResults[i]);
    }
  }
  });

  }

var save = function(item){
  //add to the array of stored items in chrome
  chrome.storage.sync.get({savedCommands:[]},function(result){
    var currCommand = item.command;
    var currComment = item.comment;
    var savedCommands = result.savedCommands;
    var commandToSave={command:currCommand,comment:currComment};
    savedCommands.push(commandToSave);
    chrome.storage.sync.set({savedCommands:savedCommands},function(){
      var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
        status.textContent = '';
    }, 750);

    });

  });
}


var populateTable = function(item){
  var command = item.command;
  var comment = item.comment;
  var listItem = $('<li>');
    //Create table and add class
    var table = $('<table></table>');
    table.addClass('myTable');
    //create first row and add to table
    var firstRow = $('<tr></tr>')
    firstRow.addClass('firstRow');
    firstRow.append('<td><b>' + command + '</b></td>');
    table.append(firstRow);
    //create second row and add to table
    var secondRow = $('<tr></tr>')
    secondRow.addClass('secondRow');
    secondRow.append('<td>' + comment + '</td>');
    table.append(secondRow);
    //add table to list item and then to list
    listItem.append(table);
    listItem.prependTo('.posts');
}

document.addEventListener('DOMContentLoaded', restore);