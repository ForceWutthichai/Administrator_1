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
  username: string = '';
  id: string = '';
  successMessage: string = '';
  usernameError: string = '';  // เพิ่มตัวแปรสำหรับเก็บข้อความแสดงข้อผิดพลาดของ username
  passwordError: string = '';  // เพิ่มตัวแปรสำหรับเก็บข้อความแสดงข้อผิดพลาดของ password

  constructor(private http: HttpClient) { }

  // ตรวจสอบเงื่อนไข validation
  validateForm(): boolean {
    const usernamePattern = /^[A-Za-z0-9]{6,}$/; // ชื่อผู้ใช้ต้องเป็นภาษาอังกฤษหรือตัวเลขและมีอย่างน้อย 6 ตัวอักษร
    const passwordPattern = /^[A-Za-z0-9]{4,15}$/; // รหัสผ่านต้องเป็นภาษาอังกฤษหรือตัวเลข ความยาว 4-15 ตัว

    let isValid = true;

    // ตรวจสอบ username
    if (!usernamePattern.test(this.username)) {
      this.usernameError = 'ชื่อผู้ใช้ต้องเป็นภาษาอังกฤษหรือตัวเลขและมีอย่างน้อย 6 ตัวอักษร';
      isValid = false;
    } else {
      this.usernameError = '';
    }

    // ตรวจสอบ password
    if (!passwordPattern.test(this.id)) {
      this.passwordError = 'รหัสผ่านต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลข ความยาวระหว่าง 4 ถึง 15 ตัวอักษร';
      isValid = false;
    } else {
      this.passwordError = '';
    }

    return isValid;
  }

  onGenerate() {
    // ตรวจสอบว่าผ่าน validation หรือไม่
    if (!this.validateForm()) {
      return;
    }

    const adminData = {
      username: this.username,
      password: this.id
    };

    this.http.post('http://localhost:3000/admin/create', adminData)
      .subscribe({
        next: (response) => {
          console.log('Admin created successfully:', response);
          this.successMessage = 'สร้างชื่อผู้ใช้และรหัสผ่านสำเร็จ';  // กำหนดข้อความสำเร็จ
          this.username = ''; // ล้างข้อมูลในฟอร์มหลังจากสร้างสำเร็จ
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
