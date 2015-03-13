// Saves options to chrome.storage
function save_options() {
  

  chrome.storage.sync.get({savedCommands:[]},
    function(result){
      var currCommand = document.getElementById('command').value;
      addCommandToTable(currCommand);
      var command = {command:currCommand,comment:"test Comment"};
      var savedCommands = result.savedCommands;
      savedCommands.push(currCommand);
      chrome.storage.sync.set({savedCommands:savedCommands},function(){
        chrome.storage.sync.get("savedCommands",function(result){
          console.log(result.savedCommands);
          var readableCommands = document.getElementById('readableCommands');
          readableCommands.textContent=result.savedCommands;

        })
        document.getElementById('command').value = '';
        var status = document.getElementById('status');
        
        status.textContent = 'Options saved.';
        
        setTimeout(function() {
        status.textContent = '';
    }, 750);
      })
    });

    
}



// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    savedCommands: ['']
  }, function(items) {
    var readableCommands = document.getElementById('readableCommands');
    readableCommands.textContent=items.savedCommands;
    restoreTable(items.savedCommands);

  });
}

function clear_options(){
  chrome.storage.sync.clear();
  restore_options();
}

function restoreTable(allCommands){
  console.log("length of commands to restore: " + allCommands.length + " " + allCommands[allCommands.length]);
  for(i = 1; i<allCommands.length ; i++){
    addCommandToTable(allCommands[i]);
  }
}


function addCommandToTable(command){
  var table = document.getElementById("commandTable");

  var rows;
  
    if(typeof table.rows.length == 'undefined'){
    rows = 0;}else{
      rows = document.getElementById("commandTable").rows.length;
    }
    console.log(rows);
try{
  var y = document.createElement("TR");
    y.setAttribute("id", "myTr"+rows);
    document.getElementById("commandTable").appendChild(y);

    var z = document.createElement("TD");
    var t = document.createTextNode(command);
    z.appendChild(t);
    document.getElementById("myTr"+rows).appendChild(z);}
    catch(err){
      console.log(err);
    }

}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('clear').addEventListener('click',
  clear_options);