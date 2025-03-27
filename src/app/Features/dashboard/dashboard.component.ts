import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import {  ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  imports: [ImageModule,CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone:true,
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent {

}
