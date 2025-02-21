import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImgModule } from '@coreui/angular';

@Component({
  selector: 'app-master',
  imports: [ImgModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent {

}
