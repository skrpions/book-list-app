import { ReduceTextPipe } from './reduce-text.pipe';

describe('ReduceTextPipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should reduce text correctly', () => {
    const inputText = 'This is a long text';
    const maxLength = 7;
    const expectedText = 'This is';

    const result = pipe.transform(inputText, maxLength);

    expect(result).toEqual(expectedText);
  });

  it('should handle input text shorter than max length', () => {
    const inputText = 'Short';
    const maxLength = 10;

    const result = pipe.transform(inputText, maxLength);

    expect(result).toEqual(inputText);
  });

  xit('should handle null input', () => {
    const inputText = null;
    const maxLength = 5;

    const result = pipe.transform(inputText, maxLength);

    expect(result).toBeNull();
  });

  xit('should handle undefined input', () => {
    const inputText = undefined;
    const maxLength = 5;

    const result = pipe.transform(inputText, maxLength);

    expect(result).toBeUndefined();
  });
});
