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
      let randomDelay = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000;

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
      '\n\t based on this client data give me subject and email in {"email": "body of the mail in html format", subject: "here subject"} json format' +
      '\n\t i want to automate so dont add any placeholder in mail body and give it in proper format and personalized mail' +
      '\n\t my name is Ramdev' +
      '\n\t im providing web development service';

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
