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
  gender: Gender;
  departmentId: string;
  department: Department;
  address: Address;
}
