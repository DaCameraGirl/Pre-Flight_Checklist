export class LocalOverrideAdapter<T extends Record<string, any>> {
  private readonly storageKey: string;
  constructor(sdkKey: string) { this.storageKey = 'statsig.local-overrides.' + sdkKey; }

  private fetch() { 
    try { return JSON.parse(localStorage.getItem(this.storageKey) || '{"gate":{},"config":{}}'); } 
    catch { return { gate: {}, config: {} }; } 
  }

  setGate(gateName: keyof T & string, value: boolean): void {
    const data = this.fetch();
    data.gate[gateName] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    console.log('[Statsig] Override set:', gateName, value);
  }

  getGate(gateName: keyof T & string): boolean | undefined { return this.fetch().gate[gateName]; }

  inspect(): void { console.table(this.fetch().gate); }
}
