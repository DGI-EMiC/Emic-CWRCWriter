$('document').ready(function(){



  pairs=getUrlVars();
  pid =pairs['pid'];

  $("#message").text('New Text').fadeIn('slow');

  //var url='http://localhost:8080/fedora/objects/islandora%3A898/datastreams/RELS-EXT/content';

  var url = 'http://localhost/JavascriptPlaybox/php/FileReader.php';
  $("#generate").click(function(){

    $("#quote").load(url, {
      "PID":pid
    });

  });



});