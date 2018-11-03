import { AuthServiceConfig, FacebookLoginProvider } from 'angular-6-social-login-v2';
import { environment } from '../../environments/environment';

export function getAuthServiceConfigs() 
{
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookAppId)
    }
  ]);
   return config;
}