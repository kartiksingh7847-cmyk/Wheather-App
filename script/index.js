import { fetchDetail } from "../data/detail.js";
let bookmark = [];
let output = document.querySelector(".details");
let forecast = document.querySelector(".forecast");
let savedOutput = document.querySelector('.saved');
fetchDetail("delhi", output, forecast,savedOutput).then((data) => {
  renderDetails(data);
  renderForecast(data);
  renderSaved();
});
function renderDetails(data) {
  let city = data.location.name;
  let country = data.location.country;
  let currentTemp = data.wheather.current.temperature_2m;
  let apparentTemp = data.wheather.current.apparent_temperature;
  let humidity = data.wheather.current.relative_humidity_2m;
  let wind = data.wheather.current.wind_speed_10m;
  let html = `
          <div class="country">
            <p>${city},${country}</p>
            <button class="save-btn">Save</button>
          </div>
          <p class="temperature"><span current-temp>${currentTemp}°</span><span>Feels like <span class="aparent-temp">${apparentTemp}°</span></span></p>
          <p class="humidity"><span>Humidity</span>${humidity}%<span></span></p>
          <p class="wind"><span>Wind</span><span>${wind} km/h</span></p>
        `;
  output.innerHTML = html;

  let save = document.querySelector(".save-btn");
  save.addEventListener("click", () => {
    let matchingItem = false;
    bookmark.forEach(saved => {
      if(saved.location.name === data.location.name)
        matchingItem = true;
    })
    if(!matchingItem) bookmark.push(data);

    localStorage.setItem('data',JSON.stringify(bookmark));
    renderSaved();
  });
}
let input = document.querySelector(".search-bar");
document.querySelector(".search-btn").addEventListener("click", () => {
  if(input.value.trim() !== '' && !Number.isInteger(Number(input.value))){
  fetchDetail(input.value, output, forecast,savedOutput).then((data) => {
    renderDetails(data);
    renderForecast(data);
    renderSaved();
  });
}
});
function renderForecast(data) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let wheather = data.wheather.daily;
  let html = "";
  for (let i = 0; i < 7; i++) {
    html += `
            <div class="daily">
            <p class="day">${days[i]}</p>
            <p class="temp">${wheather.temperature_2m_max[i]}°/${wheather.temperature_2m_min[i]}°</p>
            </div>
            `;
  }
  forecast.innerHTML = html;
}
function renderSaved(){
  let saved = localStorage.getItem('data');
  if(saved){
  let html = '';
  bookmark = JSON.parse(saved);
  bookmark.forEach(saved => {
      let city = saved.location.name;
      let country = saved.location.country;
      let currentTemp = saved.wheather.current.temperature_2m;
      let apparentTemp = saved.wheather.current.apparent_temperature;
      let humidity = saved.wheather.current.relative_humidity_2m;
      let wind = saved.wheather.current.wind_speed_10m;
      html += `<div>
              <div class="country">
                <p>${city},${country}</p>
                <button class="remove-btn" data-id="${saved.location.id}">X</button>
              </div>
              <p class="temperature"><span current-temp>${currentTemp}°</span><span>Feels like <span class="aparent-temp">${apparentTemp}°</span></span></p>
              <p class="humidity"><span>Humidity</span>${humidity}%<span></span></p>
              <p class="wind"><span>Wind</span><span>${wind} km/h</span></p>
              </div>
            `;
  });
  savedOutput.innerHTML = html;
  document.querySelectorAll('.remove-btn')
  .forEach(btn => {
    btn.addEventListener('click',() => {
    let id = Number(btn.dataset.id);
    let newBookmark = bookmark.filter(saved => saved.location.id !== id);
    bookmark = newBookmark;
    localStorage.setItem('data',JSON.stringify(bookmark));
    renderSaved();
  })
})
}}