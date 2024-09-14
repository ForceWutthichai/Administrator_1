import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgZorroModule } from '../../../shared/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-genadmin',
  standalone: true,
  imports: [NgZorroModule, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './genadmin.component.html',
  styleUrls: ['./genadmin.component.scss']
})
export class GenadminComponent {
  titleName: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  id: string = '';
  successMessage: string = '';
  titleNameError: string = '';
  firstNameError: string = '';
  lastNameError: string = '';
  usernameError: string = '';
  passwordError: string = '';

  constructor(private http: HttpClient) { }

  // ตรวจสอบเงื่อนไข validation
  validateForm(): boolean {
    const usernamePattern = /^[A-Za-z0-9]{6,}$/;
    const passwordPattern = /^[A-Za-z0-9]{4,15}$/;
    const thaiPattern = /^[ก-๙]+$/;

    let isValid = true;

    if (!this.titleName) {
      this.titleNameError = 'กรุณาเลือกคำนามหน้า';
      isValid = false;
    } else {
      this.titleNameError = '';
    }

    if (!this.firstName) {
      this.firstNameError = 'กรุณากรอกชื่อ';
      isValid = false;
    } else if (!thaiPattern.test(this.firstName)) {
      this.firstNameError = 'ชื่อสามารถเป็นภาษาไทยเท่านั้น';
      isValid = false;
    } else {
      this.firstNameError = '';
    }

    if (!this.lastName) {
      this.lastNameError = 'กรุณากรอกนามสกุล';
      isValid = false;
    } else if (!thaiPattern.test(this.lastName)) {
      this.lastNameError = 'นามสกุลสามารถเป็นภาษาไทยเท่านั้น';
      isValid = false;
    } else {
      this.lastNameError = '';
    }

    if (!usernamePattern.test(this.username)) {
      this.usernameError = 'ชื่อผู้ใช้ต้องเป็นภาษาอังกฤษหรือตัวเลขและมีอย่างน้อย 6 ตัวอักษร';
      isValid = false;
    } else {
      this.usernameError = '';
    }

    if (!passwordPattern.test(this.id)) {
      this.passwordError = 'รหัสผ่านต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลข ความยาวระหว่าง 4 ถึง 15 ตัวอักษร';
      isValid = false;
    } else {
      this.passwordError = '';
    }

    return isValid;
  }

  onGenerate() {
    if (!this.validateForm()) {
      return;
    }

    const adminData = {
      title_name: this.titleName,
      first_name: this.firstName,
      last_name: this.lastName,
      username: this.username,
      password: this.id
    };

    this.http.post('http://localhost:3000/admin/create', adminData).subscribe({
      next: (response) => {
        console.log('Admin created successfully:', response);
        this.successMessage = 'สร้างชื่อผู้ใช้และรหัสผ่านสำเร็จ';
        this.titleName = '';
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.id = '';
      },
      error: (error) => {
        if (error.status === 400) {
          this.usernameError = 'มีชื่อผู้ใช้อยู่แล้ว กรุณากรอกชื่อผู้ใช้อื่น';
        } else {
          console.error('เกิดข้อผิดพลาดในการสร้าง admin:', error);
        }
      }
    });
  }
}
