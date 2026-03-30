import { test, expect } from '@playwright/test';
import {benefitCostPerPaycheck, paycheckAmount} from './beTestData';

let api;
let id;
// Select test data
const firstName = "John";
const lastName = "Doe";
const dependants = 10;
// Update test data
const firstNameUpdate = 'Marek';
const lastNameUpdate = 'Parek';
const dependantsUpdate = 10;

test.describe.serial('REST API', () => {
	

	test.beforeAll(async ({ playwright }) => {
		api = await playwright.request.newContext({baseURL: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com'});
	});

	test.afterAll(async () => {
		if (api) await api.dispose();
	});
	
	test('GET list of employees', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.get('/Prod/api/Employees', {headers: {Authorization: `Basic ${basic}`}});
		if (!response.ok()) {
			console.log('response status:', response.status());
			console.log(await response.text());
		}
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		console.log('GET list of employees', JSON.stringify(body, null, 2));
	});

	test('Add employee', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		
		const data = { 
			"firstName": firstName,
 			"lastName": lastName,
  			"username": "string",
  			"id": "8a310f42-0833-4f15-0bfd-21784a990688",
			"dependants": dependants,
			"expiration": "2030-04-02T11:35:34.472Z",
  			"salary": 9547.176413880537 };
		
			const response = await api.post('/Prod/api/Employees', {data: data, headers: {Authorization: `Basic ${basic}`}});
		if (!response.ok()) {
			console.log('response status:', response.status());
			console.log(await response.text());
		}
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		console.log('Add employee', JSON.stringify(body, null, 2));
		id = body?.id;
		expect(body.firstName).toBe(firstName);
		expect(body.lastName).toBe(lastName);
		expect(body.dependants).toBe(dependants);
		expect(body.salary).toBe(52000);
		expect(body.benefitsCost).toBeCloseTo(await benefitCostPerPaycheck(dependants), 3);
		expect(body.net).toBeCloseTo(await paycheckAmount(dependants), 3);
	});

	test('Update employee', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		
		const data = { 
			"firstName": firstNameUpdate,
 			"lastName": lastNameUpdate,
  			"username": "string",
  			"id": id,
			"dependants": dependantsUpdate,
			"expiration": "2030-04-02T11:35:34.472Z",
  			"salary": 52000 };
		const response = await api.put('/Prod/api/Employees', {data: data, headers: {Authorization: `Basic ${basic}`}});
		if (!response.ok()) {
			console.log('response status:', response.status());
			console.log(await response.text());
		}
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		console.log('Update employee', JSON.stringify(body, null, 2));
		expect(body.firstName).toBe(firstNameUpdate);
		expect(body.lastName).toBe(lastNameUpdate);
		expect(body.dependants).toBe(dependantsUpdate);
		expect(body.salary).toBe(52000);
		expect(body.benefitsCost).toBeCloseTo(await benefitCostPerPaycheck(dependantsUpdate), 3);
		expect(body.net).toBeCloseTo(await paycheckAmount(dependantsUpdate), 3);
	});

	test('GET an employee', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.get(`/Prod/api/Employees/${id}`, {headers: {Authorization: `Basic ${basic}`}});
		if (!response.ok()) {
			console.log('response status:', response.status());
			console.log(await response.text());
		}
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		console.log('GET an employee', JSON.stringify(body, null, 2));
		expect(body.firstName).toBe(firstNameUpdate);
		expect(body.lastName).toBe(lastNameUpdate);
		expect(body.dependants).toBe(dependantsUpdate);
		expect(body.salary).toBe(52000);
		expect(body.benefitsCost).toBeCloseTo(await benefitCostPerPaycheck(dependantsUpdate), 3);
		expect(body.net).toBeCloseTo(await paycheckAmount(dependantsUpdate), 3);
	});
	
	test('DELETE an employee', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.delete(`/Prod/api/Employees/${id}`, {headers: {Authorization: `Basic ${basic}`}});
		if (!response.ok()) {
			console.log('response status:', response.status());
			console.log(await response.text());
		}
		expect(response.ok()).toBeTruthy();
	});
});