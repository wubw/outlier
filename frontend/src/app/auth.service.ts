import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

declare var bootbox: any;
declare var Msal: any;

@Injectable()
export class AuthService {
    private tenantConfig = {
        tenant: 'azureadb2ctestwubw.onmicrosoft.com',
        clientID: '29c0ac9e-7745-4262-9dd6-6e621e6f3c8c',
        signUpSignInPolicy: 'B2C_1_SiUpIn',
        b2cScopes: ['https://azureadb2ctestwubw.onmicrosoft.com/hello/demo.read']
    };

    // Configure the authority for Azure AD B2C
    private authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signUpSignInPolicy;

    public get userid() {
        return 'wubw';
    } 

    get access_token(): string {
        return sessionStorage.getItem('access_token');
    }

    set access_token(value: string) {
        sessionStorage.setItem('access_token', value);
    }

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    private clientApplicationImpl;
    private get clientApplication() {
        if (!this.clientApplicationImpl) {
            this.clientApplicationImpl = new Msal.UserAgentApplication(
                this.tenantConfig.clientID, this.authority,
                (errorDesc, token, error, tokenType) => { // Called after loginRedirect or acquireTokenPopup
                }
            );
        }
        return this.clientApplicationImpl;
    } 


    constructor(private jwtHelper: JwtHelper) {
    }

    public login() {
        let promise = new Promise((resolve, reject) => {
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes)
            .then(idToken => {
                this.clientApplication.acquireTokenSilent(this.tenantConfig.b2cScopes)
                    .then(accessToken => {
                        console.log('acquireTokenSilent');
                        this.access_token = accessToken;
                        resolve();
                        },
                        error => {
                            this.clientApplication.acquireTokenPopup(this.tenantConfig.b2cScopes)
                            .then(accessToken => {
                                console.log('acquireTokenPopup');
                                this.access_token = accessToken;
                                resolve();
                            },
                            err => {
                                bootbox.alert('Error acquiring the popup:\n' + err);
                                reject();
                            });
                        });
            },
            error => {
                bootbox.alert('Error during login:\n' + error);
                reject();
            });
        });
        return promise;
    }

    logout() {
        this.clientApplication.logout();
        this.clientApplicationImpl = null;
    };

    isOnline(): boolean {
        return this.clientApplication.getUser() != null;
    };

    isAuthenticated(): boolean {
        // Check whether the token is expired and return true or false
        if (!this.access_token) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(this.access_token);
      }

    username() {
        return this.clientApplication.getUser().name;
    }
}