const key = "79523cf419d3452db4e223122232011";
const botao = document.querySelector('.nav__button');
const container = document.querySelector('.container')

botao.addEventListener('click', async () => {

    const cidade = document.querySelector('.nav__input').value;

    const api = await chamarApi(cidade)

    if(api) preencherInformacoes(api,cidade);
})




async function chamarApi (cidade) {

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl)

    if(resposta.status !== 200) return;

    const api = await resposta.json();

    return api;
}

function preencherInformacoes (dados,cidade) {

    console.log(dados)

    const grausC = dados.current.temp_c
    const estado = dados.location.region
    const imagem = dados.current.condition.icon
    const humidade = dados.current.humidity
    const vento = dados.current.wind_kph
    const horario = dados.location.localtime

    document.querySelector('.horario').innerHTML = horario
    document.querySelector('.vento').innerHTML = `${vento}km/h`
    document.querySelector('.humidade').innerHTML = `${humidade}%`
    document.querySelector('.imagem__clima').setAttribute('src',imagem)
    document.querySelector('.cidade__temperatura').innerHTML = `${parseInt(grausC)}°C`
    document.querySelector('.estado').innerHTML = estado
    document.querySelector('.cidade__nome').innerHTML = cidade

    const raio = '//cdn.weatherapi.com/weather/64x64/day/200.png'

    if (imagem == raio) {
        container.style.backgroundImage = "url('./rain.jpg')";
    }

   
}
