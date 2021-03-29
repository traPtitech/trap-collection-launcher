import React from 'react';
import { Redirect } from 'react-router-dom';
import { Config } from './config';
import GameDetailPage from '@/renderer/views/GameDetail';
import GameListPage from '@/renderer/views/GameList';
import LoadingPage from '@/renderer/views/Loading';
import TitlePage from '@/renderer/views/Title';

export const generalConfig: Config = {
  lng: 'en',
  routes: [
    {
      path: '/',
      element: <Redirect to='/loading' />,
    },
    {
      path: '/loading',
      element: <LoadingPage />,
    },
    {
      path: '/title',
      element: <TitlePage />,
    },
    {
      path: '/game',
      element: <GameListPage />,
    },
    {
      path: '/game/detail',
      element: <GameDetailPage />,
    },
  ],
};
