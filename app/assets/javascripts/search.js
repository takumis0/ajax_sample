/*global $*/

$(document).ready(function(){
  console.log("Ready呼ばれてる");
  
  var
  preFunc = null,
  preInput = '',
  input = '',
  select = '',
  itunesPost = function(input, select)
  {
    var params = {
        term: input,
        country: 'jp',
        media: 'music',
        //attribute :select, //songTerm artistTerm genreIndexはindexだからX
        lang: 'ja_jp',
        limit: '5',
        sort: 'popular',
        sort_order: 'asc'
     };
     
     $.ajax({
        url: 'https://itunes.apple.com/search',
        method: 'GET',
        data: params,
        dataType: 'jsonp',
 
        //成功
        success: function(json) {
          showData(json);
        },
 
        //失敗
        error: function() {
          $(function(){
            $("#error").text("＊ エラーが発生しました ＊");
          });
        },
      });
  };
  
  $('#inc_search').on('keyup' ,function() {
    console.log("Keyup呼ばれてる");
    
    input = $.trim($(this).val());   //前後の不要な空白を削除
    select = document.getElementById("inc_select").value;
    
    if(preInput !== input){
      clearTimeout(preFunc);
      preFunc = setTimeout(itunesPost(input,select), 1000);
    }
    preInput = input;
  });
});

var showData = function(json) {
  $('#titleId').empty();
  $('#artistId').empty();
  $('#genereId').empty();
  for (var i = 0, len = json.results.length; i < len; i++) {
    var result = json.results[i];
    //console.log('title:' + result.trackName + ' artist:' + result.artistName + ' genere:' + result.primaryGenreName);
    var html_title = '<br>' + result.trackName,
    html_artist = '<br>' + result.artistName,
    html_genere = '<br>' + result.primaryGenreName;
    $('#titleId').append(html_title);
    $('#artistId').append(html_artist);
    $('#genereId').append(html_genere);
  }
};