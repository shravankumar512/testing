import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    
    constructor(private loginservice:LoginService) { }

    getGreetings(data:any){
        return this.loginservice.login(data)
            .then((success)=>{
                return success ? 'welcome! '+data.username : 'login failure';
            });
    }
}