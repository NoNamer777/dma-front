type StorageMockType = { [key: string]: any };

export class StorageMock {

  session: StorageMockType = {};

  local: StorageMockType = {};

  constructor() {
    spyOn(localStorage, 'getItem').and.callFake((key: string): (any | null) => {
      return this.local[key] ?? null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: any): void => {
      this.local[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete this.local[key];
    });
    spyOn(localStorage, 'clear').and.callFake((): void => {
      this.local = {};
    });

    spyOn(sessionStorage, 'getItem').and.callFake((key: string): (any | null) => {
      return this.session[key] ?? null;
    });
    spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: any): void => {
      this.session[key] = value;
    });
    spyOn(sessionStorage, 'removeItem').and.callFake((key: string): void => {
      delete this.session[key];
    });
    spyOn(sessionStorage, 'clear').and.callFake((): void => {
      this.session = {};
    });
  }

  reset(): void {
    this.session = {};
    this.local = {};
  }
}
