import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-newsletter',
  templateUrl: './sub-newsletter.component.html',
  styleUrls: ['./sub-newsletter.component.scss'],
})
export class SubNewsletterComponent implements OnInit {
  subscribeForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.subscribeForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      agree: new FormControl('', {
        validators: [Validators.requiredTrue],
      }),
    });
  }
}
