import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import mockData from './helpers/mockData';

const TOTAL_FIELD = 'total-field';
const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';

describe('TESTES REQUISITO 5', () => {
  test('testes Login', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('heading', { name: 'LOGIN' })).toBeInTheDocument();
    userEvent.type(screen.getByTestId('email-input'), 'teste@teste.com');
    expect(screen.getByRole('button').disabled).toBe(true);
    userEvent.type(screen.getByTestId('password-input'), 'teste123');
    expect(screen.getByRole('button').disabled).toBe(false);
  });

  test('testes Wallet', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByTestId(TOTAL_FIELD).innerHTML).toBe('0');
    expect(screen.getByRole('heading', { name: 'BRL' })).toBeInTheDocument();

    userEvent.type(screen.getByTestId(VALUE_INPUT), '420');
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'Guitarra');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    await waitFor(() => expect(screen.getByTestId(TOTAL_FIELD).innerHTML)
      .toEqual('2188.66'), { timeout: 6000 });

    userEvent.type(screen.getByTestId(VALUE_INPUT), '69');
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT), 'Pedal');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    await waitFor(() => expect(screen.getByTestId(TOTAL_FIELD).innerHTML)
      .toEqual('2548.23'), { timeout: 6000 });
  });
});
