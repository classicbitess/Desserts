# Classic Bites

Dessert menu published with GitHub Pages: https://classicbitess.github.io/Desserts/

Names, photos, and ingredients live in `desserts.js`. Photo files live in `desserts/`.

## Orders

The order page sends each order to a Google Form, and that form adds a row to the Google Sheet for classicbitess@gmail.com. Until `order-config.js` has the form link, Place order does not say the order was sent.

1. Sign in to Google as classicbitess@gmail.com.
2. Create a form named Classic Bites orders. Questions, in this order: Name, Phone, Dessert, Quantity, Requests. Quantity is a number.
3. In Responses, create a spreadsheet.
4. Add a Totals tab and put this in cell A1:

```
=QUERY(FormResponses1!A:F, "select D, sum(E) where D is not null group by D label D 'Dessert', sum(E) 'Total ordered'", 1)
```

5. Copy the form response URL (`https://docs.google.com/forms/d/e/.../formResponse`) and each question's `entry.` id into `order-config.js`.
