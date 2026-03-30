import { test, expect } from '@playwright/test';
import { validateResponse, bodyForEmployee, bodyForUpdatedEmployee, validateResponseData } from './beTestsData';

let api;
let id;
// Select test data
const firstName = "John";
const lastName = "Doe";
const dependants = 3;
// Update test data
const firstNameUpdate = 'Marek';
const lastNameUpdate = 'Parek';
const dependantsUpdate = 8;

// This API is intended to be tested in a specific order, run the serial test "test.describe.serial('API - All, serial test', () =>"
// POST employee test and GET list of employees test can be run independently
test.describe.serial('API - All, serial test', () => {
	

	test.beforeAll(async ({ playwright }) => {
		api = await playwright.request.newContext({baseURL: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com'});
	});

	test('POST employee test', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		
		const data = bodyForEmployee(firstName, lastName, dependants);
		const response = await api.post('/Prod/api/Employees', {data: data, headers: {Authorization: `Basic ${basic}`}});
		await validateResponse(response);
		const body = await response.json();
		id = body?.id;
		await validateResponseData(body, firstName, lastName, dependants);
	});

	test('GET employee test', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.get(`/Prod/api/Employees/${id}`, {headers: {Authorization: `Basic ${basic}`}});
		await validateResponse(response);
		const body = await response.json();
		await validateResponseData(body, firstName, lastName, dependants);
	});

	test('PUT employee test', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		
		const data = bodyForUpdatedEmployee(firstNameUpdate, lastNameUpdate, dependantsUpdate, id);
		const response = await api.put('/Prod/api/Employees', {data: data, headers: {Authorization: `Basic ${basic}`}});
		await validateResponse(response);
		const body = await response.json();
		await validateResponseData(body, firstNameUpdate, lastNameUpdate, dependantsUpdate);
	});

	test('GET updated employee test', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.get(`/Prod/api/Employees/${id}`, {headers: {Authorization: `Basic ${basic}`}});
		await validateResponse(response);
		const body = await response.json();
		await validateResponseData(body, firstNameUpdate, lastNameUpdate, dependantsUpdate);
	});
	
	test('DELETE employee test', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.delete(`/Prod/api/Employees/${id}`, {headers: {Authorization: `Basic ${basic}`}});
		await validateResponse(response);
	});

	test('GET list of employees test', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.get('/Prod/api/Employees', {headers: {Authorization: `Basic ${basic}`}});
		await validateResponse(response);
		const body = await response.json();
		console.log('GET list of employees', JSON.stringify(body, null, 2));
	});
});