import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

declare var bootbox: any;
declare var Msal: any;

@Injectable()
export class AuthService {
    access_token: string;

    private tenantConfig = {
        tenant: 'azureadb2ctestwubw.onmicrosoft.com',
        clientID: '29c0ac9e-7745-4262-9dd6-6e621e6f3c8c',
        signUpSignInPolicy: 'B2C_1_SiUpIn',
        b2cScopes: ['https://azureadb2ctestwubw.onmicrosoft.com/hello/demo.read']
    };

    // Configure the authority for Azure AD B2C
    private authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signUpSignInPolicy;

    public userid = 'wubw';

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    private clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority,
        (errorDesc, token, error, tokenType) => { // Called after loginRedirect or acquireTokenPopup
        }
    );

    constructor(private jwtHelper: JwtHelper) {
    }

    public login(): void {
        const _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes)
            .then(idToken => {
                _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes)
                    .then(accessToken => {
                        console.log('acquireTokenSilent');
                        _this.access_token = accessToken;
                        },
                        error => {
                        _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes)
                            .then(accessToken => {
                                console.log('acquireTokenPopup');
                                _this.access_token = accessToken;
                            },
                            err => {
                                bootbox.alert('Error acquiring the popup:\n' + err);
                            });
                        });
            },
            error => {
                bootbox.alert('Error during login:\n' + error);
            });
    }

    logout(): void {
        this.clientApplication.logout();
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