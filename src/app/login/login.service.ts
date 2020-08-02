import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class LoginService{
    loginChange = new Subject<string>();

    loginValue(value:string){
        this.loginChange.next(
            value
        )
    }
}
