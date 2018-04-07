// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:63017/api/',

  authTenant: 'azureadb2ctestwubw.onmicrosoft.com',
  authClientId: '29c0ac9e-7745-4262-9dd6-6e621e6f3c8c',
  authSignUpSignInPolicy: 'B2C_1_SiUpIn',
  authB2cScopeRead: 'https://azureadb2ctestwubw.onmicrosoft.com/outlier/demo.read'
};
