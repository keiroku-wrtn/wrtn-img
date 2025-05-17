exports.handler = async function(event, context) {
  try {
    // クエリパラメータからキャラクターと感情を取得
    const character = event.queryStringParameters.character;
    const emotion = event.queryStringParameters.emotion;
    
    // パラメータのバリデーション
    if (!character || !emotion) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "キャラクターまたは感情パラメータが不足しています" })
      };
    }
    
    // 1から10までのランダムな数字を生成
    const randomNum = Math.floor(Math.random() * 10) + 1;
    
    // 現在のタイムスタンプを取得（キャッシュバスター用）
    const timestamp = Date.now();
    
    // リダイレクト先URL（新しい形式: /character/emotionNumber）
    const redirectUrl = `/${character}/${emotion}${randomNum}?t=${timestamp}`;
    
    // リダイレクトレスポンスを返す
    return {
      statusCode: 302,
      headers: {
        "Location": redirectUrl,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    };
  } catch (error) {
    // エラーが発生した場合のハンドリング
    console.error("関数実行エラー:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "内部サーバーエラーが発生しました" })
    };
  }
};
