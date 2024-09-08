import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // นำเข้า HttpClient
import { NgZorroModule } from '../../../shared/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-admin',
  standalone: true,
  imports: [NgZorroModule, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.scss']
})
export class AllAdminComponent implements OnInit {
  listOfData: Array<{ id: number, username: string, password: string }> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAdminData(); // เรียกฟังก์ชันการดึงข้อมูล admin เมื่อคอมโพเนนต์เริ่มต้น
  }

  fetchAdminData(): void {
    this.http.get<any[]>('http://localhost:3000/admin/list')
      .subscribe({
        next: (response) => {
          this.listOfData = response.map(admin => ({
            id: admin.id,
            username: admin.username,
            password: admin.plain_password  // แสดงรหัสผ่านจริงจาก plain_password
          }));
        },
        error: (error) => {
          console.error('Error fetching admin data:', error);
        }
      });
  }

  onCurrentPageDataChange($event: any): void {
    // จัดการข้อมูลในหน้าปัจจุบันได้ที่นี่ ถ้าต้องการ
  }

  onDelete(id: number): void {
    // ลบข้อมูล admin ใน frontend
    this.http.delete(`http://localhost:3000/admin/${id}`)
      .subscribe({
        next: () => {
          this.listOfData = this.listOfData.filter(item => item.id !== id);
        },
        error: (error) => {
          console.error('Error deleting admin:', error);
        }
      });
  }
}
