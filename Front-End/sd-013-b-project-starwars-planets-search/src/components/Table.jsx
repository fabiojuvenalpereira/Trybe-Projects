import React, { useContext, useEffect } from 'react';

import Context from '../context/Context';
import '../style/main.css';

export default function Table() {
  const { fetchplanets, dataToFilter } = useContext(Context);

  useEffect(() => {
    fetchplanets();
  }, [fetchplanets]);

  function mainTitle() {
    const titleTable = [
      'Nome', 'Período de Rotação', 'Órbita', 'Diâmetro', 'Clima', 'Gravidade',
      'Terreno', 'Superfície Aquática', 'População',
      'Filmes', 'Criação', 'Edição', 'link',
    ];
    return (
      <tr>
        { titleTable.map((each) => (
          <th key={ each }>{ each }</th>
        ))}
      </tr>
    );
    // Utilizando o próprio data para fazer o header da table
    // if (title !== '') {
    //   const nwObj = Object.keys(title[0]).reduce((acc, val) => {
    //     if (val !== 'residents') acc.push(val);
    //     return acc;
    //   }, []);
    //   return (
    //     <tr>
    //       {
    //         Object.values(nwObj).map((item) => {
    //           const without = item.split('_');
    //           const titleTab = without.join(' ');
    //           return (
    //             <th key={ item }>
    //               {titleTab}
    //             </th>
    //           );
    //         })
    //       }
    //     </tr>
    //   );
    // }
  }

  function mainContent(planets) {
    if (planets !== '') {
      return Object.values(planets).map((planet) => {
        delete planet.residents;
        return (
          <tr key={ planet.name }>
            { Object.values(planet).map((planetAtributes) => (
              <td key={ planetAtributes }>{planetAtributes}</td>
            ))}
          </tr>
        );
      });
    }
  }

  return (
    <table className="main-table">
      <thead>
        { mainTitle() }
      </thead>
      <tbody>
        { mainContent(dataToFilter) }
      </tbody>
    </table>
  );
}

// referências para elaboração da lógica
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// https://pt.stackoverflow.com/
// https://app.betrybe.com/course/...
// para resolver useEffect em loop foi consultado os colegas de turma que estavam presentes na sala da mentoria técnica.(Felipe Ventorim e Alan freitas)
