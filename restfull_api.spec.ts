// tests/api-smoke.spec.js
import { test, expect } from '@playwright/test';

test.describe('Restful Booker API - Smoke Tests', () => {
  
  test('GET Booking IDs', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('Create a new Booking', async ({ request }) => {
    const bookingPayload = {
      firstname: "John",
      lastname: "Doe",
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-09-20",
        checkout: "2025-09-25"
      },
      additionalneeds: "Breakfast"
    };

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
      data: bookingPayload
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking.firstname).toBe("John");
  });

  test('Get Booking by ID', async ({ request }) => {
    // Create a booking first
    const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
      data: {
        firstname: "Alice",
        lastname: "Smith",
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
          checkin: "2025-10-01",
          checkout: "2025-10-05"
        },
        additionalneeds: "Dinner"
      }
    });

    expect(createResponse.status()).toBe(200);
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // Now fetch the booking by ID
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.firstname).toBe("Alice");
    expect(data.lastname).toBe("Smith");
  });

});
