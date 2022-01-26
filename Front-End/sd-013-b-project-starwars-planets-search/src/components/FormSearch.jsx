import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

import '../style/main.css';

const FormSearch = () => {
  const { filters, namePlanetFilter, filterByNumber, setFilters } = useContext(Context);
  const { filterByName: { name } } = filters;

  const [state, setState] = useState({ column: '', comparison: '', value: '0' });
  // const [copySelect, setCopySelect] = useState();
  const [select, setSelect] = useState(
    {
      column: [
        'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
      ],
      comparison: [
        'maior que', 'menor que', 'igual a',
      ],
    },
  );

  useEffect(() => {
    // setCopySelect(select);
    setState({
      column: select.column[0],
      comparison: select.comparison[0],
      value: '0',
    });
  }, [select]);

  function handleChange({ target }) {
    if (target.name === 'value' && target.value < 0) target.value = 0;
    setState({
      ...state,
      [target.name]: target.value,
    });
  }

  function handleClick() {
    if (state.value === '') setState({ ...state, value: '0' });

    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column: state.column,
          comparison: state.comparison,
          value: state.value,
        },
      ],
    });

    const toRemove = [...select.column];
    const aTlist = [];
    toRemove.forEach((del) => {
      if (del !== state.column) {
        aTlist.push(del);
      }
    });
    setSelect({
      ...select,
      column: [...aTlist],
    });
    filterByNumber(state);
  }

  function formContent() {
    const filterColumn = select.column;
    const filterComparison = select.comparison;
    return (
      <fieldset>
        <label htmlFor="search-text">
          Filtre Planetas
          <input
            type="text"
            name="search-text"
            value={ name }
            onChange={ (event) => namePlanetFilter(event) }
            data-testid="name-filter"
          />
        </label>
        <label htmlFor="column">
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {filterColumn.map((item) => (
              <option value={ item } key={ item } name={ item }>{ item }</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            name="comparison"
            id="input-comparison"
            data-testid="comparison-filter"
            onChange={ handleChange }
          >
            {filterComparison.map((item) => (
              <option value={ item } key={ item } name={ item }>{ item }</option>
            ))}
          </select>
        </label>
        <label htmlFor="value">
          <input
            name="value"
            type="number"
            data-testid="value-filter"
            autoComplete="off"
            value={ state.value }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          filtrar
        </button>
      </fieldset>
    );
  }

  return (
    <form className="form-search">
      { formContent() }
    </form>
  );
};

export default FormSearch;

// referências para elaboração da lógica
// https://pt.stackoverflow.com/
// https://app.betrybe.com/course/...
