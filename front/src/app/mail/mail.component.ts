import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.css',
})
export class MailComponent {
  constructor(private http: HttpClient) {}

  intervalId: any;
  onSend() {
    // this.index = 0; // Reset index each time the function is triggered

    const startInterval = () => {
      let randomDelay = Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000; //max = 180000 (3 minutes in milliseconds). //min = 60000 (1 minute in milliseconds).

      this.getMail();
      // this.sendMail(this.list[this.index]?.email, this.list[this.index]?.name);
      // this.index++;

      // if (this.index < this.list.length) {
      if (true) {
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
        this.generateMail(JSON.stringify(res), res?.['Public email']);
      });
  }

  private generateMail(prompt: string, to: string) {
    const generatedPromt =
      `"${prompt}"` +
      '\n\t above is client data i want to send mail to client so based on this client data give me subject and personalized email in {"email": "body of the mail in html format", subject: "here subject"} json format' +
      '\n\t dont add any placeholder in mail body and give it in proper format no email no website in email body' +
      '\n\t make it proffestional email and medium size mail and dont add br tag in email html body' +
      '\n\t make it in simple language and like human written and proffestional' +
      '\n\t make email in about 80 to 120 words and dont add my contact info in email body' +
      '\n\t my name is Ramdev im providing web development service';
    this.http
      .post('http://localhost:3001/api/generateEmail', {
        prompt: generatedPromt,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.sendMail(to, res?.subject, res?.email);
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
