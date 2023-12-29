import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    "react-native-google-mobile-ads": {
        "android_app_id": process.env.SLEEPWELL_app_id,
        "ios_app_id": process.env.SLEEPWELL_app_id
    }
});