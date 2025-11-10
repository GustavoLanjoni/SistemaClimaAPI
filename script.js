const apiKey = "c2414972943f8b5ec6279693bf12a6e4"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      alert("Cidade não encontrada!");
      return;
    }

    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("humidity").textContent = data.main.humidity;

  } catch (error) {
    alert("Erro ao buscar dados do clima!");
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(cityInput.value.trim());
  }
});