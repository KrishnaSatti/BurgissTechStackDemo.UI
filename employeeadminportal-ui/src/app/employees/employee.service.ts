import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/api-models/employee.model';
import { UpdateEmployeeRequest } from '../models/api-models/update-employee-request.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseApiUrl + '/employees');
  }

  getEmployee(employeeId: string): Observable<Employee> {
    return this.httpClient.get<Employee>(
      this.baseApiUrl + '/employees/' + employeeId
    );
  }

  updateEmployee(
    employeeId: string,
    employeeRequest: Employee
  ): Observable<Employee> {
    const updateEmployeeRequest: UpdateEmployeeRequest = {
      firstName: employeeRequest.firstName,
      lastName: employeeRequest.lastName,
      dateOfBirth: employeeRequest.dateOfBirth,
      email: employeeRequest.email,
      mobile: employeeRequest.mobile,
      genderId: employeeRequest.genderId,
      departmentId: employeeRequest.departmentId,
      physicalAddress: employeeRequest.address.physicalAddress,
      postalAddress: employeeRequest.address.postalAddress,
    };

    return this.httpClient.put<Employee>(
      this.baseApiUrl + '/employees/' + employeeId,
      updateEmployeeRequest
    );
  }

  deleteEmployee(employeeId: string): Observable<Employee> {
    return this.httpClient.delete<Employee>(
      this.baseApiUrl + '/employees/' + employeeId
    );
  }

  addEmployee(employeeRequest: Employee): Observable<Employee> {
    const addEmployeeRequest: UpdateEmployeeRequest = {
      firstName: employeeRequest.firstName,
      lastName: employeeRequest.lastName,
      dateOfBirth: employeeRequest.dateOfBirth,
      email: employeeRequest.email,
      mobile: employeeRequest.mobile,
      genderId: employeeRequest.genderId,
      departmentId: employeeRequest.departmentId,
      physicalAddress: employeeRequest.address.physicalAddress,
      postalAddress: employeeRequest.address.postalAddress,
    };
    return this.httpClient.post<Employee>(
      this.baseApiUrl + '/employees/add',
      addEmployeeRequest
    );
  }

  uploadImage(employeeId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file);

    return this.httpClient.post(
      this.baseApiUrl + '/employees/' + employeeId + '/upload-image',
      formData,
      {
        responseType: 'text',
      }
    );
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
