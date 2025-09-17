import { test, expect } from '@playwright/test';

test('SauceDemo e2e flow: login, cart, checkout', async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

  const cartBadge = page.locator('.shopping_cart_badge');

  await page.click('text=Add to cart', { timeout: 5000 });
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart/);
  await page.click('text=Remove');
  await expect(cartBadge).toHaveCount(0); 
  await page.click('text=Continue Shopping');
  await page.click('text=Add to cart');
  await expect(cartBadge).toHaveText('1');

  await page.click('.shopping_cart_link');
  await page.click('text=Checkout');
  await expect(page).toHaveURL(/checkout-step-one/);

  

  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  
  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('.cart_item')).toBeVisible();

  
  await page.click('#finish');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  
});
