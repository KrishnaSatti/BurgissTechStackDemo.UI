import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/api-models/employee.model';
import { UpdateEmployeeRequest } from '../models/api-models/update-employee-request.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseApiUrl = 'https://localhost:44363';

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
      physicalAddress: employeeRequest.address.physicalAddress,
      postalAddress: employeeRequest.address.postalAddress,
    };

    return this.httpClient.put<Employee>(
      this.baseApiUrl + '/employees/' + employeeId,
      updateEmployeeRequest
    );
  }
}
