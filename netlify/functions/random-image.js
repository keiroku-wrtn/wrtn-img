exports.handler = async function(event, context) {
  try {
    console.log("Function called with params:", event.queryStringParameters);
    
    const character = event.queryStringParameters.character;
    const emotion = event.queryStringParameters.emotion;
    
    if (!character || !emotion) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing character or emotion parameter" })
      };
    }
    
    // 1から10までのランダムな数字を生成
    const randomNum = Math.floor(Math.random() * 10) + 1;
    console.log(`Selected random number: ${randomNum}`);
    
    // リダイレクト先URL
    const redirectUrl = `/${character}/${emotion}/${randomNum}`;
    console.log(`Redirecting to: ${redirectUrl}`);
    
    return {
      statusCode: 302,  // 302は一時的なリダイレクト
      headers: {
        "Location": redirectUrl,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function execution failed" })
    };
  }
};
