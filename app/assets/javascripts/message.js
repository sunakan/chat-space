$(function() {
  function buildHTML(message){{}
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html =`<div class="message" data-message-id="${message.id}">
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
                    ${image}
                </div>
        </div>`;
    return html;
  }

  function scrollBottom(target) {
    var scrollHeight = $(target)[0].scrollHeight;
    $(target).animate({ scrollTop: scrollHeight }, "fast");
  }

  $('#new_message').submit(function (e){     // イベント発火の火元。messagesフォーム全体のID。
    e.preventDefault();                      // ブラウザ側が勝手にリクエストを送るのをキャンセル。
    var formData = new FormData(this);
    var url = $(this).attr('action');        // リクエスト送信先のURLを取得
    $.ajax({
      url: url,
      type: 'POST',      // method = "POST"等
      data: formData,
      dataType: 'json',     // データの形式
      processData: false,
      contentType: false,
      // ↑processData:とcontentType:はajaxを送信時のデータの形を整える機能。FormDataを使用時はfalseでキャンセル。
    })
    .done(function(data) {
      var html = buildHTML(data);
      var target = ".messages";
      $(target).append(html);
      scrollBottom(target);
      $("#new_message")[0].reset(); // 入力欄を空にする
    })
    .fail(function(data){
      alert('messageがerrorです！！');
    })
    .always(function(data) {
      $(".form__submit").prop("disabled", false); // ボタンを押下可能にする
    });
  })

  var reloadMessages = function() {
    // メッセージのページでのみ自動更新する
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message = $(".message").last(); // 画面に表示されている、最新のメッセージを取得
      var last_message_id = last_message.data("message-id"); // 最新メッセージのidを取得
      $.ajax({
        url: "api/messages",
        type: "GET",
        dataType: "json",
        data: { id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = "";
        var target = ".messages";
          messages.forEach(function(message) {
            insertHTML = buildHTML(message);
            $(target).append(insertHTML);
            scrollBottom(target);
          });
        })
        .fail(function() {
          alert("自動更新に失敗しました。");
        });
    }
  };
  setInterval(reloadMessages, 5000);
});