// add global variable containing XHR object here
let httpRequest = new XMLHttpRequest();

// add get() function here
function get(url) {
  return new Promise((resolve, reject) => {
    httpRequest.open("GET", url);
    httpRequest.onload = () => {
      httpRequest.status === 200
        ? resolve(httpRequest.responseText)
        : reject(Error(httpRequest.status));
    };
    httpRequest.send();
  });
}

function tempToF(kelvin) {
  return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

function successHandler(data) {
  const dataObj = JSON.parse(data);
  const div = `
        <h1>Weather</h1>
        <h2 class="top">
        <img
            src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
            alt="${dataObj.weather[0].description}"
            width="50"
            height="50"
        />${dataObj.name}
        </h2>
        <p>
        <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${
    dataObj.weather[0].description
  }
        </p>
    `;
  return div;
}

function failHandler(status) {
  console.error(status, "error occurred while fetching data from server");

  weatherDiv.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "07ebd59e1632937e4c8edff407b3e123"; // ADD YOUR API KEY BETWEEN THE QUOTES
  // const apiKey = "";
  const weatherDiv = document.querySelector("#weather");

  const locations = [
    "los+angeles,us",
    "san+francisco,us",
    "lone+pine,us",
    "mariposa,us",
  ];

  // const url =
  //   "https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=" +
  //   apiKey;

  const urls = locations.map((location) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
  });
  // add get() function call here
  // successHandler(httpRequest.responseText); // instead use callback in get function
  // get(url, successHandler, failHandler);
  // console.log(get(url));

  Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
    .then((responses) => {
      return responses.map((response) => {
        return successHandler(response);
      });
    })
    .then((literals) => {
      weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join("")}`;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      weatherDiv.classList.remove("hidden");
    });
});
