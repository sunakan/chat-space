$(function() {
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class=message>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      <img src="${message.image}"class= 'lower-message__image'>
                    </div>
                  </div> `
    return html;
  }
  $('#new_message').on('submit', function (e){
    // ↑イベント発火の火元。messagesフォーム全体のID。
    e.preventDefault();
    // ↑ブラウザ側が勝手にリクエストを送るのをキャンセル。
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,           
      type: 'POST',      // method = "POST"等
      data: formData,
      dataType: 'json',     // データの形式
      processData: false,
      contentType: false,
      // ↑processData:とcontentType:はajaxを送信時のデータの形を整える機能。FormDataを使用時はfalseでキャンセル。
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $( ".form__submit").prop( "disabled", false );
      //データ受け取り後messagesの画面最下部までスクロール⬇︎
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').val('');
      $('.hidden').val('');
    })
    .fail(function(){
      alert('error');
    })
  })
});
