import React from 'react';
import PropTypes from 'prop-types';
import InputSearchBar from './InputSearchBar';
import InputCheckBox from './InputCheckBox';
import InputSelect from './InputSelect';

class SearchBar extends React.Component {
  render() {
    const {
      searchText,
      onSearchTextChange,
      bookmarkedOnly,
      onBookmarkedChange,
      selectedGenre,
      onSelectedGenreChange,
    } = this.props;
    return (
      <form data-testid="search-bar-form">
        <fieldset>
          <InputSearchBar searchText={ searchText } onSe={ onSearchTextChange } />
          <InputCheckBox checked={ bookmarkedOnly } onChange={ onBookmarkedChange } />
          <InputSelect selGenre={ selectedGenre } onSelChange={ onSelectedGenreChange } />
        </fieldset>
      </form>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};
export default SearchBar;
