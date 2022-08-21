# javascript-async

## callbacks

```js
function successHandler(data) {
  console.log(data);
}
function failureHandler(errorCode) {
  console.error(errorData);
}

let httpRequest = new XMLHttpRequest();

function get(url, success, failure) {
  httpRequest.open("GET", url);
  httpRequest.onload = () => {
    httpRequest.status === 200
      ? success(httpRequest.responseText)
      : failure(httpRequest.status);
  };
  httpRequest.send();
}

get(url, successHandler, failureHandler);
// this will call successHandler and failureHandler after we get results from the XMLHttpRequest
```

## promises

```js
function successHandler(data) {
  console.log(data);
}
function failureHandler(errorCode) {
  console.error(errorData);
}
let httpRequest = new XMLHttpRequest();
function get(url) {
  return new Promise((resolve, reject) => {
    httpRequest.open("GET", url);
    httpRequest.onload = () => {
      httpRequest.status === 200
        ? resolve(httpRequest.responseText)
        : reject(httpRequest.status);
    };
    httpRequest.send();
  });
}
// console.log(get()); // will log the returned promise
get()
  .then((response) => {
    successHandler(response);
  })
  .catch((errCode) => {
    failureHandler(errCode);
  });
// calls the successHandler and failureHandler events asynchronously after getting the response from the httpRequest
```
