function callPlayerAPI() {
  let catObject = $.ajax({
    url: "http://api.espn.com/v1/sports/football/nfl/athletes",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    //catObject = obj;
    console.log(obj);
    //showCats(catObject);
  });
}
