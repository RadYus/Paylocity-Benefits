import { test } from '@playwright/test';
import { loginToBenefitsDashboard, addEmployeeManual, logoutOfBenefitsDashboard, addEmployees, removeEmployees, removeAllEmployees } from './feTestsData';

test.beforeEach(async ({ page }) => {
  await loginToBenefitsDashboard({ page });
});

test('Logout test', async ({ page }) => {
  await logoutOfBenefitsDashboard(page);
  await loginToBenefitsDashboard({ page });
  });

test('Add employee test', async ({ page }) => {
  await addEmployeeManual(page, 'John', 'Doe', 2);
  });

test('Add employees test', async ({ page }) => {
  test.setTimeout(100000);
  await addEmployees(page, 50);
  });

test('Remove employees test', async ({ page }) => {
  await removeEmployees(page, 8);
  });

test('Remove all employees test', async ({ page }) => {
  test.setTimeout(100000);
  await removeAllEmployees(page);
  });