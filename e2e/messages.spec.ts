import { test, expect } from '@playwright/test'

test.describe('Messages page', () => {
  test('loads conversations and opens a thread', async ({ page }) => {
    await page.goto('/messages')

    await expect(page.getByRole('heading', { name: 'Conversations' })).toBeVisible()
    await expect(page.getByText('Jeremie')).toBeVisible()

    await page.getByRole('option', { name: /Jeremie/ }).click()

    await expect(page.getByText(/Jeremie - You/)).toBeVisible()
    await expect(page.getByLabel('Your message')).toBeVisible()
  })

  test('sends a message in a conversation', async ({ page }) => {
    await page.goto('/messages?id=1')

    const message = `Playwright ${Date.now()}`
    await page.getByLabel('Your message').fill(message)
    await page.getByRole('button', { name: 'Send' }).click()

    await expect(page.getByText(message)).toBeVisible()
  })

  test('opens the new conversation modal', async ({ page }) => {
    await page.goto('/messages')

    await page.getByRole('button', { name: 'New conversation' }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog.getByRole('heading', { name: 'New conversation' })).toBeVisible()
    await expect(dialog.getByRole('option', { name: 'Patrick' })).toBeVisible()
    await expect(dialog.getByPlaceholder(/search for a user/i)).toBeVisible()
  })

  test('shows the error snackbar when conversations fail to load', async ({ page }) => {
    await page.route('**/api/conversations/**', async (route) => {
      if (route.request().method() !== 'GET') {
        await route.continue()
        return
      }

      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: '{}',
      })
    })

    await page.goto('/messages')
    await page.waitForLoadState('networkidle')

    await expect(page.getByText(/it's not you, it's me/i)).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText(/request failed \(503\)/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /retry now/i })).toBeVisible()
  })

  test('shows desktop split layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/messages')

    await expect(page.getByText(/select a conversation to get started/i)).toBeVisible()
    await page.getByRole('option', { name: /Jeremie/ }).click()
    await expect(page.getByText(/Jeremie - You/)).toBeVisible()
  })

  test('shows mobile back navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/messages?id=1')

    await expect(page.getByText(/Jeremie - You/)).toBeVisible()

    await page.getByRole('button', { name: 'Back to list' }).click()

    await expect(page.getByRole('heading', { name: 'Conversations' })).toBeVisible()
  })
})
