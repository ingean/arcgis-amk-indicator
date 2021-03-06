
$(function(){
  getDriveTime();
})


function getDriveTime() {
  var url = urlRoutes + '/query' +
  '?f=json' +
  '&where=1=1' +
  '&outFields=Total_TravelTime,Formatted_TravelTime' +
  '&returnGeometry=false' +
  '&orderByFields=Total_TravelTime';

  $.get(url).done(response => {
    response = JSON.parse(response);
    var features = response.features;
    if (features.length > 0) {
      var driveTime = features[0].attributes.Formatted_TravelTime;
      if($('#div-currentDriveTime').html() !== driveTime + ' min') {
        $('#div-previousDriveTime').html($('#div-currentDriveTime').html());
        $('#div-currentDriveTime').html(driveTime + ' min');
      }
    }
  })
  .fail(error => {
    console.log('Not able to get drivetimes from feature service: ' + error);
    $('#span-status').html(' ');
  });
  setTimeout(() => {getDriveTime()},refreshRate);
};