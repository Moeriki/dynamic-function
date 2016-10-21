module.exports = {
  root: true,
  extends: [
    'muriki',
    'muriki/env/node',
    'muriki/es/2015',
    'muriki/plugins/jasmine',
  ],
  rules: {
    'func-names': 0,
  },
};
