//function to retrieve url params

$.urlParam = function(name){
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (!results)
  {
    return 0;
  }
  return results[1] || 0;
}

// gets content directly from fedora based on submitted PID
// content is passed to the editor in the Writer's config object

$('document').ready(function(){
  var url = 'http://localhost/CWRCEditor/resources/Islandora/getPageContents.php?PID=' + $.urlParam('PID');
  var file_content = '';
  $.ajax({
    url: url,
    async:false,
    success: function(data, status, xhr) {
      file_content=data;
     
    },
    error: function() {
      alert("Data loading was unsuccessful");
    }

  });
  
  writer = new Writer({
    'file_content' : file_content,
    'PID' : $.urlParam('PID')
  });
  writer.init();
 
});
      