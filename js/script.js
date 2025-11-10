async function buscarClima() {
  const cidade = document.getElementById('cidade').value.trim();
  const resultado = document.getElementById('resultado');

  if (!cidade) {
    resultado.innerHTML = "⚠️ Digite o nome de uma cidade.";
    return;
  }

  const apiKey = "f930beba256edc03f64ac8d143619248";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultado.innerHTML = "❌ Cidade não encontrada.";
      return;
    }

    const { name, sys, main, weather, wind } = data;
    const temp = main.temp.toFixed(1);
    const sensacao = main.feels_like.toFixed(1);
    const umidade = main.humidity;
    const vento = (wind.speed * 3.6).toFixed(1); // m/s → km/h
    const descricao = weather[0].description;
    const icon = weather[0].icon;
    const isNoite = icon.includes('n');

    // Fundo e ícone dinâmico
    const fundo = isNoite
      ? 'linear-gradient(135deg, #141E30, #243B55)'
      : 'linear-gradient(135deg, #89f7fe, #66a6ff)';
    document.body.style.background = fundo;

    const iconeEmoji = isNoite ? '🌙' : '☀️';
    const classeIcone = isNoite ? 'lua' : 'sol';

    resultado.innerHTML = `
          <p><b>${name}</b>, ${sys.country}</p>
          <div class="icone ${classeIcone}">${iconeEmoji}</div>
          <p style="font-size:22px;"><b>${temp}°C</b> - ${descricao}</p>
          <div class="info">
            🌡️ Sensação térmica: <b>${sensacao}°C</b><br>
            💧 Umidade: <b>${umidade}%</b><br>
            🌬️ Vento: <b>${vento} km/h</b>
          </div>
        `;
  } catch {
    resultado.innerHTML = "⚠️ Erro ao buscar o clima.";
  }
}