import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class SweetAlert {
    AlertSuccess= (strtitle: string, strtext: string) => {
      Swal.fire({
        icon: 'success',
        title: strtitle,
        text: strtext,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#008f49',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }          
      });
    };

    AlertWarning= (strtitle: string, strtext: string) => {
        Swal.fire({
          icon: 'warning',
          title: strtitle,
          html: strtext,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#008f49',
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }          
        });
    };

    AlertError= (strtitle: string, strtext: string) => {
      Swal.fire({
        icon: 'error',
        title: strtitle,
        text: strtext,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }          
      });
    };

    AlertQuestion= (strtitle: string, strtext: string) => {
      return Swal.fire({
        title: strtitle,
        html: strtext,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        confirmButtonColor: '#008f49',
        cancelButtonText: 'No',
        preConfirm: (isConfirm) => {
          return isConfirm; // Si el usuario dió click en 'sí', se retornará true.
      }
      }).then((result) => {
        console.log(result)
        return result; // En caso de haberse clickeado cancel, retornará 'undefined' que es lo mismo que false en cuanto a interpretación booleana.
      });
    }
}    
