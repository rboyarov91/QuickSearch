// Saves options to chrome.storage
function save_options() {
  var command = document.getElementById('command').value;
  var comment = document.getElementById('comment').value;
  var allCommands;
  var allComments;
  chrome.storage.sync.get({
    savedCommand: ['testCommand'],
    savedComment: ['testComment']
  }, function(items) {
    allCommands= items.savedCommand;
    allComments= items.savedComment;
  });
  allCommands[allCommands.length] = command;
  allComments[allComments.length] = comment;
  chrome.storage.sync.set({
    savedCommand: allCommands,
    savedComment: allComments
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

    document.getElementById('readableCommands').innerHTML = savedCommand;
    document.getElementById('readableComments').innerHTML = savedComment;
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    savedCommand: ['testCommand'],
    savedComment: ['testComment']
  }, function(items) {
    document.getElementById('readableCommands').innerHTML = items.savedCommand;
    document.getElementById('readableComments').innerHTML = items.savedComment;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);