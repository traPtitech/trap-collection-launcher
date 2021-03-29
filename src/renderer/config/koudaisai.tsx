import React from 'react';
import { Redirect } from 'react-router-dom';
import { Config } from './config';
import GameDetailPage from '@/renderer/views/GameDetail';
import GameListPage from '@/renderer/views/GameList';
import LoadingPage from '@/renderer/views/Loading';
import SettingPage from '@/renderer/views/Setting';
import TitlePage from '@/renderer/views/Title/koudaisai';

export const koudaisaiConfig: Config = {
  lng: 'ja',
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
    {
      path: '/setting',
      element: <SettingPage />,
    },
  ],
};
