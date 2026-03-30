import { test, expect } from '@playwright/test';

const baseSalary = 52000;
const paychecksPerYear = 26;
const dependentCostPerYear = 500;
const benefitCostPerYear = 1000;

export function benefitCostPerPaycheck(dependents) {
    const cost = (benefitCostPerYear + (dependentCostPerYear * dependents)) / paychecksPerYear;
    return Number(cost.toFixed(5));
}

export function paycheckAmount(dependents) {
    const deduction = benefitCostPerPaycheck(dependents);
    const grossPerPaycheck = baseSalary / paychecksPerYear;
    return Number((grossPerPaycheck - deduction).toFixed(4));
}

export async function validateResponse(response) {
    if (!response.ok()) {
                console.log('response status:', response.status());
                console.log(await response.text());
            }
            expect(response.ok()).toBeTruthy();
}

export function bodyForEmployee(firstName, lastName, dependants) {
    return { 
        "firstName": firstName,
        "lastName": lastName,
        "username": "string",
        "dependants": dependants,
        "expiration": "2030-04-02T11:35:34.472Z",
        "salary": baseSalary };
}

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

export async function validateResponseData(body, firstName, lastName, dependants) {
    console.log('Add employee', JSON.stringify(body, null, 2));
            expect(body.firstName).toBe(firstName);
            expect(body.lastName).toBe(lastName);
            expect(body.dependants).toBe(dependants);
            expect(body.salary).toBe(baseSalary);
            expect(body.benefitsCost).toBeCloseTo(benefitCostPerPaycheck(dependants), 3);
            expect(body.net).toBeCloseTo(paycheckAmount(dependants), 3);
}