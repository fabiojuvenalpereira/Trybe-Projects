import React from 'react';
import PropTypes from 'prop-types';

class InputSearchBar extends React.Component {
  render() {
    const { searchText, onSe } = this.props;
    return (
      <label data-testid="text-input-label" htmlFor="searchText">
        Inclui o texto:
        <input
          data-testid="text-input"
          id="searchText"
          type="text"
          name="searchText"
          value={ searchText }
          onChange={ onSe }
        />
      </label>
    );
  }
}

InputSearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSe: PropTypes.func.isRequired,
};

export default InputSearchBar;
