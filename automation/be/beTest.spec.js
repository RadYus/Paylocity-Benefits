import { test, expect } from '@playwright/test';

test.describe.serial('REST API', () => {
	let api;

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
		console.log('basic auth response', JSON.stringify(body, null, 2));
	});
});