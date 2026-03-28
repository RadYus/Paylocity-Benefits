import { test, expect } from '@playwright/test';

test.describe.serial('REST API', () => {
	let api;

	test.beforeAll(async ({ playwright }) => {
		api = await playwright.request.newContext({baseURL: 'http://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod'});
	});


	test.afterAll(async () => {
		if (api) await api.dispose();
	});
	test('GET with Basic Auth header', async () => {
        const AUTHENTICATION = process.env.BENEFITS_AUTHENTICATION;
		const basic = `${AUTHENTICATION}`;
		const response = await api.get('/api/Employees', {
    headers: {
    Authorization: `Basic ${basic}`,
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.32.3',
    Host: 'wmxrwq14uc.execute-api.us-east-1.amazonaws.com'
  }
});
		if (!response.ok()) {
			console.log('response status:', response.status());
			console.log(await response.text());
            console.log('basic auth header:', `Basic ${basic}`);
            console.log('HEADERS SENT:', {Authorization: `Basic ${basic}`}
);

		}
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		console.log('basic auth response', JSON.stringify(body, null, 2));
	});
});