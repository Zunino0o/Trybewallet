// Esse reducer será responsável por tratar as informações da pessoa usuária
import { FIRST_TASK } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FIRST_TASK:
    return state;
  default:
    return state;
  }
};
