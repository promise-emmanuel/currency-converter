import './style.css'
import CurrencyAPI from '@everapi/currencyapi-js'

const currencyApi = new CurrencyAPI(import.meta.env.VITE_API_KEY);

const latestRatesForm = document.getElementById('latest_rates_form');
const baseCurrencyInput = document.getElementById('base_currency_input');
const baseCurrencyAmount = document.getElementById('base_currency_quantity')
const currenciesInput = document.getElementById('currencies');
const latestRatesDisplay = document.getElementById('latest_rates_display');

latestRatesForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!baseCurrencyInput.value.trim() || !currenciesInput.value.trim() || !baseCurrencyAmount.value.trim()) {
    latestRatesDisplay.innerHTML = `<div class="text-red-500">All fields are required!</div>`;
    return;
  }


  currencyApi.latest({
      base_currency: baseCurrencyInput.value.trim(),
      currencies: currenciesInput.value.trim(),

  }).then(response => {
      let currencies = Object.keys(response.data);
      let resultHTML = '';

      for (let currency of currencies) {
          resultHTML += `<div>             
              <strong>${currency}</strong>
              <div class="rate-conversion">
                <span class="rate">Rate: ${(response.data[currency].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span class="conversion">Converted Amount: ${(response.data[currency].value * parseFloat(baseCurrencyAmount.value)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <div>
          </div>`;
      }
      latestRatesDisplay.innerHTML = resultHTML;
  }).catch(error => {
    console.error('API request failed: ', error);
    latestRatesDisplay.innerHTML = `<div class="text-red-500">Error fetching exchange rates.</div>`;
  });
});
