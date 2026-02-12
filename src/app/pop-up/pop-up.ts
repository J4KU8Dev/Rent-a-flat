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

  showSuccess(title: string, content: string) {
    this.toastr.success(content, title);
  }
  
  showError(title: string, content: string) {
    this.toastr.error(title, content)
  }

  showWarning(title: string, content: string) {
    this.toastr.warning(title, content)
  }
}
