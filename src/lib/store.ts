import Store = require('electron-store');

export const store = new Store({
  schema: {
    seatId: {
      type: 'number',
      minimum: 0,
      default: null,
    },
    productKey: {
      type: 'string',
      default: null,
    },
  },
});
