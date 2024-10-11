import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [NzFormModule,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss'
})
export class EditPatientComponent {
  @Input() patient: any; // ข้อมูลผู้ป่วยที่ส่งมาจากคอมโพเนนต์หลัก
  editForm: FormGroup;
  constructor(private fb: FormBuilder, private modal: NzModalRef, private http: HttpClient) {
    this.editForm = this.fb.group({
      title_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      id_card: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      date_birth: ['', Validators.required],
      house_number: ['', Validators.required],
      weight: [''],
      height: [''],
      waist: [''],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.patient) {
      this.editForm.patchValue(this.patient); // โหลดข้อมูลผู้ป่วยในฟอร์ม
    }
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;
      this.http.put(`http://localhost:3000/patients_web/${this.patient.id}`, updatedData)
        .subscribe({
          next: () => {
            this.modal.close(updatedData); // ปิด Modal และส่งข้อมูลที่แก้ไขกลับไป
          },
          error: (error) => {
            console.error('Error updating patient:', error);
          }
        });
    }
  }

  cancel(): void {
    this.modal.close(); // ปิด Modal โดยไม่บันทึก
  }

}
