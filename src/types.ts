export interface AppFeatureFlags {
  'new_onboarding_flow': boolean;
  'premium_dashboard': boolean;
  'api_timeout_ms': number;
  'theme_config': { primaryColor: string; darkMode: boolean };
}
