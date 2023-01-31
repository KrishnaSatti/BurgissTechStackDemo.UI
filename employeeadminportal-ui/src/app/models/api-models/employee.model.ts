import { Address } from './address.model';
import { Department } from './department.model';
import { Gender } from './gender.model';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: number;
  profileImageUrl: string;
  genderId: string;
  departmentId: string;
  gender: Gender;
  department: Department;
  address: Address;
}
