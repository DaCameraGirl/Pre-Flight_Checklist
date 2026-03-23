# 🛠 Statsig + OTel DevTools
**Enterprise-grade feature flag overrides and distributed tracing continuity.**

## ⚡ Quick Cheatsheet
| Action | Command in Console |
| :--- | :--- |
| **Check Active Overrides** | `adapter.inspect()` |
| **Enable a Feature** | `adapter.setGate('new_onboarding_flow', true)` |
| **Clear Everything** | `adapter.clear()` |

## 🏗 Architecture
1. **Parent-Based Sampling**: Ensures trace continuity across service boundaries.
2. **Local Overrides**: Persisted in localStorage with environment-specific namespacing.

## 🚀 Usage
\`\`\`typescript
import { LocalOverrideAdapter } from './src/adapter';
const adapter = new LocalOverrideAdapter('my-app-key');
adapter.inspect();
\`\`\`
"@ | Out-File -FilePath README.md -Encoding utf8


