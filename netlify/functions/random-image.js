exports.handler = async function(event, context) {
  const character = event.queryStringParameters.character;
  const emotion = event.queryStringParameters.emotion;
  
  // 1から10までのランダムな数字を生成
  const randomNum = Math.floor(Math.random() * 10) + 1;
  
  // リダイレクト先URL
  const redirectUrl = `/${character}/${emotion}/${randomNum}`;
  
  return {
    statusCode: 302,
    headers: {
      Location: redirectUrl,
      "Cache-Control": "no-cache, no-store, must-revalidate"
    },
  };
};
