type StoredOverrides = {
  gate: Record<string, boolean>;
  config: Record<string, unknown>;
};

export class LocalOverrideAdapter<T extends Record<string, any>> {
  private readonly storageKey: string;

  constructor(sdkKey: string) {
    this.storageKey = `statsig.local-overrides.${sdkKey}`;
  }

  private fetch(): StoredOverrides {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return { gate: {}, config: {} };
      }

      const parsed = JSON.parse(raw);
      return {
        gate: typeof parsed?.gate === 'object' && parsed.gate !== null ? parsed.gate : {},
        config: typeof parsed?.config === 'object' && parsed.config !== null ? parsed.config : {},
      };
    } catch {
      return { gate: {}, config: {} };
    }
  }

  private persist(data: StoredOverrides): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  setGate(gateName: Extract<keyof T, string>, value: boolean): void {
    const data = this.fetch();
    data.gate[gateName] = value;
    this.persist(data);
    console.log('[Statsig] Override set:', gateName, value);
  }

  getGate(gateName: Extract<keyof T, string>): boolean | undefined {
    return this.fetch().gate[gateName];
  }

  setConfig<K extends Extract<keyof T, string>>(configName: K, value: T[K]): void {
    const data = this.fetch();
    data.config[configName] = value;
    this.persist(data);
    console.log('[Statsig] Config override set:', configName, value);
  }

  getConfig<K extends Extract<keyof T, string>>(configName: K): T[K] | undefined {
    return this.fetch().config[configName] as T[K] | undefined;
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
    console.log('[Statsig] Overrides cleared:', this.storageKey);
  }

  inspect(): void {
    const data = this.fetch();
    console.group('[Statsig] Local overrides');
    console.table({ gates: data.gate });
    console.table({ configs: data.config });
    console.groupEnd();
  }
}
