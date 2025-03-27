import { config } from '../config/configuration';
import Sdk from 'casdoor-js-sdk';

export const CasdoorSDK = new Sdk({
  ...config.casdoor
});
