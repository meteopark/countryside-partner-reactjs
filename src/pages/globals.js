import React from 'react';

export const globlas = {

    dev: {
        server_host: 'http://countryside-partner-laravel.test',
    },
    production: {
        server_host: 'http://countryside-partner-laravel.test123',
    }
}

export const GlobalsContext = React.createContext(
  globlas.dev
);