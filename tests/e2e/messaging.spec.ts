import { expect, test } from '@playwright/test';

test('loads conversations and opens a searchable thread', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Messages' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Conversations' })
  ).toBeVisible();

  const searchInput = page.getByLabel('Rechercher');
  await searchInput.fill('jer');

  const jeremieConversation = page.getByRole('button', { name: /Jeremie/i });

  await expect(jeremieConversation).toBeVisible();
  await expect(page.getByRole('button', { name: /Patrick/i })).toHaveCount(0);

  await jeremieConversation.click();

  await expect(page.getByRole('heading', { name: 'Jeremie' })).toBeVisible();
  await expect(
    page.getByText("Bonjour c'est le premier message")
  ).toBeVisible();
  await expect(page.getByLabel('Nouveau message')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Envoyer' })).toBeDisabled();
});
