"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
//Array que almacena los datos de la interface
const reportAcudits = [];
//Para conservar el chiste sin ""
let acuditNet = ``;
const textAcudit = document.querySelector(`.textAcudit`);
const btnAcudit = document.querySelector(`.btnAcudit`);
const divValoracio = document.querySelector(`.valoracio`);
const divTemps = document.querySelector(`.temps`);
// Oculta botones valoración si no hay chiste
divValoracio.style.display = `none`;
// API Weather
fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/barcelona?unitGroup=metric&key=TBHYF4EG4ZALQ78K35FVM4TCT&contentType=json", {
    method: 'GET',
    headers: {},
}).then(response => {
    if (!response.ok)
        throw response;
    return response.json();
}).then(response => {
    processWeatherData(response);
});
// Muestra el tiempo
function processWeatherData(response) {
    var days = response.days[0];
    // divTemps.innerHTML = days.description;
    divTemps.innerHTML = `<img src="./assets/icons/${days.icon}.png" alt="Weather" class="svg-icon"> | ${days.temp}ºC`;
}
function generaBlob() {
    const caixaBlob = document.querySelector(`.caixaBlob`);
    const blobAleatori = Math.floor(Math.random() * 10);
    const blobAleaSec1 = Math.floor(Math.random() * 10);
    const blobAleaSec2 = Math.floor(Math.random() * 10);
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
function mostraAcudit() {
    return __awaiter(this, void 0, void 0, function* () {
        const acuditsAPI = yield fetch(`https://icanhazdadjoke.com/`, {
            headers: {
                Accept: `application/json`,
            }
        });
        const acuditObj = yield acuditsAPI.json();
        divValoracio.style.display = `block`;
        //console.log(acuditObj.joke);
        acuditNet = acuditObj.joke;
        textAcudit.innerHTML = `" ${acuditNet} "`;
        generaBlob();
    });
}
// API Jokes de Chuck Norris
function mostraAcuditChuck() {
    return __awaiter(this, void 0, void 0, function* () {
        const acuditsAPIChuck = yield fetch(`https://api.chucknorris.io/jokes/random`, {
            headers: {
                Accept: `application/json`,
            }
        });
        const acuditObj = yield acuditsAPIChuck.json();
        divValoracio.style.display = `block`;
        acuditNet = acuditObj.value;
        textAcudit.innerHTML = `" ${acuditNet} "`;
        generaBlob();
    });
}
// Genera un número aleatorio para mostrar los chistes
function acuditAleatori() {
    const numAleatori = Math.floor(Math.random() * 2);
    (numAleatori % 2 == 0) ? mostraAcudit() : mostraAcuditChuck();
}
btnAcudit.addEventListener(`click`, acuditAleatori);
function valoracio(nota) {
    let resultat = {
        joke: acuditNet,
        score: nota,
        date: new Date().toISOString()
    };
    // Muestra la nota del chiste por consola
    //console.log("Score: ", nota);
    //Comprobar si el chiste existe y crearlo o modificar la nota
    const foundIndex = reportAcudits.findIndex(element => element.joke === acuditNet);
    (foundIndex == -1) ? reportAcudits.push(resultat) : reportAcudits[foundIndex] = resultat;
    //Muestra por consola el array de chistes con su última valoración
    console.log(reportAcudits);
}
