var main = function() {
  $('.btn').click(function() {

    var comment = $('.comment').val(); //value in command box
    var command = $('.command').val(); //value in comment box
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