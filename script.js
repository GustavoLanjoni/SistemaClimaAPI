const apiKey = "c2414972943f8b5ec6279693bf12a6e4"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const container = document.getElementById("container");

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

    changeBackground(data.weather[0].main);

  } catch (error) {
    alert("Erro ao buscar dados do clima!");
    console.error(error);
  }
}

function changeBackground(weatherMain) {
  let bg;

  switch (weatherMain.toLowerCase()) {
    case "clear":
      bg = "linear-gradient(135deg, #f9d423, #ff4e50)"; // Sol
      break;
    case "clouds":
      bg = "linear-gradient(135deg, #757f9a, #d7dde8)"; // Nublado
      break;
    case "rain":
    case "drizzle":
      bg = "linear-gradient(135deg, #4e54c8, #8f94fb)"; // Chuva
      break;
    case "thunderstorm":
      bg = "linear-gradient(135deg, #141e30, #243b55)"; // Tempestade
      break;
    case "snow":
      bg = "linear-gradient(135deg, #83a4d4, #b6fbff)"; // Neve
      break;
    case "mist":
    case "fog":
      bg = "linear-gradient(135deg, #606c88, #3f4c6b)"; // Névoa
      break;
    default:
      bg = "linear-gradient(135deg, #6a11cb, #2575fc)"; // Padrão
  }

  document.body.style.background = bg;
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather(cityInput.value.trim());
});