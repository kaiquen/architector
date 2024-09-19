type Constructor<T = any> = new (...args: any[]) => T;

export class Container {
  private services = new Map<symbol, any>();

  bind<T>(identifier: symbol, clazz: Constructor<T>): void {
    this.services.set(identifier, new clazz());
  }

  get<T>(identifier: symbol): T {
    const service = this.services.get(identifier);
    if (!service) {
      throw new Error(`Service not found: ${String(identifier)}`);
    }
    return service;
  }
}
