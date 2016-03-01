
async function HelloWorldAsyncMain() {
  var message = await new Promise((resolve) => { resolve("Hello World"); });
  return message;
};

HelloWorldAsyncMain();
