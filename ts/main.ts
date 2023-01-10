const textAcudit = document.querySelector(`.textAcudit`);
const btnAcudit = document.querySelector(`.btnAcudit`);

if(btnAcudit != null) btnAcudit.addEventListener(`click`, mostraAcudit);

async function mostraAcudit() {
    const acuditsAPI = await fetch(`https://icanhazdadjoke.com/`, {
        headers: {
            Accept: `application/json`,
        }
    });

    const acuditObj = await acuditsAPI.json();
    console.log(acuditObj.joke);
}