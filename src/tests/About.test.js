import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Verifica todas as funcionalidades do component About', () => {
  describe('Checa se /about contém as informações sobre a Pokédex', () => {
    test('Se a página contém um heading h2 com o texto "About Pokédex"', () => {
      renderWithRouter(<About />);
      const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

      expect(heading).toBeInTheDocument();
    });

    test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
      renderWithRouter(<About />);
      const paragraphOne = screen.getByText(/This application simulates/i);
      const paragraphTwo = screen.getByText(/One can filter Pokémons/i);

      expect(paragraphOne).toBeInTheDocument();
      expect(paragraphTwo).toBeInTheDocument();
    });

    test('Se a página contém a seguinte imagem de uma Pokédex', () => {
      renderWithRouter(<About />);
      const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const imgElement = screen.getByRole('img');

      expect(imgElement).toBeInTheDocument();
      expect(imgElement.src).toContain(imgUrl);
    });
  });
});
