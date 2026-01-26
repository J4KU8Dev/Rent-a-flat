import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact-service';

interface formData {
  name: string,
  email: string,
  number: number | null,
  subject: string,
  message: string,
  check: boolean,
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  public contactService = inject(ContactService);
  // changed this form (reactiveForm => signalForm)
  
  signalformModel = signal<formData>({
    name: '',
    email: '',
    number: null,
    subject: '',
    message: '',
    check: false,
  })

  contactForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    number: new FormControl<number | null>(null, [Validators.required]),
    subject: new FormControl<string>('', [Validators.required]),
    message: new FormControl<string>('', [Validators.required]),
    check: new FormControl<boolean>(false, Validators.requiredTrue),
  })
  onSubmit() {
    this.contactService.createMessage(this.contactForm.value).subscribe(
      response => console.log('Message sent successfully.', response),
      error => console.log('Error', error),
    )
    // console.log(this.contactForm.value);
    this.contactForm.reset();
  }
}
