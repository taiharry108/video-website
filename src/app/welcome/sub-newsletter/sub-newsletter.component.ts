import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/shared/ui/ui.service';

@Component({
  selector: 'app-sub-newsletter',
  templateUrl: './sub-newsletter.component.html',
  styleUrls: ['./sub-newsletter.component.scss'],
})
export class SubNewsletterComponent implements OnInit {
  subscribeForm: FormGroup;

  constructor(private uiService: UiService) {}

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

  onSubmit(): void {
    this.uiService.showSnackbar("Thanks for subscribing. A verification email is sent to you.", null, 3000);
  }
}
