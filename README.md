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

## `Promise.all([])` method

```js
// make sure you provide an array of requests inside Promise.all() -> Promise.all([a,b,c,d])
Promise.all([fetch(urls[0]), fetch(urls[1]), fetch(urls[2])]).then(
  (responses) => {
    return responses.map((response) => {
      return response.json();
    })
  }.then(jsonResponses=>{
    return jsonResponses.join(",")
  }).then(data=>{
    console.log(data)
  }).catch(err=>{
    console.error(err)
  }).finally(()=>{
    console.log('all fetch requests have returned json data`)
  })
);
```

## Promises Polyfill - making code backwards compatible

promises are not supported in older browsers like IE and opera browsers , and promises can not be transpiled using Babel

- so we use Polyfills to transpile the Promises into older syntax of js for old browsers support
- to use a polyfill in your code insert the following cdn in html before the script that uses promises
  one of the promise polyfill is `https://github.com/taylorhakes/promise-polyfill`

cdn -

```html
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"></script>
```
