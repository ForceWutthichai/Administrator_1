import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgZorroModule } from '../../../shared/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule, } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-all-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NgZorroModule],
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.scss']
})
export class AllAdminComponent implements OnInit {
  onCurrentPageDataChange($event: readonly { id: number; title_name: string; first_name: string; last_name: string; username: string; password: string; isEditing?: boolean; isPasswordVisible?: boolean; }[]) {
    throw new Error('Method not implemented.');
  }
  listOfData: Array<{ id: number, title_name: string, first_name: string, last_name: string, username: string, password: string, isEditing?: boolean, isPasswordVisible?: boolean }> = [];

  constructor(private http: HttpClient,private modal: NzModalService) { }

  ngOnInit(): void {
    this.fetchAdminData();
  }

  fetchAdminData(): void {
    this.http.get<any[]>('http://localhost:3000/admin/list')
      .subscribe({
        next: (response) => {
          this.listOfData = response.map(admin => ({
            id: admin.id,
            title_name: admin.title_name,
            first_name: admin.first_name,
            last_name: admin.last_name,
            username: admin.username,
            password: admin.plain_password,
            isEditing: false,
            isPasswordVisible: false // เพิ่มการควบคุมสถานะการมองเห็นรหัสผ่าน
          }));
        },
        error: (error) => {
          console.error('Error fetching admin data:', error);
        }
      });
  }

  togglePasswordVisibility(data: any): void {
    data.isPasswordVisible = !data.isPasswordVisible;
  }

  onEdit(data: any): void {
    data.isEditing = true;
  }

  onSave(data: any): void {
    this.http.put(`http://localhost:3000/admin/update/${data.id}`, data)
      .subscribe({
        next: () => {
          data.isEditing = false;
        },
        error: (error) => {
          console.error('Error updating admin:', error);
        }
      });
  }

  cancelEdit(data: any): void {
    data.isEditing = false;
  }

  onDelete(id: number): void {
    this.modal.confirm({
      nzTitle: 'คุณต้องการลบผู้ดูแลคนนี้หรือไม่?',
      nzContent: '<b>ข้อมูลนี้จะถูกลบอย่างถาวร</b>',
      nzOkText: 'ใช่',
      nzOkType: 'primary',
      nzCancelText: 'ไม่',
      nzOnOk: () => {
        // ส่งคำขอไปที่ backend เพื่อทำการลบข้อมูลผู้ดูแล
        this.http.delete(`http://localhost:3000/admin/${id}`)
          .subscribe({
            next: () => {
              // ลบข้อมูลจากฝั่ง frontend เมื่อได้รับการยืนยันจาก backend
              this.listOfData = this.listOfData.filter(item => item.id !== id);
              console.log(`Admin with id ${id} has been deleted`);
            },
            error: (error) => {
              console.error('Error deleting admin:', error);
            }
          });
      }
    });
  }


  // ฟังก์ชันตรวจสอบความถูกต้องของรหัสผ่าน
  isPasswordValid(password: string): boolean {
    const passwordPattern = /^[A-Za-z0-9]{4,15}$/;
    return passwordPattern.test(password);
  }
}
