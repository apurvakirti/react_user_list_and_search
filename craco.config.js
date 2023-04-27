const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@common': path.resolve(__dirname, 'src/common/'),
      '@shared': path.resolve(__dirname, 'src/shared/'),
      '@core': path.resolve(__dirname, 'src/core/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@store': path.resolve(__dirname, 'src/rootStore/store'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@store(.*)$': '<rootDir>/src/rootStore/store',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
      },
    },
  },
};