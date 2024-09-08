import { Component, inject } from '@angular/core';
import { NgZorroModule } from '../../../shared/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [NgZorroModule,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {
  private router = inject(Router);

  navigateToAdd_admin() {
    this.router.navigate(['layout/addAdmin']);
  }

  navigateToAdmin_All() {
    this.router.navigate(['layout/allAdmin']);
  }
  navigateToUser_all() {
    this.router.navigate(['layout/allUser']);
  }
}
