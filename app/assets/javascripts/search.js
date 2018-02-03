/*global $*/

$(document).ready(function(){
  var
  preFunc = null,
  preInput = '',
  preSelect = '',
  input = '',
  select = '',
  itunesPost = function(input, select)
  {
    var params = {
        term: input,
        country: 'jp',
        media: 'music',
        attribute: select, //songTerm artistTerm genreIndexはindexだからX
        lang: 'ja_jp',
        limit: '10',
        sort: 'userRatingCount',
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
  
  $('#inc_select').on('change' ,function() {
    console.log("Change呼ばれてる");
    checkForm();
  });
  
  $('#inc_search').on('keyup' ,function() {
    console.log("Keyup呼ばれてる");
    checkForm();
  });
  
  var checkForm = function(){
    input = $.trim($('#inc_search').val());   //前後の不要な空白を削除
    select = document.getElementById("inc_select").value;
    
    if(preInput !== input || preSelect !== select){
      clearTimeout(preFunc);
      preFunc = setTimeout(itunesPost(input,select), 1000);
    }
    preInput = input;
    preSelect = select;
  };
});

var showData = function(json) {
  $('#iTunes-result').empty();
  for (var i = 0, len = json.results.length; i < len; i++) {
    var result = json.results[i];
    var html_result = '<tr>';
    html_result += '<td>' + result.trackName + '</td>';
    html_result += '<td>' + result.artistName + '</td>';
    html_result += '<td>' + result.primaryGenreName + '</td>';
    html_result += '</tr>';
    $('#iTunes-result').append(html_result);
  }
};