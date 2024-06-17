import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
//import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appBaseUrl: string= "..";//AppConsts.appBaseUrl;
  loginError:string="";
  loginForm=this.formBuilder.group({
    username:['',[Validators.required]],
    password: ['',Validators.required],
  })
  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private router:Router
    , private loginService: LoginService,private toastr: ToastrService) { }

  ngOnInit(): void {
    const currentUser = this.loginService.getCurrentUserValue;
    //console.log("entra_0");
  if (currentUser) {
    
    this.router.navigate(['./app/web/inicio']);
  }else{
    this.route.queryParamMap.subscribe((p:any) => {
      if(p['params'].sesion=='logout'){
        this.toastr.success('Ha cerrado sesión exitosamente','',{
        });  
      }
    });    
  }
    

  }

  get username(){
    return this.loginForm.controls['username'];
  }

  get password()
  {
    return this.loginForm.controls['password'];
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";

      //this.router.navigateByUrl('/admin/inicio');
      //this.router.navigate(['app','admin','inicio'], { });

      /* Esta sección es para validar el login */
      //this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        this.loginService.login(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value).subscribe({
        next: (userData) => {          
        },
        error: (errorData) => {         
          console.log(errorData);
          //this.loginError=errorData.error.status.error.messages[0];     
        },
        complete: () => {  
          console.log("ruteo_login");
          this.router.navigate(['app','web','inicio'], { });
          //this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      });

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

}