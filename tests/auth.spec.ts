import { test, expect } from "@playwright/test";

/**
 * E2E tests for Supabase Auth flow
 * 
 * These tests verify:
 * - Login page is properly rendered with all form elements
 * - Users are redirected to dashboard after successful login
 * - Sidebar navigation is visible and functional after authentication
 * 
 * Credentials are read from environment variables:
 * - TEST_USER_EMAIL
 * - TEST_USER_PASSWORD
 * 
 * Tests requiring credentials will be skipped if not provided.
 */

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

/**
 * Test 1: LOGIN PAGE VISIBLE
 * Verify that navigating to /login displays the login form
 * with all required form elements.
 */
test("should display login page with email input, password input, and submit button", async ({
  page,
}) => {
  // Navigate to the login page
  await page.goto("/login");

  // Wait for the page to load
  await page.waitForLoadState("networkidle");

  // Verify the page title/heading (CardTitle renders as a div, not a semantic heading)
  // Use .first() to get the card title text (not the submit button)
  const cardTitle = page.getByText(/^Sign In$/).first();
  await expect(cardTitle).toBeVisible();

  // Verify email input is visible
  const emailLabel = page.getByLabel(/email/i);
  await expect(emailLabel).toBeVisible();

  // Verify password input is visible
  const passwordLabel = page.getByLabel(/password/i);
  await expect(passwordLabel).toBeVisible();

  // Verify the submit button is visible
  const submitButton = page.getByRole("button", { name: /sign in/i });
  await expect(submitButton).toBeVisible();
});

/**
 * Test 2: REDIRECT AFTER LOGIN
 * Verify that after successful login with valid credentials,
 * the user is redirected to the dashboard/projects page.
 * 
 * This test is skipped if TEST_USER_EMAIL or TEST_USER_PASSWORD
 * environment variables are not set.
 */
test("should redirect to dashboard/projects page after successful login", async ({
  page,
}) => {
  // Skip test if credentials are not provided
  test.skip(
    !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables must be set to run this test"
  );

  // Navigate to the login page
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  // Fill in the email field
  const emailInput = page.getByLabel(/email/i);
  await emailInput.fill(TEST_USER_EMAIL!);

  // Fill in the password field
  const passwordInput = page.getByLabel(/password/i);
  await passwordInput.fill(TEST_USER_PASSWORD!);

  // Click the submit button
  const submitButton = page.getByRole("button", { name: /sign in/i });
  await submitButton.click();

  // Wait for navigation to complete (either to /projects or /)
  // The app may redirect to / (projects overview) or /projects
  await page.waitForURL(/\/(projects)?$/, { timeout: 10000 });

  // Verify we're no longer on the login page
  await expect(page).not.toHaveURL("/login");

  // Verify the page loaded successfully
  await page.waitForLoadState("networkidle");
});

/**
 * Test 3: SIDEBAR NAVIGATION
 * Verify that after login, the sidebar navigation links are visible
 * with "Overview", "Projects", and "Settings" options.
 * 
 * This test is skipped if TEST_USER_EMAIL or TEST_USER_PASSWORD
 * environment variables are not set.
 */
test("should display sidebar navigation links after login", async ({
  page,
}) => {
  // Skip test if credentials are not provided
  test.skip(
    !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables must be set to run this test"
  );

  // Navigate to the login page
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  // Perform login
  const emailInput = page.getByLabel(/email/i);
  await emailInput.fill(TEST_USER_EMAIL!);

  const passwordInput = page.getByLabel(/password/i);
  await passwordInput.fill(TEST_USER_PASSWORD!);

  const submitButton = page.getByRole("button", { name: /sign in/i });
  await submitButton.click();

  // Wait for redirect after login
  await page.waitForURL(/\/(projects)?$/, { timeout: 10000 });
  await page.waitForLoadState("networkidle");

  // Verify "Overview" navigation link is visible
  // Use .first() to get sidebar link (excludes breadcrumb link with aria-disabled)
  const overviewLink = page
    .getByRole("link", { name: /overview/i })
    .first();
  await expect(overviewLink).toBeVisible();

  // Verify "Projects" navigation link is visible
  // Use .first() to get sidebar link (excludes breadcrumb link with aria-disabled)
  const projectsLink = page
    .getByRole("link", { name: /projects/i })
    .first();
  await expect(projectsLink).toBeVisible();

  // Verify "Settings" navigation link is visible
  // Use .first() to get sidebar link (excludes breadcrumb link with aria-disabled)
  const settingsLink = page
    .getByRole("link", { name: /settings/i })
    .first();
  await expect(settingsLink).toBeVisible();

  // Verify "Sign Out" button is present (indicates user is authenticated)
  const signOutButton = page.getByRole("button", { name: /sign out/i });
  await expect(signOutButton).toBeVisible();
});
