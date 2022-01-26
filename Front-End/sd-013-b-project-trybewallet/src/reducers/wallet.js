import { GET_CURRENCIES, GET_EXPENSES } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state, currencies: Object.keys(action.payload),
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        action.payload,
      ],
    };
  default:
    return state;
  }
};

export default walletReducer;
