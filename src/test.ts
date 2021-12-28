import 'jest-preset-angular/setup-jest';

const webStorageMock = () => {
    let storage: Record<string, any> = {};
    return {
      getItem: (key: string) => (key in storage ? storage[key] : null),
      setItem: (key: string, value: any) => (storage[key] = value || ''),
      removeItem: (key: string) => delete storage[key],
      clear: () => (storage = {}),
    };
  };
  
Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'localStorage', { value: webStorageMock() });
Object.defineProperty(window, 'sessionStorage', { value: webStorageMock() });

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});