import { Injectable } from '@angular/core';

declare var bootbox: any;
declare var Msal:any;

@Injectable()
export class AuthService {
    
    access_token: string;

    tenantConfig = {
        tenant: "azureadb2ctestwubw.onmicrosoft.com",
        clientID: '29c0ac9e-7745-4262-9dd6-6e621e6f3c8c',
        signUpSignInPolicy: "B2C_1_SiUpIn",
        b2cScopes: ["https://azureadb2ctestwubw.onmicrosoft.com/hello/demo.read"]
    };
    
    // Configure the authority for Azure AD B2C

    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority, 
        function (errorDesc: any, token: any, error: any, tokenType: any) {
            // Called after loginRedirect or acquireTokenPopup
        }
    );

    public login(): void {
       var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                function (accessToken: any) {
                    _this.access_token = accessToken;
                }, function (error: any) {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        function (accessToken: any) {
                            _this.access_token = accessToken;
                        }, function (error: any) {
                            bootbox.alert("Error acquiring the popup:\n" + error);
                        });
                })
        }, function (error: any) {
            bootbox.alert("Error during login:\n" + error);
        });
    }
    
    logout(): void {
        this.clientApplication.logout();
    };

    isOnline(): boolean {
        return this.clientApplication.getUser() != null; 
    };

    username() {
        return this.clientApplication.getUser().name;
    }

    public userid: string = 'wubw';
}