import getCurrenciesFromApi from '../services/getCurrenciesFromApi';

export const INPUT_USER = 'INPUT_USER';
const URL = 'https://economia.awesomeapi.com.br/json/all';

export const userLogin = (emailPayload) => ({
  type: INPUT_USER,
  payload: emailPayload,
});

export const GET_EXPENSES = 'GET_EXPENSES';
export const expenses = (expensesPayload) => ({
  type: GET_EXPENSES,
  payload: expensesPayload,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const currencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const fetchCurrencies = await getCurrenciesFromApi(URL);
  const USDT = 'USDT';
  delete fetchCurrencies[USDT];
  dispatch(currencies(fetchCurrencies));
};

export const exchangeRatesThunk = (receiveExpenses) => async (dispatch) => {
  const fetchCurrencies = await getCurrenciesFromApi(URL);
  const USDT = 'USDT';
  delete fetchCurrencies[USDT];
  const exchangeContais = {
    ...receiveExpenses,
    exchangeRates: {
      ...fetchCurrencies,
    },
  };
  dispatch(expenses(exchangeContais));
};
