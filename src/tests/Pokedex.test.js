import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Verifica todas as funcionalidades do component Pokedex', () => {
  describe('', () => {
    test('Se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
      renderWithRouter(<App />);
      const heading = screen.getByRole('heading',
        { name: /Encountered pokémons/i, level: 2 });

      expect(heading).toBeInTheDocument();
    });
  });

  describe('Checa a funcionalidade do botão Próximo Pokemon', () => {
    test('O botão deve conter o texto "Próximo pokémon"', () => {
      renderWithRouter(<App />);
      const button = screen.getByRole('button', { name: /Próximo pokémon/i });

      expect(button).toBeInTheDocument();
    });
    test('Se os pokémons são mostrados, um a um, ao clicar no botão', () => {
      renderWithRouter(<App />);
      const button = screen.getByRole('button', { name: /Próximo pokémon/i });

      pokemons.forEach((pokemon) => {
        const pokemonName = pokemon.name;
        const imgElement = screen.getByRole('img', { name: (`${pokemonName} sprite`) });
        expect(imgElement).toBeInTheDocument();
        userEvent.click(button);
      });
    });

    test('O primeiro pokémon da lista deve ser mostrado ao clicar no botão, '
    + 'se estiver no último pokémon da lista.', () => {
      renderWithRouter(<App />);
      const button = screen.getByRole('button', { name: /Próximo pokémon/i });

      const pokemonsQuantity = pokemons.length;

      pokemons.forEach((pokemon, index) => {
        const pokemonName = pokemon.name;
        const imgElement = screen.getByRole('img', { name: (`${pokemonName} sprite`) });
        expect(imgElement).toBeInTheDocument();
        userEvent.click(button);
        if (index === pokemonsQuantity) {
          const imgPikachu = screen.getByRole('img', { name: /Pikachu/i });
          expect(imgPikachu).toBeInTheDocument();
        }
      });
    });
  });
  describe('Checa as funcionalidades dos botões de filtros', () => {
    test('Se os botões tem os nomes corretos e não se repetem', () => {
      const fetchPokemonTypes = () => (
        [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
      );
      const types = fetchPokemonTypes();

      renderWithRouter(<App />);
      const buttons = screen.getAllByTestId('pokemon-type-button');

      const buttonsType = buttons.map((button) => types.includes(button.innerHTML));
      const checkForIncorrectNames = buttonsType.includes(false);
      expect(buttons).toHaveLength(types.length);
      expect(checkForIncorrectNames).toBeFalsy();
    });

    test('Se a Pokédex contém um botão para resetar o filtro e é possivel clicar', () => {
      renderWithRouter(<App />);
      const allButton = screen.getByRole('button', { name: /all/i });

      expect(allButton).toBeInTheDocument();
      userEvent.click(allButton);
    });
  });
});
