export async function  fetchDetail(value,output,forecast,savedOutput){
  try {
    output.innerHTML = `<div class="loader"></div>`;
    forecast.innerHTML = `
    <div class="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>`;
    savedOutput.innerHTML =`
              <div class="saved-box">
              <div class="load-country">
                <p></p>
                <button class="remove-btn"></button>
              </div>
              <p class="load-temp"><span current-temp></span><span><span class="load-aparent-temp"></span></span></p>
              <p class="load-humidity"><span></span><span></span></p>
              <p class="load-wind"><span></span><span></span></p>
              </div>
              <div class="saved-box">
              <div class="load-country">
                <p></p>
                <button class="remove-btn"></button>
              </div>
              <p class="load-temp"><span current-temp></span><span><span class="load-aparent-temp"></span></span></p>
              <p class="load-humidity"><span></span><span></span></p>
              <p class="load-wind"><span></span><span></span></p>
              </div>
              <div class="saved-box">
              <div class="load-country">
                <p></p>
                <button class="remove-btn"></button>
              </div>
              <p class="load-temp"><span current-temp></span><span><span class="load-aparent-temp"></span></span></p>
              <p class="load-humidity"><span></span><span></span></p>
              <p class="load-wind"><span></span><span></span></p>
              </div>
              <div class="saved-box">
              <div class="load-country">
                <p></p>
                <button class="remove-btn"></button>
              </div>
              <p class="load-temp"><span current-temp></span><span><span class="load-aparent-temp"></span></span></p>
              <p class="load-humidity"><span></span><span></span></p>
              <p class="load-wind"><span></span><span></span></p>
              </div>
            `;
    let response1 = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=1`,
    );
    if(!response1.ok){
      throw new Error("Request failed : " + response1.status)
    }
    let data1 = await response1.json();
    if(!data1.results){
      throw new Error('City not found');
    }
    let response2 = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data1.results[0].latitude}&longitude=${data1.results[0].longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
    );
 
    let data2 = await response2.json();
    return {
      location: data1.results[0],
      wheather: data2
    }
  } catch (error) {
    if (error.message === "City not found")
      output.innerHTML = "City not found. Check the spelling.";
    else if(error instanceof TypeError)
      output.innerHTML = "No internet connection.";
    else
      output.innerHTML = 'Something went wrong. Try agian';
    console.log(error);
    forecast.innerHTML = '';
    savedOutput.innerHTML = '';
  }
}
