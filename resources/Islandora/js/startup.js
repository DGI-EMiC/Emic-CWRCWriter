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

  PID = $.urlParam('PID');
  $.ajax({
    url: 'http://localhost/Development/cwrc/setupCWRC/' + PID,
    async:false,
    success: function(data, status, xhr) {
      cwrc_params = data;
    },
    error: function() {
      alert("AJAX call failed");
    },
    dataType: 'json'

  });


  writer = new Writer();
  writer.init();
  $('#reference_image').attr('src', cwrc_params.fedora_url + '/objects/' + PID + '/datastreams/JPEG/content');
  $('#zoom01').mousedown(function(){
    return false;
  });

 
});
     

