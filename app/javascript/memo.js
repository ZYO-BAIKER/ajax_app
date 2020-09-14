function memo() {
  const submit = document.getElementById("submit"); //「投稿する」ボタンの情報を取得
  submit.addEventListener("click", (e) => { //投稿するボタンを「click」した場合に実行される関数を定義
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest(); //非同期通信を実装するため
    XHR.open("POST", "/posts", true); //リクエストの内容を引数へ追記。HTTPメソッドはPOST、パスは/posts、非同期通信はtrueと設定
    XHR.responseType = "json"; //返却されるデータ形式はJSONだから、jsonを指定
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;　//レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list"); //HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content"); //formTextは、メモの入力フォームをリセットするため、リセット対象であるcontent要素を取得
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;        //「メモとして描画する部分のHTML」を定義.HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画される
      list.insertAdjacentHTML("afterend", HTML); //listに対して、HTMLを追加。第一引数にafterendを指定することで、要素listの直後に挿入
      formText.value = ""; //空の文字列に上書きされるような仕組みで「メモの入力フォームに入力されたままの文字」はリセット。
    };
    e.preventDefault(); //プログラム本来の処理を止める
  });
}
window.addEventListener("load", memo); //window（ページ）をload（読み込み）時に実行される