import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  describe('É renderizado um card com as informações de um determinado pokémon', () => {
    const pikachu = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    };
    const { averageWeight, id, image, name, type } = pikachu;
    const { measurementUnit, value } = averageWeight;

    test('O nome correto do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokeName = screen.getByTestId('pokemon-name');
      expect(pokeName).toBeInTheDocument();
      expect(pokeName.innerHTML).toBe(name);
    });

    test('O tipo correto do pokémon deve ser mostrado na tela;', () => {
      renderWithRouter(<App />);
      const pokeType = screen.getByTestId('pokemon-type');
      expect(pokeType).toBeInTheDocument();
      expect(pokeType.innerHTML).toBe(type);
    });

    test('O peso correto do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokeWeight = screen.getByTestId('pokemon-weight');
      expect(pokeWeight).toBeInTheDocument();
      const weightText = `Average weight: ${value} ${measurementUnit}`;
      expect(pokeWeight.innerHTML).toBe(weightText);
    });

    test('A imagem correta do pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const imgUrl = image;
      const pokeImg = screen.getByRole('img', { name: /Pikachu/i });
      expect(pokeImg).toBeInTheDocument();
      expect(pokeImg.src).toContain(imgUrl);
    });

    test('O card do pokémon deve ter um link que leva aos detalhes do pokemon', () => {
      const { history } = renderWithRouter(<App />);
      const pokeLink = screen.getByRole('link', { name: /More details/i });
      expect(pokeLink).toBeInTheDocument();

      userEvent.click(pokeLink);
      const pathDescription = `/pokemons/${id}`;
      expect(history.location.pathname).toBe(pathDescription);
    });

    test('A funcionalidade de favoritar o pokemon', () => {
      const { history } = renderWithRouter(<App />);
      const pokeLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(pokeLink);
      const pathDescription = `/pokemons/${id}`;
      expect(history.location.pathname).toBe(pathDescription);

      const checkboxFavorite = screen.getByRole(
        'checkbox', { name: /Pokémon favoritado?/i },
      );
      expect(checkboxFavorite).toBeInTheDocument();
      userEvent.click(checkboxFavorite);
      expect(checkboxFavorite.checked).toBeTruthy();

      const starFavoriteImg = screen.getByRole(
        'img', { name: `${name} is marked as favorite` },
      );
      expect(starFavoriteImg).toBeInTheDocument();
      const favoriteImgSrc = 'http://localhost/star-icon.svg';
      expect(starFavoriteImg.src).toBe(favoriteImgSrc);
    });
  });
});
