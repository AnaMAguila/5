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
let acuditNet = ``;
const textAcudit = document.querySelector(`.textAcudit`);
const btnAcudit = document.querySelector(`.btnAcudit`);
const divValoracio = document.querySelector(`.valoracio`);
const divTemps = document.querySelector(`.temps`);
// Oculta botones valoración si no hay chiste
divValoracio.style.display = `none`;
if (btnAcudit != null)
    btnAcudit.addEventListener(`click`, mostraAcudit);
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
        console.log(acuditObj.joke);
        acuditNet = acuditObj.joke;
        textAcudit.innerHTML = `" ${acuditNet} "`;
    });
}
function valoracio(nota) {
    // Muestra la nota del chiste por consola
    console.log("Score: ", nota);
}
