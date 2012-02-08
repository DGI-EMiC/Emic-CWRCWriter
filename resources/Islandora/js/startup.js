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
  var PID = $.urlParam('PID');
  var file_content = '';
  var CWRC = "FALSE";
  $.ajax({
    url: 'http://localhost/Development/cwrc/checkCWRC/' + PID,
    async:false,
    success: function(data, status, xhr) {
      CWRC = data;
    },
    error: function() {
      alert("AJAX call failed");
    }

  });
  $.ajax({
     url: 'http://localhost/Development/cwrc/ocr/'+ PID,
    async:false,
    success: function(data, status, xhr) {
      file_content=data;
     
    },
    error: function() {
      alert("OCR loading was unsuccessful");
    }

  });
  
  writer = new Writer({
    'file_content' : file_content,
    'CWRC' : CWRC,
    'PID' : PID
  });
  writer.init();
  $('#reference_image').attr('src', 'http://localhost:8080/fedora/objects/' + PID + '/datastreams/JPEG/content');
  $('#placeholder').hide();
 
});
     

