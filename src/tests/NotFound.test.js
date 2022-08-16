import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Verifica todas as funcionalidades do component NotFound', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });

    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgElement = screen.getByRole('img', { name: /Pikachu crying because/i });

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain(imgUrl);
  });
});
