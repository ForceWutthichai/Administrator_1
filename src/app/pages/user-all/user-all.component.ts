import { Component, OnInit, TemplateRef } from '@angular/core'; // เพิ่ม TemplateRef ที่นี่
import { HttpClient } from '@angular/common/http';  // เพิ่มการใช้งาน HttpClient
import { NgZorroModule } from '../../../shared/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-user-all',
  standalone: true,
  imports: [NgZorroModule, CommonModule, FormsModule, NzPaginationModule],
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.scss']
})
export class UserAllComponent implements OnInit {
  patientsData: any[] = [];  // เก็บข้อมูลผู้ป่วยทั้งหมด
  filteredData: any[] = [];  // เก็บข้อมูลที่แสดงในตาราง
  searchText: string = ''; // ใช้เก็บข้อความค้นหา
  suffixIconSearch: string | TemplateRef<void> | undefined; // ไม่มีข้อผิดพลาดแล้วหลังจากนำเข้า TemplateRef

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPatientsData(); // เรียกฟังก์ชันเมื่อคอมโพเนนต์เริ่มต้น
  }

  fetchPatientsData(): void {
    this.http.get<any[]>('http://localhost:3000/patients')  // ดึงข้อมูลจาก API
      .subscribe({
        next: (data) => {
          this.patientsData = data;
          this.filteredData = [...this.patientsData]; // กำหนดค่าให้ filteredData ด้วยข้อมูลทั้งหมด
        },
        error: (error) => {
          console.error('Error fetching patients data:', error);
        }
      });
  }

  // ฟังก์ชันสำหรับค้นหา
  filterData(): void {
    const searchTerm = this.searchText.trim().toLowerCase(); // แปลงข้อความค้นหาเป็นตัวพิมพ์เล็ก และตัดช่องว่างข้างหน้าและข้างหลัง

    // แบ่งคำที่ค้นหาด้วยการเว้นวรรค (spacebar)
    const searchTerms = searchTerm.split(' ');

    this.filteredData = this.patientsData.filter(patient => {
      // แปลงข้อมูลในแต่ละฟิลด์เป็นสตริงและทำให้เป็นพิมพ์เล็กเพื่อใช้ในการค้นหา
      const fullName = `${patient.title_name}${patient.first_name} ${patient.last_name}`.toLowerCase();
      const fullName2 = `${patient.title_name} ${patient.first_name} ${patient.last_name}`.toLowerCase();
      const idCard = patient.id_card?.toLowerCase() || '';
      const phone = patient.phone?.toLowerCase() || '';
      const firstName = patient.first_name?.toLowerCase() || '';
      const lastName = patient.last_name?.toLowerCase() || '';

      // ตรวจสอบว่าแต่ละคำใน searchTerms อยู่ในข้อมูลของผู้ป่วยหรือไม่
      return searchTerms.every(term => {
        return (
          fullName.includes(term) || // ค้นหาชื่อเต็ม (คำนำหน้า + ชื่อ + นามสกุล)
          fullName2.includes(term) ||
          idCard.includes(term) || // ค้นหาหมายเลขบัตรประชาชน
          phone.includes(term) || // ค้นหาเบอร์โทรศัพท์
          firstName.includes(term) || // ค้นหาเฉพาะชื่อ
          lastName.includes(term) // ค้นหาเฉพาะนามสกุล
        );
      });
    });
  }


  isHashedPassword(password: string): boolean {
    return password.startsWith('$2b$');  // ตรวจสอบว่ารหัสผ่านเริ่มต้นด้วย "$2b$" ซึ่งเป็นรูปแบบของ bcrypt
  }
}
