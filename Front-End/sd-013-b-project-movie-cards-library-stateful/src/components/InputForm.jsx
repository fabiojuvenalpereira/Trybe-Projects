import React from 'react';
import PropTypes from 'prop-types';

// Componente genérico para criação dos inputforms -> estes inputs são criados pelo arquivo objeto GenerateImputForms
class InputForm extends React.Component { // cria a classe que vai ser o ponto de partida dos inputs
  render() {
    const { data: { name, dataTestid, id, type, title }, get, onCha } = this.props; // desistruturo as props recebidas em váriaveis que vão ser utilizadas para gerar o input
    return (
      // abaixo crio a label e o input passando as variáveis que foram recibidas pelas props, para criar o elemento com as características necessárias
      <label htmlFor={ id } data-testid={ `${dataTestid}-label` }>
        { title }
        <input
          type={ type }
          id={ id }
          name={ name }
          data-testid={ dataTestid }
          value={ get(name) }
          onChange={ onCha }
        />
      </label>
    );
  }
}

InputForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    dataTestid: PropTypes.string,
  }).isRequired,
  get: PropTypes.func.isRequired,
  onCha: PropTypes.func.isRequired,
};

export default InputForm;
