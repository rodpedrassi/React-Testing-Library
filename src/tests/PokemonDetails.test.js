import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      mapImg: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      mapImg: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with '
  + 'electricity to make them tender enough to eat.',
};
const { name, foundAt } = pikachu;

const acessDetails = () => {
  renderWithRouter(<App />);
  const linkToDetails = screen.getByRole('link', { name: /More details/i });
  expect(linkToDetails).toBeInTheDocument();
  userEvent.click(linkToDetails);
};
const checkForLocation = () => {
  foundAt.forEach((found, index) => {
    const nameLocation = screen.getByText(found.location);
    const imgsLocation = screen.getAllByAltText('Pikachu location');
    expect(nameLocation).toBeInTheDocument();
    expect(imgsLocation[index].src).toBe(found.mapImg);
  });
};

describe('Teste o componente <PokemonDetails.js />', () => {
  describe('As informações detalhadas do pokémon são mostradas na tela:', () => {
    test('Deve conter um texto <name> Details, onde <name> é o nome do pokémon;', () => {
      // acessando a pagina de details do pikachu
      acessDetails();

      const headingNameDetails = screen.getByRole(
        'heading', { name: `${name} Details`, level: 2 },
      );

      expect(headingNameDetails).toBeInTheDocument();
    });

    test('Não deve existir o link para os detalhes do pokémon selecionado', () => {
      // acessando a pagina de details do pikachu
      acessDetails();

      const linkToDetailsAfterClick = screen.queryByText('More details');
      expect(linkToDetailsAfterClick).toBeNull();
    });

    test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      // acessando a pagina de details do pikachu
      acessDetails();

      const heading = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(heading).toBeInTheDocument();
    });

    test('Deve conter um parágrafo com o resumo do pokémon', () => {
      // acessando a pagina de details do pikachu
      acessDetails();

      const summaryParagraph = screen.getByText(/This intelligent Pokémon roasts/i);
      expect(summaryParagraph).toBeInTheDocument();
    });
  });
  describe('Existe na página os mapas contendo as localizações do pokémon', () => {
    test('Existe um h2 com o texto Game Locations of <name>', () => {
      acessDetails();
      const heading = screen.getByRole('heading', { name: `Game Locations of ${name}` });
      expect(heading).toBeInTheDocument();
    });

    test('Exibe o nome da localização e uma imagem do mapa em cada localização;', () => {
      acessDetails();
      checkForLocation();
    });
  });
});

describe('Usuário pode favoritar um pokémon através da página de detalhes:', () => {
  test('A página deve exibir um checkbox que permite favoritar o pokémon', () => {
    acessDetails();

    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeTruthy();
  });
  test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    acessDetails();

    const favoriteCheckboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckboxLabel).toBeInTheDocument();
  });
});
