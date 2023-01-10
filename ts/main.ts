let acuditNet : string = ``;
const textAcudit = document.querySelector(`.textAcudit`) as HTMLElement;
const btnAcudit = document.querySelector(`.btnAcudit`) as HTMLElement;
const divValoracio = document.querySelector(`.valoracio`) as HTMLElement;
const divTemps = document.querySelector(`.temps`) as HTMLElement;

// Oculta botones valoración si no hay chiste
divValoracio.style.display = `none`;

if(btnAcudit != null) btnAcudit.addEventListener(`click`, mostraAcudit);


// API Jokes
async function mostraAcudit() {
    const acuditsAPI = await fetch(`https://icanhazdadjoke.com/`, {
        headers: {
            Accept: `application/json`,
        }
    });

    const acuditObj = await acuditsAPI.json();
    
    divValoracio.style.display = `block`;

    console.log(acuditObj.joke);

    acuditNet = acuditObj.joke;
    textAcudit.innerHTML = `" ${acuditNet} "`;
}

function valoracio(nota : number) {
    // Muestra la nota del chiste por consola
    console.log("Score: ", nota);
}