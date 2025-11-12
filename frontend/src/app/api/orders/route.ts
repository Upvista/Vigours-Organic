import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `VO${timestamp}${random}`;
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      paymentMethod,
      items,
      subtotal,
      shipping,
      discount,
      total,
    } = body;

    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    const supabase = getServerSupabase();
    const orderNumber = generateOrderNumber();

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_first_name: firstName,
        customer_last_name: lastName,
        customer_email: email,
        customer_phone: phone,
        shipping_address: address,
        shipping_city: city,
        shipping_postal_code: postalCode,
        subtotal: subtotal,
        shipping_fee: shipping,
        discount: discount || 0,
        total: total,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'pending',
        order_status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order', details: orderError.message },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item: {id: number; name: string; image: string; category: string; price: number; quantity: number}) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_image: item.image,
      product_category: item.category,
      unit_price: item.price,
      quantity: item.quantity,
      total_price: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items creation error:', itemsError);
      // Rollback order if items fail
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    // Send confirmation emails (don't wait for them)
    const emailData = {
      orderNumber,
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: address,
      shippingCity: city,
      shippingPostalCode: postalCode,
      items: items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      shipping,
      discount: discount || 0,
      total,
      paymentMethod: getPaymentMethodLabel(paymentMethod),
    };

    // Send emails asynchronously (don't block response)
    Promise.all([
      sendOrderConfirmationEmail(emailData),
      sendAdminNotificationEmail(emailData),
    ]).catch(error => {
      console.error('Email sending failed:', error);
    });

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order.id,
      message: 'Order placed successfully',
    });

  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Fetch orders (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Simple authentication check
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !isValidAuth(authHeader)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServerSupabase();
    
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('order_status', status);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Fetch orders error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders,
      count: orders?.length || 0,
    });

  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions
function getPaymentMethodLabel(method: string): string {
  const methods: { [key: string]: string } = {
    cod: 'Cash on Delivery',
    jazzcash: 'JazzCash',
    easypaisa: 'EasyPaisa',
    nayapay: 'NayaPay',
    card: 'Credit/Debit Card',
  };
  return methods[method] || method;
}

function isValidAuth(authHeader: string): boolean {
  const token = authHeader.replace('Bearer ', '');
  const validToken = Buffer.from(
    `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`
  ).toString('base64');
  return token === validToken;
}

