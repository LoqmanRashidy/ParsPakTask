import { InjectionToken } from '@angular/core';
import { Helpers } from '../../../shared/helper/helpers';

export let APP_CONFIG = new InjectionToken<string>('app.config');

export interface IAppConfig {
  apiEndpoint: string;
  apiSettingsPath: string;
  // apiMapKeyPath: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: Helpers._apiurl,
  apiSettingsPath: 'ApiSettings',
  // apiMapKeyPath: 'MapKey'
};
