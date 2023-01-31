import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { EmployeeService } from '../employees/employee.service';
import { Employee } from '../models/api-models/employee.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  title = 'ng2-charts-demo';
  employees: Employee[] = [];
  public barChartLegend = true;
  public barChartPlugins = [];
  public totalCosts = [0, 0, 0, 0, 0];
  barChartData = {
    labels: ['Finance', 'Marketing', 'Operations', 'HR', 'IT/SWE'],
    datasets: [
      {
        backgroundColor: '#FFC107',
        data: this.totalCosts,
        label: 'Total Cost ($USD) of Department',
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'black',
          font: {
            family: 'Roboto, "Helvetica Neue", sans-serif',
            size: 25,
          },
        },
      },
    },
    scales: {
      y: {
        // not 'yAxes: [{' anymore (not an array anymore)
        ticks: {
          color: 'black', // not 'fontColor:' anymore
          // fontSize: 18,
          font: {
            family: 'Roboto, "Helvetica Neue", sans-serif',
            size: 14, // 'size' now within object 'font {}'
          },
        },
      },
      x: {
        // not 'xAxes: [{' anymore (not an array anymore)
        ticks: {
          color: 'black', // not 'fontColor:' anymore
          //fontSize: 14,
          font: {
            family: 'Roboto, "Helvetica Neue", sans-serif',
            size: 25, // 'size' now within object 'font {}'
          },
        },
      },
    },
  };

  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (successResponse) => {
        this.employees = successResponse;
        for (var x = 0; x < this.employees.length; x++) {
          if (this.employees[x].department.description === 'Finance') {
            this.totalCosts[0] += this.employees[x].mobile;
          }
          if (this.employees[x].department.description === 'Marketing') {
            this.totalCosts[1] += this.employees[x].mobile;
          }
          if (
            this.employees[x].department.description === 'Operations Management'
          ) {
            this.totalCosts[2] += this.employees[x].mobile;
          }
          if (this.employees[x].department.description === 'Human Resources') {
            this.totalCosts[3] += this.employees[x].mobile;
          }
          if (
            this.employees[x].department.description ===
            'Information Technology'
          ) {
            this.totalCosts[4] += this.employees[x].mobile;
          }
        }
        this.barChartData = {
          labels: ['Finance', 'Marketing', 'Operations', 'HR', 'IT/SWE'],
          datasets: [
            {
              backgroundColor: '#FFC107',
              data: this.totalCosts,
              label: 'Total Cost ($USD) of Department',
            },
          ],
        };
        console.log(this.barChartData);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
