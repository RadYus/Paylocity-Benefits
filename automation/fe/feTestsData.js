import { expect } from '@playwright/test';

// Function to log in to the benefits dashboard
export async function loginToBenefitsDashboard( {page} ) {
  const USERNAME = process.env.BENEFITS_USERNAME;
  const PASSWORD = process.env.BENEFITS_PASSWORD;
  await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
  await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits');
}

// Function to log out of the benefits dashboard
export async function logoutOfBenefitsDashboard( page ) {
  await page.getByRole('link', { name: 'Log Out' }).click();
  await expect(page).toHaveURL('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn');
}

// Function to add an employee manually through the UI
export async function addEmployeeManual( page, firstName, lastName, dependents ) {
  await page.waitForTimeout(1100);
  await page.getByRole('button', { name: 'Add Employee' }).click();
  await page.getByRole('textbox', { name: 'First Name:' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Last Name:' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Dependents:' }).fill(dependents.toString());
  await page.getByRole('button', { name: 'Add', exact: true }).click();
}

// Function to add multiple employees through the UI
export async function addEmployees( page, times ) {
  for (let i = 0; i < times; i++) {
    await addEmployeeManual(page, `Test${i + 1}`, `User${i + 1}`, i);
  }
}

// Function to remove a specified number of employees through the UI
export async function removeEmployees( page, times ) {
  for (let i = 0; i < times; i++) {
    await page.waitForTimeout(1000);
    await page.locator('i').nth(1).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  }
}

// Function to remove all employees through the UI
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