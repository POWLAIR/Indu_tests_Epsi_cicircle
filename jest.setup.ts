import '@testing-library/jest-dom';
import 'whatwg-fetch';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(content: string | RegExp): R;
    }
  }
}

export {}; 