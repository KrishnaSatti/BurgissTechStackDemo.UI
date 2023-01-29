import { Component, ComponentRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/ui-models/employee.model';
import { GenderService } from 'src/app/services/gender.service';
import { EmployeeService } from '../employee.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent {
  employeeId: string | null | undefined;
  employee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  genderList: Gender[] = [];

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.employeeService
          .getEmployee(this.employeeId)
          .subscribe((successResponse) => {
            this.employee = successResponse;
          });

        this.genderService.getGenderList().subscribe((successResponse) => {
          this.genderList = successResponse;
        });
      }
    });
  }

  onUpdate(): void {
    this.employeeService
      .updateEmployee(this.employee.id, this.employee)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Employee Updated Successfully', undefined, {
            duration: 3000,
          });
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  onDelete(): void {
    this.employeeService.deleteStudent(this.employee.id).subscribe(
      (successResponse) => {
        this.snackbar.open('Employee Deleted successfully', undefined, {
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 1000);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
