import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators,FormArray} from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import {PasswordValidator} from './shared/password.validator';
import {RegistrationService} from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm : FormGroup;

  constructor(private fb:FormBuilder,private _registrationService:RegistrationService){
  }

  ngOnInit()
  {
    this.registrationForm=this.fb.group({
      userName : ['',[Validators.required,Validators.minLength(3),forbiddenNameValidator(/admin/)]],
      email : [''],
      subscribe : [false],
      password : [''],
      confirmPassword : [''],
      address : this.fb.group({
         city : ['Navsari'],
         state : ['Gujarat'],
         postalCode : ['396450']
 
      }),
      alternateEmails : this.fb.array([])
   },{validator :PasswordValidator});

   this.registrationForm.get('subscribe').valueChanges
     .subscribe(checkedValue => {
           const email=this.registrationForm.get('email');
           if(checkedValue)
           {
               email.setValidators(Validators.required);
           }
           else
           {
             email.clearValidators();
           }
           email.updateValueAndValidity();
     });
     {

     }
  }

  title = 'reactive-forms';

  

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails()
  {

    return this.registrationForm.get('alternateEmails') as FormArray;
  }

   addAlternateEmail()
   {
     this.alternateEmails.push(this.fb.control('')); 
   }

   onSubmit()
   {
         console.log(this.registrationForm.value);
         this._registrationService.register(this.registrationForm.value)
          .subscribe(
            Response => console.log('Success!', Response),
             error  =>   console.error('Error!' ,error)
            
          );
   }
  // registrationForm =new FormGroup({
  //   userName : new FormControl('Sumit'),
  //   password : new FormControl(''),
  //   confirmPassword : new FormControl(''),
  //   address: new FormGroup({
  //        city : new FormControl(''),
  //        state : new FormControl(''),
  //        postalCode :new FormControl('')
  //   })
  // });

  loadApiData()
  {
    this.registrationForm.patchValue({
         userName : 'Lucky',
         password : 'test',
         confirmPassword : 'test123',

         //without address field use patchvalue()
        //  address : {
        //    city :'surat',
        //    state : 'gujarat',
        //    postalCode : '396450'
        //  }
    });
  }
  
}
