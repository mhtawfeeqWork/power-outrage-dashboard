async function getData() {
    const URL = "https://raw.githubusercontent.com/MrSunshyne/mauritius-dataset-electricity/refs/heads/main/data/power-outages.latest.json";

    let result = await fetch(URL)
    let json = await result.json()
    return json

}

function extractFuture(obj, day) {
    return obj[day]
}

function addToDom(outrage) {
    const output = document.getElementById('cards-container');

    const templateCard = `
        <div class="card border rounded-full space-y-4 p-10 bg-white">
        <div class="text-center font-medium">${outrage.date}</div>
        <div class="flex justify-between" >
            <div >${outrage.locality}</div>
            <div>${outrage.district}</div>
        </div>
        <div class="flex justify-between">
            <div>${outrage.from}</div>
            <div>${outrage.to}</div>
        </div>
        </div>
        
    `
    output.innerHTML += templateCard
    
}

function clearCards() {
    const output = document.getElementById('cards-container')
    output.innerHTML = ''
}

function renderOutput(items) {
    for (let index=0; index < items.length; index++) {
        const outrage = items[index]
        addToDom(outrage)
    }
}

async function initialize() {
    const result = await getData()
    const day = extractFuture(result, "today")
    clearCards()
    renderOutput(day)
    
    // addToDom(future)s
    console.log(future)
}

document.addEventListener("DOMContentLoaded", initialize)