import { Injectable } from '@angular/core';



@Injectable()
export class LoginService {

    login(data:any){
        return new Promise((resolve,reject) =>{
            if(data.username == "shravan" && data.password == "kumar"){
                resolve(true);
            }else{
                resolve(false);
            }
        })
    }
    
}