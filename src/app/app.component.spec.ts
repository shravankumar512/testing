import { UserService } from './user.service';
import { LoginService } from './login.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';

//mock login service..
class MockLoginService extends LoginService{
  login(data :any){
    return Promise.resolve(true);
  }
}


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        BrowserModule,
        FormsModule
      ],
      providers:[
        LoginService,
        UserService
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome');
  }));

  //testing ...
  it('should greet when user details are wrong ', inject([UserService] ,(service) => {
    let data = {username:'shsdf',password:'sdfsd'}
      return service.getGreetings(data).then((greeting)=>{
        expect(greeting).toEqual('login failure');
      });
  }));
  
  it('should greet when user details are right ', inject([UserService] ,(service) => {
    let data = {username:'shravan',password:'kumar'}
      return service.getGreetings(data).then((greeting)=>{
        expect(greeting).toContain('welcome!');
      });
  }));

});

describe('Testing with mock service',()=>{

  beforeEach(()=>{
     TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        BrowserModule,
        FormsModule
      ],
      providers:[
        { provide:LoginService, useClass:MockLoginService },
        UserService
      ],
    }).compileComponents();
  })

  //testing using mock services...
  it('should greet with mock service', inject([UserService],(service)=>{
    let data = {username:'shravan',password:'kumar'}
    return service.getGreetings(data).then((greeting)=>{
      expect(greeting).toContain('welcome!');
    })
  }));
  it('shouldn`t greet with mock service', inject([UserService],(service)=>{
    let data = {username:'ssdfsd',password:'sdfsdf'}
    return service.getGreetings(data).then((greeting)=>{
      expect(greeting).toContain('login failure');
    })
  }));

})

  