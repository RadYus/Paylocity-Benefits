import { expect } from '@playwright/test';

export async function loginToBenefitsDashboard( {page} ) {
  const USERNAME = process.env.BENEFITS_USERNAME;
  const PASSWORD = process.env.BENEFITS_PASSWORD;
  await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
  await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits');
}

export async function logoutOfBenefitsDashboard( page ) {
  await page.getByRole('link', { name: 'Log Out' }).click();
  await expect(page).toHaveURL('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn');
}

export async function addEmployeeManual( page, firstName, lastName, dependents ) {
  await page.waitForTimeout(1100);
  await page.getByRole('button', { name: 'Add Employee' }).click();
  await page.getByRole('textbox', { name: 'First Name:' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Last Name:' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Dependents:' }).fill(dependents.toString());
  await page.getByRole('button', { name: 'Add', exact: true }).click();
}

export async function addEmployees( page, times ) {
  for (let i = 0; i < times; i++) {
    await addEmployeeManual(page, `Test${i + 1}`, `User${i + 1}`, i);
  }
}

export async function removeEmployees( page, times ) {
  for (let i = 0; i < times; i++) {
    await page.waitForTimeout(1000);
    await page.locator('i').nth(1).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  }
}

export async function removeAllEmployees( page ) {
  while (true) {
    await page.waitForTimeout(1000);
    const count = await page.locator('i').count();
    if (count <= 0) break;
    try {
      await page.locator('i').nth(1).click();
      await page.getByRole('button', { name: 'Delete' }).click();
    } catch (e) {
      break;
    }
  }
  await expect(page.getByRole('cell', { name: 'No employees found.' })).toBeVisible();
}