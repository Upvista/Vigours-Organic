// Email service using Resend
// Install: npm install resend

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  // Skip if no API key configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const itemsHtml = data.items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">PKR ${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">PKR ${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
            <p style="margin: 10px 0 0; font-size: 16px;">Thank you for shopping with Vigours Organic</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #059669; margin-top: 0;">Order Details</h2>
              <p style="margin: 5px 0;"><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-PK', { dateStyle: 'full' })}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #059669; margin-top: 0;">Shipping Address</h2>
              <p style="margin: 5px 0;"><strong>${data.customerName}</strong></p>
              <p style="margin: 5px 0;">${data.shippingAddress}</p>
              <p style="margin: 5px 0;">${data.shippingCity}, ${data.shippingPostalCode}</p>
              <p style="margin: 5px 0;">${data.customerPhone}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #059669; margin-top: 0;">Order Items</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f0fdf4;">
                    <th style="padding: 8px; text-align: left; border-bottom: 2px solid #059669;">Product</th>
                    <th style="padding: 8px; text-align: center; border-bottom: 2px solid #059669;">Qty</th>
                    <th style="padding: 8px; text-align: right; border-bottom: 2px solid #059669;">Price</th>
                    <th style="padding: 8px; text-align: right; border-bottom: 2px solid #059669;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #059669; margin-top: 0;">Order Summary</h2>
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 5px;">Subtotal:</td>
                  <td style="padding: 5px; text-align: right;">PKR ${data.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 5px;">Shipping:</td>
                  <td style="padding: 5px; text-align: right;">PKR ${data.shipping.toFixed(2)}</td>
                </tr>
                ${data.discount > 0 ? `
                <tr style="color: #059669;">
                  <td style="padding: 5px;">Discount:</td>
                  <td style="padding: 5px; text-align: right;">-PKR ${data.discount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr style="border-top: 2px solid #059669; font-weight: bold; font-size: 18px;">
                  <td style="padding: 10px 5px;">Total:</td>
                  <td style="padding: 10px 5px; text-align: right; color: #059669;">PKR ${data.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p><strong>Need Help?</strong></p>
              <p>Contact us at ${process.env.STORE_EMAIL || 'vigoursorganic@gmail.com'}<br>
              Phone: ${process.env.STORE_PHONE || '03334286566'}</p>
              <p style="margin-top: 20px;">Thank you for choosing Vigours Organic! 🌱</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.STORE_NAME || 'Vigours Organic'} <onboarding@resend.dev>`,
      to: [data.customerEmail],
      subject: `Order Confirmation #${data.orderNumber} - Vigours Organic`,
      html: emailHtml,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: emailData };
  } catch (error: any) {
    console.error('Email service error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendAdminNotificationEmail(data: OrderEmailData) {
  if (!process.env.RESEND_API_KEY || !process.env.STORE_EMAIL) {
    console.warn('Email not configured for admin notifications');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const itemsList = data.items.map(item => 
      `${item.name} - Qty: ${item.quantity} - PKR ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const emailHtml = `
      <h1>🎉 New Order Received!</h1>
      <h2>Order #${data.orderNumber}</h2>
      
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${data.customerName}</p>
      <p><strong>Email:</strong> ${data.customerEmail}</p>
      <p><strong>Phone:</strong> ${data.customerPhone}</p>
      
      <h3>Shipping Address:</h3>
      <p>${data.shippingAddress}<br>${data.shippingCity}, ${data.shippingPostalCode}</p>
      
      <h3>Order Items:</h3>
      <pre>${itemsList}</pre>
      
      <h3>Order Summary:</h3>
      <p>Subtotal: PKR ${data.subtotal.toFixed(2)}</p>
      <p>Shipping: PKR ${data.shipping.toFixed(2)}</p>
      <p>Discount: PKR ${data.discount.toFixed(2)}</p>
      <p><strong>Total: PKR ${data.total.toFixed(2)}</strong></p>
      
      <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
      
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/orders">View in Admin Panel</a></p>
    `;

    await resend.emails.send({
      from: `${process.env.STORE_NAME || 'Vigours Organic'} <onboarding@resend.dev>`,
      to: [process.env.STORE_EMAIL],
      subject: `🔔 New Order #${data.orderNumber}`,
      html: emailHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Admin notification error:', error);
    return { success: false, error: error.message };
  }
}

