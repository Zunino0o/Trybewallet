import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div>
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select data-testid="currency-input" name="" id="" />
        <select data-testid="method-input" name="" id="" />
        <select data-testid="tag-input" name="" id="" />
      </div>
    );
  }
}

export default WalletForm;
