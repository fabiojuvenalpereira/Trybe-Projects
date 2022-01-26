import React from 'react';
import PropTypes from 'prop-types';

class InputSelect extends React.Component {
  render() {
    const { selGenre, onSelChange } = this.props;
    return (
      <label htmlFor="select-input" data-testid="select-input-label">
        Filtrar por gênero
        <select
          data-testid="select-input"
          name="selectedGenre"
          id="select-input"
          value={ selGenre }
          onChange={ onSelChange }
        >
          <option value="" data-testid="select-option">Todos</option>
          <option value="action" data-testid="select-option">Ação</option>
          <option value="comedy" data-testid="select-option">Comédia</option>
          <option value="thriller" data-testid="select-option">Suspense</option>
        </select>
      </label>
    );
  }
}

InputSelect.propTypes = {
  selGenre: PropTypes.string.isRequired,
  onSelChange: PropTypes.func.isRequired,
};

export default InputSelect;
