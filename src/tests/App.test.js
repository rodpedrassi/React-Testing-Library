import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica todas as funcionalidades do component App', () => {
  describe('Checando o cabeçalho', () => {
    test('Se há 3 links de navegação "Home" "About" "Favorive Pokemon"', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      const favoritePokemonLink = screen.getByRole('link', { name: /favorite/i });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favoritePokemonLink).toBeInTheDocument();
    });

    test('Se a aplicação é redirecionada para a página inicial'
      + ' na URL / ao clicar no link Home da barra de navegação', () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });

      expect(history.location.pathname).toBe('/');

      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/');
    });

    test('Se a aplicação é redirecionada para a página de About, '
      + 'na URL /about, ao clicar no link About da barra de navegação', () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /about/i });

      userEvent.click(aboutLink);
      expect(history.location.pathname).toBe('/about');
    });

    test('Se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL'
      + ' /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemonLink = screen.getByRole('link', { name: /favorite/i });

      userEvent.click(favoritePokemonLink);
      expect(history.location.pathname).toBe('/favorites');
    });

    test('Se é redirecionada para a página Not Found ao entrar numa URL "/abc".', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/abc');

      expect(history.location.pathname).toBe('/abc');
    });
  });
});
