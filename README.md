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

# async/await

- syntactic sugar for promises

```js
(async () => {
  const responses = [];
  responses.push(await fetch(urls[0]));
  responses.push(await fetch(urls[1]));
  responses.push(await fetch(urls[2]));
  responses.push(await fetch(urls[3]));

  const jsonData = responses.map((response) => {
    return response.json();
  });

  console.log(jsonData.join(","));
})();
```

## Error handling in async/await

```js
(async () => {
  try {
    const responses = [];
    responses.push(await fetch(urls[0]));
    responses.push(await fetch(urls[1]));
    responses.push(await fetch(urls[2]));
    responses.push(await fetch(urls[3]));

    const jsonData = responses.map((response) => {
      return response.json();
    });

    console.log(jsonData.join(","));
  } catch (status) {
    // will catch errors
    console.error(`error status code ${status}`);
  } finally {
    // will execute the commands irrespective of success or errors
    console.log("all fetch request have returned results");
  }
})();
```

## Making async/await backwards compatible

to make async/await code backwards compatible use babel.io to first transpile the code in form of promises and then insert that transpiled code in in our project and use polyfill to make it more backwards compatible , by inserting polyfill cdn in html before the script that uses promises

# Web Workers

- use their own thread to process.
- make code asynchronous , make app do multiple things at once by leveraging the multiple processor threads

![web worker working](images/web%20worker%20working.png)

```js
const worker = new Worker(script_path);
```

passing data to the worker

```js
// code on script.js

const worker = new Worker(./web_worker.js);

worker.postMessage("hello worker");
worker.postMessage({
  name: "ajay",
  feeling: "low",
  drivingLicense: false,
});
console.log('message sent to worker')


// code on web_worker.js to receive message

this.addEventListener("message",(event)=>{
  console.log("message received from main script")
  console.log(event.data)
})

```

output

```txt
message sent to worker
message recieved from main script
hello worker
message received from main script
{name:"ajay",feeling:"low",drivingLicense:false}
```

Receiving output message from web worker

```js
// code in webWorker.js

this.postMessage(result);

// code in script.js
const worker = new Worker(webWorker.js);
worker.addEventListener("message", (event) => {
  const receivedData = event.data;
  console.log(receivedData, "received from the worker");
});
```
