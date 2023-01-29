import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/api-models/employee.model';

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
}
