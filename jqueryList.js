
  $(function() {
    var availableTags
    // chrome.storage.sync.get({savedCommands:[]},function(results){
    //   alert(availableTags);
    //} 
    = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
    $( "#tags" ).on( "autocompleteselect", function(){
      document.getElementById("tags").select();

      document.execCommand('Copy',false, null);
    
      // function( event, ui ) {

      // //alert(ui.item.value + " chosen");

      // window.prompt("Copy to clipboard: Ctrl+C, Enter", ui.item.value);
      // window.close();
    }
     );
  });