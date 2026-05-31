const { test, expect } = require('@playwright/test');

test.describe('Safora Contact Us Form Automation', () => {

  // Runs before each test case to navigate to the target page
  test.beforeEach(async ({ page }) => {
    // Navigate to the Safora English website
    await page.goto('https://safora.se/en/');
    
    // Navigate to the Contact Us page by clicking the 'Contact' link
    await page.getByRole('link', { name: 'Contact', exact: true }).click();
  });

  test('TC_001 - Should show validation errors when submitting an empty form', async ({ page }) => {
    // Submit the form without filling out any fields
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify that at least one validation error message or required attribute field is visible
    const errorNotification = page.locator('.error-message, [required]');
    await expect(errorNotification.first()).toBeVisible();
  });

  test('TC_002 - Should successfully fill and submit the contact form', async ({ page }) => {
    // Fill out the mandatory input fields with valid test data
    await page.getByPlaceholder('Name').fill('Test Automation User');
    await page.getByPlaceholder('Email').fill('qa.test@example.com');
    await page.getByPlaceholder('Message').fill('This is an automated test message for Safora QA Internship assignment.');

    // Click the submit button to send the form data
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify that the submission success message is visible on screen
    await expect(page.getByText('Thank you')).toBeVisible();
  });

});