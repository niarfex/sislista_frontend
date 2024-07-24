import Swal, { SweetAlertResult } from "sweetalert2";

export class SwalUtil {
    // constructor(parameters) { 
    // }
    public static error(title:string,msg: string ) {
      return  Swal.fire({title: title, text:  msg, icon: 'error', heightAuto: false });
    }

    public static success(title:string,msg: string ) {
        return  Swal.fire({title: title, text:  msg, icon: 'success', heightAuto: false });
    }

    public static warning(title:string,msg: string, isCondition:boolean=false ) {
        if (!isCondition){
            return  Swal.fire({title: title, text:  msg, icon: 'warning', heightAuto: false });
        }else{
            return  Swal.fire({title: title, 
                               text:  msg, 
                               icon: 'warning', 
                               heightAuto: false,
                               showCancelButton: true,
                               confirmButtonText: 'continuar',
                               cancelButtonText:'Cancelar'
                            });
        }
    }


    public static loading(title:string,msg: string, fn:any, buttonText:string='Cancelar'){
        const swalLoading = Swal.mixin({
            customClass: {
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

       return swalLoading.fire({title: title, text: msg, 
           heightAuto: false ,
           allowEscapeKey: false,
           allowOutsideClick: false, 
           showCancelButton:false,
           cancelButtonText: buttonText,
           didOpen: () => {
            Swal.showLoading();
           } 
        }).then((result:any)=>{
                if(result.dismiss === Swal.DismissReason.cancel) {  
                    fn();                     
                } 
        });
    }
}