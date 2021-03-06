//function to retrieve url params

$.urlParam = function(name){
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (!results)
  {
    return 0;
  }
  return results[1] || 0;
}

// gets setup information from Islandora


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


$(this).attr("title", cwrc_params.title);
$('#header h1').text( cwrc_params.title);
  // instantiate and initialize writer object

  writer = new Writer();
  writer.init();


  // Supply reference image from Fedora - could rewrite to pull in fom Drupal callbak
  $('#reference_image').attr('src', cwrc_params.fedora_url + '/objects/' + PID + '/datastreams/JPEG/content');

  // prevent darag and drop behaviour from zoomed image
  $('#zoom01').mousedown(function(e){
    e.preventDefault();
  });


  // build and populate page choice dropdown
  $('#page_selector').html('<select id="page_choose"></select>');
  $.each(cwrc_params.pages, function(key, value){
    $('#page_choose').append('<option  value="' + key + '">Page ' + (key + 1) + '</option>');
  });

  // synchronize diplayed page with dropdown

  var selector = "#page_choose option[value='" + cwrc_params.position + "']";
  $(selector).attr('selected','selected');

  // add page choice behavior to dropdown
  $('#page_choose').change(function(e){
    selector = "#page_choose option[value='" + cwrc_params.position + "']";
    $(selector).removeAttr('selected');
    cwrc_params.position = $('#page_choose :selected').attr('value');
    PID = cwrc_params.pages[ cwrc_params.position];
    writer.fm.loadEMICDocument();
    $('.nextButton').css('opacity', '1');
    $('.prevButton').css('opacity', '1');
    if(cwrc_params.position ==0){
      $('.prevButton').css('opacity', '.2');
    }
    if(cwrc_params.position == cwrc_params.pages.length -1){
      $('.nextButton').css('opacity', '.2');
    }
    selector = "#page_choose option[value='" + cwrc_params.position + "']";
    $(selector).attr('selected','selected');
    $('#reference_image').attr('src', cwrc_params.fedora_url + '/objects/' + PID + '/datastreams/JPEG/content');
  });

});
     

