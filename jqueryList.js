
  $(function() {
    var availableTags = [
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
    $( "#tags" ).keyup(function(event){
    if(event.keyCode == 13){
        //save to clipboard
      $( "#tags" ).focus();

      $( "#tags" ).execCommand('SelectAll');

      $( "#tags" ).execCommand("Copy",false,null);
    }
});
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  });