import React from 'react';
import CharactersService from '../services/charactersAPI';
import Table from './Table';

require('dotenv').config();

const THIRTY = 30000;
const URL_HAWKINS = process.env.REACT_APP_HAWKINS_URL || 'http://localhost:3002';
const URL_UPSIDEDOWN = process.env.REACT_APP_UPSIDEDOWN_URL || 'http://localhost:3003';
const TIMEOUT_HAWKINS = process.env.REACT_APP_HAWKINS_TIMEOUT || THIRTY;
const TIMEOUT_UPSIDEDOWN = process.env.REACT_APP_UPSIDEDOWN_TIMEOUT || THIRTY;
const DEVELOPMENT = process.env.REACT_APP_DEVELOPMENT;

console.log(DEVELOPMENT);

const getRealityClass = (hereIsTheUpsideDownWorld) => (
  hereIsTheUpsideDownWorld ? 'upside-down' : 'stranger-things'
);

const strangerThingsConfig = {
  url: URL_HAWKINS,
  timeout: TIMEOUT_HAWKINS,
};

const upsideDownConfig = {
  url: URL_UPSIDEDOWN,
  timeout: TIMEOUT_UPSIDEDOWN,
};

const charactersService = new CharactersService(strangerThingsConfig);
const charactersUpsideDownService = new CharactersService(upsideDownConfig);

class StrangerThings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hereIsTheUpsideDownWorld: false,
      development: DEVELOPMENT,
      characterName: '',
      characters: [],
      page: 1,
    };

    this.handleInput = this.handleInput.bind(this);
    this.changeRealityClick = this.changeRealityClick.bind(this);

    this.searchClick = this.searchClick.bind(this);
    this.searchCharacter = this.searchCharacter.bind(this);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    this.developmentVersion = this.developmentVersion.bind(this);
  }

  handleInput(event) {
    this.setState({
      characterName: event.target.value,
    });
  }

  changeRealityClick() {
    const { hereIsTheUpsideDownWorld } = this.state;
    this.setState({
      hereIsTheUpsideDownWorld: !hereIsTheUpsideDownWorld,
      characters: [],
    });
  }

  searchClick() {
    this.setState(
      {
        page: 1,
      },
      this.searchCharacter(1),
    );
  }

  searchCharacter(pages) {
    const { characterName, hereIsTheUpsideDownWorld, page } = this.state;
    const service = hereIsTheUpsideDownWorld
      ? charactersUpsideDownService
      : charactersService;

    const numberOfPages = 10;
    service
      .getCharacters(characterName, pages || page, numberOfPages)
      .then(({ data: characters }) => {
        this.setState({
          characters,
        });
      });
  }

  nextPage() {
    const { page, characters } = this.state;

    if (!characters.length) return;
    this.setState(
      {
        page: page + 1,
      },
      () => this.searchCharacter(),
    );
  }

  previousPage() {
    const { page } = this.state;
    if (page <= 1) return;

    this.setState(
      {
        page: page - 1,
      },
      () => this.searchCharacter(),
    );
  }

  developmentVersion() {
    return (
      <div className="desenvolvimento">
        Em desenvolvimento
      </div>);
  }

  render() {
    const {
      hereIsTheUpsideDownWorld, characterName, characters, page, development,
    } = this.state;
    return (
      <div
        className={ `reality ${getRealityClass(
          hereIsTheUpsideDownWorld,
        )}` }
      >
        <div>
          { development === 'true' ? this.developmentVersion() : (<div />) }
        </div>
        <div className="content strangerfy">
          <div className="change-reality">
            <button type="button" onClick={ this.changeRealityClick }>
              {' '}
              Mudar de Realidade
            </button>
          </div>

          <div>
            <input
              placeholder="Nome do Personagem"
              onChange={ this.handleInput }
              value={ characterName }
            />
            <button type="button" onClick={ this.searchClick }>Pesquisar</button>
          </div>

          <div>
            <Table characters={ characters } />
          </div>

          <div>
            <p>
              Página atual:
              {page}
            </p>
          </div>
          <div>
            <button type="button" onClick={ this.previousPage }>Anterior</button>
            <button type="button" onClick={ this.nextPage }>Próximo</button>
          </div>
        </div>
      </div>
    );
  }
}

export default StrangerThings;
