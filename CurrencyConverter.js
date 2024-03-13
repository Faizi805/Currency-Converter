const Base_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies";

//   /eur.json

// async function fetchData(primaryUrl, fallbackUrl) {
//   try {
//     const response = await fetch(primaryUrl);
//     if (!response.ok) {
//       throw new Error(`Error fetching data from primary URL: ${primaryUrl}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.warn("Fetching from primary failed. Trying fallback...", error);
//     try {
//       const fallbackResponse = await fetch(fallbackUrl);
//       if (!fallbackResponse.ok) {
//         throw new Error(
//           `Error fetching data from fallback URL: ${fallbackUrl}`
//         );
//       }
//       const fallbackData = await fallbackResponse.json();
//       return fallbackData;
//     } catch (fallbackError) {
//       console.error("Both API calls failed:", fallbackError);
//       // Handle all errors here (e.g., display error message to user)
//       throw new Error("Failed to fetch data from all sources");
//     }
//   }
// }

// // Example usage
// const primaryUrl = "https://api.example.com/data";
// const fallbackUrl = "https://api.example.org/data";

// fetchData(primaryUrl, fallbackUrl)
//   .then((data) => {
//     console.log("Fetched data:", data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error.message);
//   });

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchangerate();
});

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let flagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
  element.parentElement.querySelector("img").src = flagURL;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangerate();
});

const updateExchangerate = async () => {
  let amount = document.querySelector("#amount input");
  amval = amount.value;
  if (amval === "" || amval < 1) {
    amval = 1;
    amount.value = "1";
  }
  //   let from = document.querySelector("#from").value;
  //   let to = document.querySelector("#to").value;
  //   fetchData(Base_URL, from, to, amount);

  //   console.log(fromCurr.value, toCurr.value);
  const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let exchange = data[fromCurr.value.toLowerCase()];
  //   let rate = data[fromCurr.toLowerCase()[toCurr.value.toLowerCase()]];
  //   let rate = data[toCurr];
  //   console.log(e);
  let rate = exchange[toCurr.value.toLowerCase()];
  //   console.log(rate);
  let total = rate * amval;
  msg.innerText = `${amval} ${fromCurr.value} = ${total.toFixed(2)} ${
    toCurr.value
  }`;
};
