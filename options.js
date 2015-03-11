// Saves options to chrome.storage
function save_options() {
  

  chrome.storage.sync.get({savedCommands:[]},
    function(result){
      var currCommand = document.getElementById('command').value;
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

//document.getElementById('command').value = '';

 // chrome.storage.sync.set({
 //   savedCommand: allCommands
 // }, function() {
 //   // Update status to let user know options were saved.
 //   var status = document.getElementById('status');
 //   status.textContent = 'Options saved.';
 //   setTimeout(function() {
 //     status.textContent = '';
 //   }, 750);
 // });

    
}



// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    savedCommands: ['']
  }, function(items) {
    var readableCommands = document.getElementById('readableCommands');
    readableCommands.textContent=items.savedCommands;

  });
}

function clear_options(){
  chrome.storage.sync.clear();
  restore_options();
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('clear').addEventListener('click',
  clear_options);