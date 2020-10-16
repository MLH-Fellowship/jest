import AutoSuggest from './AutoSuggest'; // the filename is Autosuggest.js (lower s)
jest.mock('./AutoSuggest', () => ({get: jest.fn(() => 1000)}));

describe('test arithmetic', () => {
  it('test', () => {
    expect(1 + 2).toBe(3);
  });
});
