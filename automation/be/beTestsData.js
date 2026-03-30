import { test, expect } from '@playwright/test';

// Constants for benefit cost calculations
const baseSalary = 52000;
const paychecksPerYear = 26;
const dependentCostPerYear = 500;
const benefitCostPerYear = 1000;

// Functions for benefit cost calculations
export function benefitCostPerPaycheck(dependents) {
    const cost = (benefitCostPerYear + (dependentCostPerYear * dependents)) / paychecksPerYear;
    return Number(cost.toFixed(5));
}

// Function to calculate paycheck amount after deductions
export function paycheckAmount(dependents) {
    const deduction = benefitCostPerPaycheck(dependents);
    const grossPerPaycheck = baseSalary / paychecksPerYear;
    return Number((grossPerPaycheck - deduction).toFixed(4));
}

// Functions for API response validation
export async function validateResponse(response) {
    if (!response.ok()) {
                console.log('response status:', response.status());
                console.log(await response.text());
            }
            expect(response.ok()).toBeTruthy();
}

// Functions to create request bodies for employee creation and update
export function bodyForEmployee(firstName, lastName, dependants) {
    return { 
        "firstName": firstName,
        "lastName": lastName,
        "username": "string",
        "dependants": dependants,
        "expiration": "2030-04-02T11:35:34.472Z",
        "salary": baseSalary };
}

// Function to create request body for updating an employee, including the employee ID
export function bodyForUpdatedEmployee(firstName, lastName, dependants, id) {
    return { 
        "firstName": firstName,
 		"lastName": lastName,
  		"username": "string",
  		"id": id,
		"dependants": dependants,
		"expiration": "2030-04-02T11:35:34.472Z",
  		"salary": baseSalary };
}

// Function to validate the response data against expected values
export async function validateResponseData(body, firstName, lastName, dependants) {
    console.log('Add employee', JSON.stringify(body, null, 2));
            expect(body.firstName).toBe(firstName);
            expect(body.lastName).toBe(lastName);
            expect(body.dependants).toBe(dependants);
            expect(body.salary).toBe(baseSalary);
            expect(body.benefitsCost).toBeCloseTo(benefitCostPerPaycheck(dependants), 3);
            expect(body.net).toBeCloseTo(paycheckAmount(dependants), 3);
}