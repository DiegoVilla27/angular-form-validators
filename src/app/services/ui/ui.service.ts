import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class UiService {
  constructor() {}

  toastShow(
    title: string,
    icon: SweetAlertIcon,
    position: SweetAlertPosition,
    text: string = ""
  ): void {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon,
      title,
      text
    });
  }
}
