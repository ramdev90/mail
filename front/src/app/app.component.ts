import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { MailComponent } from './mail/mail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadComponent, MailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front';
  // index = 0;

  // list = [
  //   {
  //     name: 'Dev',
  //     email: 'ramdevrathod90@gmail.com',
  //   },
  //   {
  //     name: 'Sossarita',
  //     email: 'sossarita0@gmail.com',
  //   },
  //   {
  //     name: 'Shoaib Azeem (SAM)',
  //     email: 'shoaibazeem2003@gmail.com',
  //   },
  //   {
  //     name: 'Info Taskrabbits',
  //     email: 'info.taskrabbits@gmail.com',
  //   },
  //   {
  //     name: 'Waseem Abbas',
  //     email: 'waseem.abbas@gmail.com',
  //   },
  //   {
  //     name: 'Eternus Tech Team',
  //     email: 'eternustechteam@gmail.com',
  //   },
  //   {
  //     name: 'Ridzii',
  //     email: 'ridzii1521@gmail.com',
  //   },
  //   {
  //     name: 'Belaid Mariem',
  //     email: 'belaidmariem22@gmail.com',
  //   },
  //   {
  //     name: 'Marketing Consultant',
  //     email: 'marketing.consultant@gmail.com',
  //   },
  //   {
  //     name: 'Ismail Munyentwari',
  //     email: 'ismailmunyentwari9@gmail.com',
  //   },
  //   {
  //     name: 'Mitetaskov',
  //     email: 'mitetaskov19@gmail.com',
  //   },
  //   {
  //     name: 'Wasif Wwez',
  //     email: 'wasif.wwez@gmail.com',
  //   },
  //   {
  //     name: 'Ankit Kumar Patel',
  //     email: 'patelankit1216@gmail.com',
  //   },
  //   {
  //     name: 'Jean Ahli',
  //     email: 'jeanahli01@gmail.com',
  //   },
  //   {
  //     name: 'Gilberto Bitt',
  //     email: 'gilbertobitt@outlook.com',
  //   },
  //   {
  //     name: 'Stefhanie Plet',
  //     email: 'pletstefhanie@gmail.com',
  //   },
  //   {
  //     name: 'Youaredev123',
  //     email: 'youaredev123@gmail.com',
  //   },
  //   {
  //     name: 'Andres Maes',
  //     email: 'maes_andres@hotmail.com',
  //   },
  //   {
  //     name: 'Baonguyen12b32000',
  //     email: 'baonguyen12b32000@yahoo.com',
  //   },
  //   {
  //     name: 'Ryzenlight',
  //     email: 'ryzenlight8@gmail.com',
  //   },
  //   {
  //     name: 'Vickyguaipo',
  //     email: 'Vickyguaipo@gmail.com',
  //   },
  //   {
  //     name: 'Syed Arslan',
  //     email: 'syedarslan1309@gmail.com',
  //   },
  //   {
  //     name: 'Alhamidosama',
  //     email: 'alhamidosama@gmail.com',
  //   },
  //   {
  //     name: 'Dev Jia Vu',
  //     email: 'dev.jia.vu@gmail.com',
  //   },
  //   {
  //     name: 'Ilpyo Lee',
  //     email: 'ilpyolee@gmail.com',
  //   },
  //   {
  //     name: 'Fadi Saati',
  //     email: 'fadi.saati.94@gmail.com',
  //   },
  //   {
  //     name: 'Daiana Miceli',
  //     email: 'daiana.miceli@gmail.com',
  //   },
  //   {
  //     name: 'Jerry Owusu',
  //     email: 'jerryowusu6133@gmail.com',
  //   },
  //   {
  //     name: 'Khalid Nasser',
  //     email: 'khalidnasser86@gmail.com',
  //   },
  //   {
  //     name: 'ugchaileyogden',
  //     email: 'ugchaileyogden@gmail.com',
  //   },
  //   {
  //     name: 'pratapvashi',
  //     email: 'pratapvashi@gmail.com',
  //   },
  //   {
  //     name: 'susa.zuzanna.filipek',
  //     email: 'susa.zuzanna.filipek@gmail.com',
  //   },
  //   {
  //     name: 'jilimajohnabednego',
  //     email: 'jilimajohnabednego@gmail.com',
  //   },
  //   {
  //     name: 'jain.ashish.pro',
  //     email: 'jain.ashish.pro@gmail.com',
  //   },
  //   {
  //     name: 'kelvinwilson.co',
  //     email: 'personal.kelvinwilson@gmail.com',
  //   },
  //   {
  //     name: 'henrybyhee',
  //     email: 'henrybyhee@gmail.com',
  //   },
  //   {
  //     name: 'Anthony Deese',
  //     email: 'Anthony.Deese@gmail.com',
  //   },
  //   {
  //     name: 'ahmadsiddiqi.isec',
  //     email: 'Ahmadsiddiqi.isec@gmail.com',
  //   },
  //   {
  //     name: 'Sylvia Nambela',
  //     email: 'sylvianambela73@gmail.com',
  //   },
  //   {
  //     name: 'Mavis Campbell',
  //     email: 'campbellimmlaw@gmail.com',
  //   },
  //   {
  //     name: 'Youssef Chawlidy',
  //     email: 'chawlidyoussef@gmail.com',
  //   },
  //   {
  //     name: 'Djordje Marijanski',
  //     email: 'djordje84marijanski@gmail.com',
  //   },
  //   {
  //     name: 'Rafael Baig',
  //     email: 'rafaelbaig1@gmail.com',
  //   },
  //   {
  //     name: 'Cathy Ranampiharison',
  //     email: 'cathy.ranampiharison@gmail.com',
  //   },
  //   {
  //     name: 'Salahadin Juhar Leo',
  //     email: 'salahadinjuharleo@gmail.com',
  //   },
  //   {
  //     name: 'Heena Acharya',
  //     email: 'heeanaacharya@outlook.com',
  //   },
  // ];

  list = [
    {
      name: 'Dev',
      email: 'ramdevrathod90@gmail.com',
    },
    {
      name: 'Robert Half Recruiters & Employment Agency',
      email: 'hrsolutions@roberthalf.com',
    },
    {
      name: 'Inspire Hr',
      email: 'careers@inspirehumanresources.com',
    },
    {
      name: 'JER HR Group',
      email: 'info@jerhrgroup.com',
    },
    {
      name: 'HR Search Partners',
      email: 'hrsearchpartners.com',
    },
    {
      name: 'be the change HR - HR Consulting and Outsourcing Firm',
      email: 'info@bethechangehr.com',
    },
    {
      name: 'Arelis-HR',
      email: 'arelis@arelishr.com',
    },
    {
      name: 'LevelUP HCS',
      email: 'information@leveluphcs.com',
    },
    {
      name: 'Fourvision Hr Plus',
      email: 'info@fourvision.com',
    },
    {
      name: 'H&R Block',
      email: 'hrblockanswers@hrblock.com',
    },
    {
      name: 'Atrium',
      email: 'HR@atriumglobal.com',
    },
    {
      name: 'Pace University HR',
      email: 'gradnyc@pace.edu',
    },
    {
      name: 'Namely',
      email: 'service@namely.com',
    },
    {
      name: 'HR Media & Co.',
      email: 'info@hrmediaandco.com',
    },
    {
      name: 'Onpoint HR Solutions',
      email: 'info@onpointhr.com',
    },
    {
      name: 'HRS USA',
      email: 'customerfeedback@hrs.com',
    },
    {
      name: 'Human Resources For Me',
      email: 'customerservice@humanresourcesforme.com',
    },
    {
      name: 'Hudson Human Resources',
      email: 'omare@hudsonhumanresources.com',
    },
    {
      name: 'Triton Benefits And Hr Solutions',
      email: 'scott.perroncino@tritonhro.com',
    },
    {
      name: 'Peale Piper: HR Consulting for Nonprofits and Small Businesses',
      email: 'hello@pealepiper.com',
    },
    {
      name: 'Kona HR',
      email: 'info@konahr.com',
    },
    {
      name: 'Dynamic Hr Solutions',
      email: 'ElliotWeinstein@dynamichrs.com',
    },
    {
      name: 'Cognos Hr',
      email: 'info@cognoshr.com',
    },
    {
      name: 'Midwesthr, LLC',
      email: 'info@midwesthr.com',
    },
    {
      name: 'DHR International',
      email: 'info@dhrglobal.com',
    },
    {
      name: 'Alliance Hr',
      email: 'info@alliancehr.com',
    },
    {
      name: 'H R Search Firm',
      email: 'info@hrsearchfirm.com',
    },
    {
      name: 'City Staffing',
      email: 'info@citystaffing.com',
    },
    {
      name: 'Marketstaff, Inc.',
      email: 'info@marketstaff.com',
    },
    {
      name: 'AltaStaff Staffing Agency',
      email: 'jane@altastaff.com',
    },
    {
      name: 'The Judge Group',
      email: 'customerservice@judge.com',
    },
    {
      name: 'Smarthire Inc',
      email: 'info@smarthireinc.com',
    },
    {
      name: 'Insperity',
      email: 'media@insperity.com',
    },
    {
      name: 'The University of Chicago Human Resources',
      email: 'benefits@uchicago.edu',
    },
    {
      name: 'LaSalle Network',
      email: 'jay@infinedi.com',
    },
    {
      name: 'Rtr Management And Consulting Services, LLC',
      email: 'info@rtrconsults.com',
    },
    {
      name: 'Aspen HR',
      email: 'sales@aspenhr.com',
    },
    {
      name: 'HR Hints',
      email: 'hello@hrhints.io',
    },
    {
      name: 'Scion Staffing',
      email: 'jane@scionstaffing.com',
    },
    {
      name: 'Element Staffing',
      email: 'info@element-staffing.com',
    },
    {
      name: 'Manhattan Resources',
      email: 'info@manhattanresources.com',
    },
    {
      name: 'Hiring Source',
      email: 'hr@thehiringsource.com',
    },
    {
      name: 'Levanzo Clinical Staffing',
      email: 'info@levanzoclinicalstaffing.com',
    },
    {
      name: 'HR Innovex Consulting Partners',
      email: 'info@hrinnovex.com',
    },
    {
      name: 'Express Employment Professionals',
      email: 'jobs.downtownhoustontx@expresspros.com',
    },
    {
      name: 'Labor Finders Houston',
      email: 'info@laborfinders.com',
    },
    {
      name: 'HR Integration Demo',
      email: 'info@hrintegration.com',
    },
    {
      name: 'Select Search Consultants LP',
      email: 'jobs@ssclp.com',
    },
    {
      name: 'Vivid HR & Staffing',
      email: 'tarun@elsnerhr.com',
    },
    {
      name: 'Precision HR Solutions',
      email: 'sandrade@precisionhr.net',
    },
    {
      name: 'Journey Payroll & Hr - Phx',
      email: 'admin.co@journeypayroll.com',
    },
    {
      name: 'United Hr',
      email: 'hello@unitedhr.com',
    },
    {
      name: 'Apexx Solutions',
      email: 'info@apexxsolutions.com',
    },
    {
      name: 'Pinnacle Health Staffing',
      email: 'info@pinnaclehealthstaff.com',
    },
    {
      name: 'Sonoran Personnel Group',
      email: 'team@sonoranpersonnelgroup.com',
    },
    {
      name: 'LaborMax Staffing - Phoenix',
      email: 'safety@labormaxstaffing.com',
    },
    {
      name: 'TriNet USA, Inc.',
      email: 'Connect360@TriNet.com',
    },
    {
      name: 'Kutsko Consulting',
      email: 'hello@kutskoconsulting.com',
    },
    {
      name: 'US Tech Solutions',
      email: 'privacy@ustechsolutions.com',
    },
    {
      name: 'Greenhouse Software Hq',
      email: 'privacy@greenhouse.io',
    },
    {
      name: 'Global Hr Solutions Llc',
      email: 'anga@globalhronline.com',
    },
    {
      name: 'Hr Guru, Inc.',
      email: 'contactus@hrguru.com.sg',
    },
    {
      name: 'Jericho HR Group',
      email: 'jobs@jerichohr.com',
    },
    {
      name: 'HumanKind HR',
      email: 'kate.pohl@humankindhr.com',
    },
    {
      name: 'Aspen HR',
      email: 'support@aspenhr.com',
    },
    {
      name: 'Hr&a Advisors',
      email: 'info@hraadvisors.com',
    },
    {
      name: 'Tethered HR',
      email: 'info@tetheredhr.com',
    },
    {
      name: 'Hometown HR Solutions',
      email: 'info@hometownhrsolutions.com',
    },
  ];
}
