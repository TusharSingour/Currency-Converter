const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".message");

for (let select of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = true;
        }else if(select.name === "to" && code === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    } );
}



const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click",async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 0){
        amtVal = 1;
        amount.value ="1"
    }

   // console.log(fromcurr.value, tocurr.value);
   const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
});
