import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.css',
})
export class MailComponent {
  selectedMailType = 'static';
  generatedMail: null | { subject: any; email: any } = null;
  safeHtmlContent!: SafeHtml;
  timePending = ''

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  intervalId: any;
  onSend() {
    const startInterval = () => {
      let randomDelay =
        Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000; //max = 180000 (3 minutes in milliseconds). //min = 60000 (1 minute in milliseconds).

      let minutes = Math.floor(randomDelay / 60000); // Divide by 60000 to get minutes
      let seconds = Math.floor((randomDelay % 60000) / 1000); // Get the remaining seconds

      this.timePending = minutes.toString() + ': ' + seconds.toString();

      this.getMail();
      if (true) {
        // TODO
        this.intervalId = setTimeout(startInterval, randomDelay);
      } else {
        console.log('Interval cleared');
      }
    };

    startInterval();
  }

  private getMail() {
    this.http
      .get(environment.API_BASEURL + '/api/mail/get-email')
      .subscribe((res: any) => {
        let document = JSON.parse(JSON.stringify(res));
        if (document) {
          if (document['Phone number']) {
            delete document['Phone number'];
          }

          if (document['Phone country code']) {
            delete document['Phone country code'];
          }

          if (document['Public email']) {
            delete document['Public email'];
          }
        }

        if (this.selectedMailType === 'static') {
          // TODO
          document = res?.name;
        }

        this.generateMail(
          JSON.stringify(document),
          res?.['Public email'] || res?.email
        );
      });
  }

  private generateMail(prompt: string, to: string) {
    let generatedPromt =
      `"${prompt}"` +
      '\n\t above is client lead data i want to send mail to hunt the client so based on this client data give me subject and personalized email in {"email": "body of the mail in html format", subject: "here subject"} json format' +
      '\n\t dont add any placeholder in mail body and give it in proper format no email no website in email body' +
      '\n\t make it proffestional email and medium size mail and dont add br tag in email html body' +
      '\n\t make it in simple language and like human written tone and proffestional' +
      '\n\t make email in about 80 to 120 words and dont add my contact info in email body not website not email and not phone' +
      '\n\t my name is Ramdev im providing web development service';

    // TODO
    if (this.selectedMailType === 'static') {
      generatedPromt = prompt;
    }
    this.http
      .post(environment.API_BASEURL + '/api/generateEmail', {
        prompt: generatedPromt,
        selectedMailType: this.selectedMailType,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.sendMail(to, res?.subject, res?.email);
        this.generatedMail = { subject: res?.subject, email: res?.email };
        this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(
          res?.email
        );
      });
  }

  private sendMail(to: string, subject: string, message: string) {
    console.log('running email', to);

    this.http
      .post(environment.API_BASEURL + '/api/mail/send-email', {
        to: to,
        subject: subject,
        message: message,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
