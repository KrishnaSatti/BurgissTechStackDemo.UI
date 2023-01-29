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
  displayProfileImageUrl = '';

  isNewEmployee = false;
  header = '';

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
        if (this.employeeId.toLowerCase() === 'Add'.toLowerCase()) {
          // -> new Student Functionality
          this.isNewEmployee = true;
          this.header = 'Add New Student';
          this.setImage();
        } else {
          // -> Existing Student Functionality
          this.isNewEmployee = false;
          this.header = 'Edit Student';
          this.employeeService.getEmployee(this.employeeId).subscribe(
            (successResponse) => {
              this.employee = successResponse;
              this.setImage();
            },
            (errorResponse) => {
              this.setImage();
            }
          );
        }

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
            duration: 5000,
          });
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  onDelete(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      (successResponse) => {
        this.router.navigateByUrl('employees');
        this.snackbar.open('Employee Deleted Successfully', undefined, {
          duration: 5000,
        });
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  onAdd(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      (successResponse) => {
        this.router.navigateByUrl('employees');
        this.snackbar.open('Employee Added Successfully', undefined, {
          duration: 5000,
        });
      },
      (errorResponse) => {}
    );
  }

  uploadImage(event: any): void {
    if (this.employeeId) {
      const file: File = event.target.files[0];
      this.employeeService.uploadImage(this.employee.id, file).subscribe(
        (successResponse) => {
          this.employee.profileImageUrl = successResponse;
          this.setImage();

          // Show a notification
          this.snackbar.open('Profile Image Updated', undefined, {
            duration: 2000,
          });
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
  }

  private setImage(): void {
    if (this.employee.profileImageUrl) {
      this.displayProfileImageUrl = this.employeeService.getImagePath(
        this.employee.profileImageUrl
      );
    } else {
      // Display a default
      this.displayProfileImageUrl = '/assets/user.png';
    }
  }
}
