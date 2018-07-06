const gatsby = require.requireActual("gatsby");
global.___loader = {
    enqueue: jest.fn()
};

module.exports = gatsby;
