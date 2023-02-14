import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import mockData from './helpers/mockData';

const EMAIL_INPUT = 'email-input';
const PASS_INPUT = 'password-input';
const TOTAL_FIELD = 'total-field';
const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';
const VALID_EMAIL = 'zuzu@zuzu.com';
const VALID_PASS = '123456';
const ADD_VALUE = 'Adicionar despesa';

describe('TESTES REQUISITO 5', () => {
  test('testes Login', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('heading', { name: 'LOGIN' })).toBeInTheDocument();
    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    expect(screen.getByRole('button').disabled).toBe(true);
    userEvent.type(screen.getByTestId(PASS_INPUT), VALID_PASS);
    expect(screen.getByRole('button').disabled).toBe(false);
  });

  test('testes Wallet', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASS_INPUT), VALID_PASS);
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(history.location.pathname).toBe('/carteira');

    expect(screen.getByTestId(TOTAL_FIELD).innerHTML).toBe('0.00');
    expect(screen.getByRole('heading', { name: 'BRL' })).toBeInTheDocument();

    userEvent.type(screen.getByTestId(VALUE_INPUT), '421');
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'Guitarra');
    userEvent.click(screen.getByRole('button', { name: ADD_VALUE }));

    await waitFor(() => expect(screen.getByTestId(TOTAL_FIELD).innerHTML)
      .toEqual('2193.07'), { timeout: 4000 });

    userEvent.type(screen.getByTestId(VALUE_INPUT), '69');
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'Pedal');
    userEvent.click(screen.getByRole('button', { name: ADD_VALUE }));

    await waitFor(() => expect(screen.getByTestId(TOTAL_FIELD).innerHTML)
      .toEqual('2324.26'), { timeout: 4000 });

    const deleteBtns = screen.getAllByTestId('delete-btn');
    console.log(deleteBtns);
    userEvent.click(deleteBtns[1]);

    await waitFor(() => expect(screen.getByTestId(TOTAL_FIELD).innerHTML)
      .toEqual('2193.07'), { timeout: 4000 });
  });

  test('testes Table', async () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), VALID_EMAIL);
    userEvent.type(screen.getByTestId(PASS_INPUT), VALID_PASS);
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    userEvent.type(screen.getByTestId(VALUE_INPUT), '421');
    userEvent.click(screen.getByRole('button', { name: ADD_VALUE }));

    const deleteBtn = await screen.findByTestId('delete-btn');

    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(deleteBtn).not.toBeInTheDocument();
  });
});
