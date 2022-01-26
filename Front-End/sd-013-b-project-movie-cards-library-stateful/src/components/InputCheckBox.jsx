import React from 'react';
import PropTypes from 'prop-types';

class InputCheckBox extends React.Component {
  render() {
    const { checked, onChange } = this.props;
    return (
      <label data-testid="checkbox-input-label" htmlFor="searchText">
        Mostrar somente favoritos:
        <input
          type="checkbox"
          name="bookmarkedOnly"
          id="input-check-box"
          checked={ checked }
          onChange={ onChange }
          data-testid="checkbox-input"
        />
      </label>
    );
  }
}

InputCheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputCheckBox;
