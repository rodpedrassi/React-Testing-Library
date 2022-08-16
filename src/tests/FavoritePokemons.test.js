import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import { readFavoritePokemonIds } from '../services/pokedexService';
import renderWithRouter from './renderWithRouter';

describe('Verifica todas as funcionalidades do component Favorite Pokemons', () => {
  test('Se é exibida na tela a mensagem No favorite pokemon found, '
    + 'caso a pessoa não tenha pokémons favoritos;', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoritesQuantity = readFavoritePokemonIds().length;
    if (favoritesQuantity === 0) {
      const noFavoriteMsg = screen.getByText(/No favorite pokemon found/i);
      expect(noFavoriteMsg).toBeInTheDocument();
    } else {
      const pokemonWeight = screen.getByText(/Average weight:/i);
      expect(pokemonWeight).toBeInTheDocument();
    }
  });
});
