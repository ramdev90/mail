import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  intervalId: any;
  onSend() {
    const startInterval = () => {
      let randomDelay =
        Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000; //max = 180000 (3 minutes in milliseconds). //min = 60000 (1 minute in milliseconds).

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
      .get('http://localhost:3001/api/mail/get-email')
      .subscribe((res: any) => {
        console.log(res);

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

        this.generateMail(JSON.stringify(document), res?.['Public email']);
      });
  }

  private generateMail(prompt: string, to: string) {
    // `above is client leads data that I want to use for sending a professional email to the client. Based on this data, please generate an email in the following format:

    // Provide the subject line and the email body in HTML format, without any placeholders.
    // The email should be professional, concise, and in a simple, human-like tone, avoiding technical jargon or unnecessary complexity.
    // The email body should be between 80 to 120 words, and formatted properly with appropriate paragraphs (no <br> tags).
    // Do not include any email addresses, websites, or contact details in the email body.
    // The email should be sent from Ramdev, who provides web development services.
    // Please provide the response in the following JSON format:

    // json
    // {
    //   "email": "body of the email in HTML format",
    //   "subject": "subject of the email"
    // }
    // Make sure the email sounds professional and is easy to read, with a clear and polite tone`

    const generatedPromt =
      `"${prompt}"` +
      '\n\t above is client lead data i want to send mail to hunt the client so based on this client data give me subject and personalized email in {"email": "body of the mail in html format", subject: "here subject"} json format' +
      '\n\t dont add any placeholder in mail body and give it in proper format no email no website in email body' +
      '\n\t make it proffestional email and medium size mail and dont add br tag in email html body' +
      '\n\t make it in simple language and like human written tone and proffestional' +
      '\n\t make email in about 80 to 120 words and dont add my contact info in email body not website not email and not phone' +
      '\n\t my name is Ramdev im providing web development service';
    this.http
      .post('http://localhost:3001/api/generateEmail', {
        prompt: generatedPromt,
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
      .post('http://localhost:3001/api/mail/send-email', {
        to: to,
        subject: subject,
        message: message,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
