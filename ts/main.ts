interface interfAcudits {
    joke : string;
    score : number;
    date : string;
};

//Array que almacena los datos de la interface
const reportAcudits : interfAcudits[] = []; 

//Para conservar el chiste sin ""
let acuditNet : string = ``;

const textAcudit = document.querySelector(`.textAcudit`) as HTMLElement;
const btnAcudit = document.querySelector(`.btnAcudit`) as HTMLElement;
const divValoracio = document.querySelector(`.valoracio`) as HTMLElement;
const divTemps = document.querySelector(`.temps`) as HTMLElement;

// Oculta botones valoración si no hay chiste
divValoracio.style.display = `none`;

// API Weather
fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/barcelona?unitGroup=metric&key=TBHYF4EG4ZALQ78K35FVM4TCT&contentType=json", {
  method: 'GET', 
  headers: {},           
}).then(response => {
  if (!response.ok) throw response;        
  return response.json();
}).then(response => {
  processWeatherData(response);
});

// Muestra el tiempo
const processWeatherData = (response : any) => {  
    var days=response.days[0];
    
    // divTemps.innerHTML = days.description;
    divTemps.innerHTML = `<img src="./assets/icons/${days.icon}.png" alt="Weather" class="svg-icon"> | ${days.temp}ºC`;
}

const generaBlob = () => {
    const caixaBlob = document.querySelector(`.caixaBlob`) as HTMLElement;

    const blobAleatori : number = Math.floor(Math.random()*10);
    const blobAleaSec1 : number = Math.floor(Math.random()*10);
    const blobAleaSec2 : number = Math.floor(Math.random()*10);

    caixaBlob.innerHTML = `
        <div class="blobSec1">
        <img src="./assets/blob/blob${blobAleaSec1}.svg" >
        </div>
        <div class="blobPrinc">
        <img src="./assets/blob/blob${blobAleatori}.svg">
        </div>
        <div class="blobSec2">
        <img src="./assets/blob/blob${blobAleaSec2}.svg">
        </div>`;       
}

// Llama a la función al cargar la página
generaBlob();

// API Jokes
async function mostraAcudit() {
    const acuditsAPI = await fetch(`https://icanhazdadjoke.com/`, {
        headers: {
            Accept: `application/json`,
        }
    });

    const acuditObj = await acuditsAPI.json();
    
    divValoracio.style.display = `block`;

    //console.log(acuditObj.joke);

    acuditNet = acuditObj.joke;
    textAcudit.innerHTML = `" ${acuditNet} "`;

    generaBlob(); 
}

// API Jokes de Chuck Norris
async function mostraAcuditChuck() {
    const acuditsAPIChuck = await fetch(`https://api.chucknorris.io/jokes/random`, {
        headers: {
            Accept: `application/json`,
        }
    });

    const acuditObj = await acuditsAPIChuck.json();
    divValoracio.style.display = `block`;
    
    acuditNet = acuditObj.value;
    textAcudit.innerHTML = `" ${acuditNet} "`;

    generaBlob(); 
}

// Genera un número aleatorio para mostrar los chistes
const acuditAleatori = () =>{
    const numAleatori : number = Math.floor(Math.random()*2);
    (numAleatori%2==0) ?  mostraAcudit() : mostraAcuditChuck(); 
}

btnAcudit.addEventListener(`click`, acuditAleatori);

const valoracio = (nota : number) => {
    let resultat: interfAcudits = {
        joke : acuditNet,
        score: nota,
        date: new Date().toISOString()
    };

    // Muestra la nota del chiste por consola
    //console.log("Score: ", nota);

    //Comprobar si el chiste existe y crearlo o modificar la nota
    const foundIndex = reportAcudits.findIndex(element => element.joke === acuditNet);    
    (foundIndex == -1) ? reportAcudits.push(resultat) : reportAcudits[foundIndex]=resultat; 

    //Muestra por consola el array de chistes con su última valoración
    console.log(reportAcudits);
}