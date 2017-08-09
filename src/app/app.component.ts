import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  form: any;
  title:string = "app";
  success :string;
   
  constructor(private _userservice:UserService,private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'username' : [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    })
  }

  submitForm(data){
    this._userservice.getGreetings(data).then((res)=>{
      this.success = res;
    })
  }

}
