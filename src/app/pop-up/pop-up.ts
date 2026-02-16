import { Component, inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-pop-up',
  imports: [],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css',
})
export class PopUp {
  toastr = inject(ToastrService);

  showSuccess(content: string, title: string) {
    this.toastr.success(content, title);
  }
  
  showError(content: string, title: string) {
    this.toastr.error(content, title)
  }

  showWarning(content: string, title: string) {
    this.toastr.warning(content, title)
  }
}
