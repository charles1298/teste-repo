import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.umamusume.proto',
  appName: 'Umamusume Pretty Derby',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
