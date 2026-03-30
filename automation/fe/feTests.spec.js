import { test } from '@playwright/test';
import { loginToBenefitsDashboard, addEmployeeManual, logoutOfBenefitsDashboard, addEmployees, removeEmployees, removeAllEmployees } from './feTestsData';

// Run all tests in this file
test.describe.serial('FE - All, serial test', () => {

    // Log in to the benefits dashboard before each test
    test.beforeEach(async ({ page }) => {
      await loginToBenefitsDashboard({ page });
    });

    // Test for logging out and logging back in to the benefits dashboard
    test('Logout test', async ({ page }) => {
      await logoutOfBenefitsDashboard(page);
      await loginToBenefitsDashboard({ page });
      });
    
    // Test for adding a single employee through the UI
    test('Add employee test', async ({ page }) => {
      await addEmployeeManual(page, 'John', 'Doe', 2);
      });
    
    // Test for adding multiple employees through the UI
    test('Add multiple employees test', async ({ page }) => {
      test.setTimeout(100000);
      await addEmployees(page, 5);
      });
    
    // Test for removing multiple employees through the UI
    test('Remove multiple employees test', async ({ page }) => {
      await removeEmployees(page, 2);
      });
    // Test for removing all employees through the UI
    test('Remove all employees test', async ({ page }) => {
      test.setTimeout(100000);
      await removeAllEmployees(page);
      });
});