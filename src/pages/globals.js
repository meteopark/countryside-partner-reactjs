import React from 'react';

export const globlas = {

    dev: {
        server_host: 'http://countryside-partner-laravel.test',
    },
    production: {
        server_host: 'https://api-countryside-partner.meteopark.dev',
    }
}

export const GlobalsContext = React.createContext(
  globlas.production
);