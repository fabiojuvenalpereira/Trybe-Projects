import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import Context from './Context';
import getPlanets from '../services/Api';

const Provider = ({ children }) => {
  const [data, setData] = useState('');
  const [dataToFilter, setDataToFilter] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const filterText = useCallback((planet) => {
    const filter = filters.filterByName.name;
    const toFilter = planet.name.toLowerCase();
    return (toFilter.includes(filter) ? planet : '');
  }, [filters.filterByName.name]);

  useEffect(() => {
    setDataToFilter(data);
  }, [data]);

  useEffect(() => {
    const filteredObjects = Object.values(data).filter((planet) => filterText(planet));
    setDataToFilter(filteredObjects);
  }, [data, filters.filterByName, filterText]);

  const fetchplanets = useCallback(async () => {
    const url = 'https://swapi.dev/api/planets/';
    const fetch = await getPlanets(url);
    setData(fetch.results);
  }, []);

  function namePlanetFilter({ target }) {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  }

  function filterByNumber(toFilterItems) {
    const { column, comparison, value } = toFilterItems;
    const filteredItems = Object.values(data).map((item) => {
      let chooseItem;
      switch (comparison) {
      case 'maior que':
        chooseItem = (Number(item[column]) > Number(value) ? item : null);
        break;
      case 'menor que':
        chooseItem = (Number(item[column]) < Number(value) ? item : null);
        break;
      default:
        chooseItem = (Number(item[column]) === Number(value) ? item : null);
      }
      return chooseItem;
    });

    const filteredPlanets = [];
    filteredItems.forEach((planet) => (planet) && filteredPlanets.push(planet));
    const planetArr = filteredPlanets.filter((planet) => filterText(planet));

    setDataToFilter(planetArr);
  }

  // ------------------------------------- //
  const context = {
    dataToFilter,
    fetchplanets,
    filters,
    setFilters,
    namePlanetFilter,
    filterByNumber,
  };
  return (
    <Context.Provider value={ context } displayName="Context Display Name">
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;

// fetchplanets = useCallback => Recebe como argumentos,
// um callback e um array. useCallback retornar?? uma vers??o memoizada do callback que s?? muda se uma das entradas tiverem sido alteradas.
// Isto ?? ??til quando utilizamos callbacks a fim de otimizar componentes filhos,
// que dependem da igualdade de refer??ncia para evitar renderiza????es desnecess??rias (como por exemplo shouldComponentUpdate)
// para filtrar os componentes por nome e pelos valores num??ricos (linha 55-72);
// tentei fazer de algumas formas, por??m o resultado n??o era muito interessante,
// ent??o busquei ajuda de alguns colegas para conseguir realizar de uma forma,
