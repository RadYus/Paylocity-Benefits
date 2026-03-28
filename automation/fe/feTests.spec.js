import { test } from '@playwright/test';
import { loginToBenefitsDashboard, addEmployeeManual, logoutOfBenefitsDashboard, addEmployees, removeEmployees, removeAllEmployees } from './feTestsData';

test.beforeEach(async ({ page }) => {
  await loginToBenefitsDashboard({ page });
});

test('logout test', async ({ page }) => {
  await logoutOfBenefitsDashboard(page);
  await loginToBenefitsDashboard({ page });
  });

test('add employee test', async ({ page }) => {
  await addEmployeeManual(page, 'John', 'Doe', 2);
  });

test('add employees test', async ({ page }) => {
  test.setTimeout(100000);
  await addEmployees(page, 50);
  });

test('remove employees test', async ({ page }) => {
  await removeEmployees(page, 8);
  });

test('remove all employees test', async ({ page }) => {
  test.setTimeout(100000);
  await removeAllEmployees(page);
  });