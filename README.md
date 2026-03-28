# 🛠 Statsig + OTel DevTools
**Enterprise-grade feature flag and configuration override tooling for browser-based apps.**

## ⚡ Quick Cheatsheet
| Action | Command in Console |
| :--- | :--- |
| **Inspect overrides** | `adapter.inspect()` |
| **Enable a gate** | `adapter.setGate('new_onboarding_flow', true)` |
| **Override config** | `adapter.setConfig('api_timeout_ms', 500)` |
| **Clear all overrides** | `adapter.clear()` |

## 🏗 Architecture
1. **Parent-Based OpenTelemetry sampling**: preserves distributed trace continuity across service transitions.
2. **Typed local overrides**: gate and config values are stored separately in browser `localStorage`.
3. **Enterprise diagnostics**: `inspect()` logs structured gates and configs for rapid audit.

## 🚀 Usage
```typescript
import { LocalOverrideAdapter } from './src/adapter';

interface AppFeatureFlags {
  new_onboarding_flow: boolean;
  premium_dashboard: boolean;
  api_timeout_ms: number;
  theme_config: { primaryColor: string; darkMode: boolean };
}

const adapter = new LocalOverrideAdapter<AppFeatureFlags>('my-app-key');
adapter.setGate('new_onboarding_flow', true);
adapter.setConfig('api_timeout_ms', 500);
adapter.inspect();
```

## 📦 Package setup
Install dependencies and validate types:

```bash
npm install
npm run typecheck
```
