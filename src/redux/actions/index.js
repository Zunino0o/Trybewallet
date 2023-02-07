// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const API_REQUEST = 'API_REQUEST';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export const apiRequest = () => ({
  type: API_REQUEST,
});

export const requestSuccessful = (stat) => ({
  type: REQUEST_SUCCESSFUL,
  payload: stat,
});

export const submitExpense = (stat) => ({
  type: SUBMIT_EXPENSE,
  payload: stat,
});
