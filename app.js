var main = function() {
  $('.btn').click(function() {

    var comment = $('.comment').val();
    var command = $('.command').val();

    console.log("comment: " + comment);
    console.log("command: " +command);

    var post = $('.status-box').val();
    var listItem = $('<li>');
    $('.posts').prepend('<table></table>');
    var table = $(listItem).first();
    table.addClass('myTable');
    var firstRow = $('<tr></tr>');
    firstRow.addClass('myRow');
    //firstRow.attr('border-bottom','1px solid black');
    firstRow.append('<td>' + command + '</td>');
    table.append(firstRow);
   //able.append('<tr border-bottom = '1px solid'><td>' + command + '</td></tr>');
    table.append('<tr><td>' + comment + '</td></tr>');
    listItem.prependTo('.posts');


    //$('<li>').text(post).prependTo('.posts');



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