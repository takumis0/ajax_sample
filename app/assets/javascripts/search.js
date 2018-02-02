/*global $*/

$(document).ready(function(){
  console.log("Ready呼ばれてる");
  var
  preFunc = null,
  preInput = '',
  input = '',
  select = '',
  ajaxPost = function(input, select)
  {
    $.ajax({
        url: 'musics/search',
        type: "GET",
        data: "q=" + input + "&v=" + select
    });
  };
  
  $('#inc_search').on('keyup' ,function() {
    console.log("Keyup呼ばれてる");
    input = $.trim($(this).val());   //前後の不要な空白を削除
    select = document.getElementById("inc_select").value;
    if(preInput !== input){
      clearTimeout(preFunc);
      preFunc = setTimeout(ajaxPost(input,select), 500);
    }
    preInput = input;
  });
});