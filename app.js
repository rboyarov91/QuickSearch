var main = function() {
  $('.btn').click(function() {

    var comment = $('.comment').val(); //value in command box
    var command = $('.command').val(); //value in comment box
    populateTable({command:command,comment:comment});
    $('.status-box').val('');
    $('.btn').addClass('disabled'); 

  });
  
  $('.status-box').keyup(function() {
    var commentLength = $('.comment').val().length;
    var commandLength = $('.command').val().length;
    if((commentLength > 0) && (commandLength > 0)) {
      $('.btn').removeClass('disabled'); 
    }
    else {
      $('.btn').addClass('disabled');
    }
  });
  
  $('.btn').addClass('disabled');
}


$(document).ready(main);

var restore  = function(array){
  for(i = 0;i<array.length;i++){
    populateTable(array[i]);
  }
}

var save = function(item){
  //add to the array of stored items in chrome
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