-- Location: supabase/migrations/20260114141505_ecommerce_with_products.sql
-- Schema Analysis: Fresh database - no existing tables
-- Integration Type: Complete e-commerce schema creation
-- Dependencies: None (fresh project)

-- 1. Types and Enums
CREATE TYPE public.product_status AS ENUM ('active', 'inactive', 'out_of_stock');
CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- 2. Core Tables
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    original_price DECIMAL(10,2) CHECK (original_price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url TEXT,
    status public.product_status DEFAULT 'active'::public.product_status,
    sku TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    status public.order_status DEFAULT 'pending'::public.order_status,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

-- 4. Enable RLS (for security, though we'll allow public access for testing)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies - Open access for testing
CREATE POLICY "public_can_read_categories" ON public.categories
    FOR SELECT TO public USING (true);

CREATE POLICY "public_can_manage_categories" ON public.categories
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "public_can_read_products" ON public.products
    FOR SELECT TO public USING (true);

CREATE POLICY "public_can_manage_products" ON public.products
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "public_can_read_product_images" ON public.product_images
    FOR SELECT TO public USING (true);

CREATE POLICY "public_can_manage_product_images" ON public.product_images
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "public_can_read_orders" ON public.orders
    FOR SELECT TO public USING (true);

CREATE POLICY "public_can_manage_orders" ON public.orders
    FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "public_can_read_order_items" ON public.order_items
    FOR SELECT TO public USING (true);

CREATE POLICY "public_can_manage_order_items" ON public.order_items
    FOR ALL TO public USING (true) WITH CHECK (true);

-- 6. Triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $func$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$func$;

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Mock Data - Fictional Products
DO $$
DECLARE
    cat_electronics UUID := gen_random_uuid();
    cat_clothing UUID := gen_random_uuid();
    cat_home UUID := gen_random_uuid();
    cat_sports UUID := gen_random_uuid();
    prod1_id UUID := gen_random_uuid();
    prod2_id UUID := gen_random_uuid();
    prod3_id UUID := gen_random_uuid();
    prod4_id UUID := gen_random_uuid();
    prod5_id UUID := gen_random_uuid();
    prod6_id UUID := gen_random_uuid();
    prod7_id UUID := gen_random_uuid();
    prod8_id UUID := gen_random_uuid();
    order1_id UUID := gen_random_uuid();
    order2_id UUID := gen_random_uuid();
BEGIN
    -- Insert Categories
    INSERT INTO public.categories (id, name, description, image_url) VALUES
        (cat_electronics, 'Electronics', 'Electronic devices and accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
        (cat_clothing, 'Clothing', 'Fashion and apparel', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400'),
        (cat_home, 'Home & Kitchen', 'Home decor and kitchen essentials', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400'),
        (cat_sports, 'Sports & Outdoors', 'Sports equipment and outdoor gear', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400');

    -- Insert Products
    INSERT INTO public.products (id, name, description, price, original_price, stock_quantity, category_id, image_url, status, sku) VALUES
        (prod1_id, 'Wireless Bluetooth Headphones', 'Premium noise-cancelling headphones with 30-hour battery life', 149.99, 199.99, 45, cat_electronics, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 'active'::public.product_status, 'ELEC-001'),
        (prod2_id, 'Smart Watch Pro', 'Advanced fitness tracker with heart rate monitor and GPS', 299.99, 349.99, 28, cat_electronics, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 'active'::public.product_status, 'ELEC-002'),
        (prod3_id, 'Vintage Denim Jacket', 'Classic blue denim jacket with distressed finish', 79.99, 99.99, 60, cat_clothing, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 'active'::public.product_status, 'CLO-001'),
        (prod4_id, 'Running Shoes Elite', 'Lightweight performance running shoes with cushioned sole', 129.99, 159.99, 35, cat_sports, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'active'::public.product_status, 'SPO-001'),
        (prod5_id, 'Ceramic Coffee Mug Set', 'Set of 4 handcrafted ceramic mugs in assorted colors', 34.99, 44.99, 120, cat_home, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', 'active'::public.product_status, 'HOME-001'),
        (prod6_id, 'Yoga Mat Premium', 'Extra thick non-slip yoga mat with carrying strap', 49.99, 69.99, 75, cat_sports, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 'active'::public.product_status, 'SPO-002'),
        (prod7_id, 'Wireless Charger Pad', 'Fast charging wireless pad compatible with all Qi devices', 29.99, 39.99, 150, cat_electronics, 'https://images.unsplash.com/photo-1591290619762-9b2c34b51b8f?w=400', 'active'::public.product_status, 'ELEC-003'),
        (prod8_id, 'Cotton T-Shirt Basic', 'Soft breathable cotton t-shirt in multiple colors', 19.99, 24.99, 200, cat_clothing, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'active'::public.product_status, 'CLO-002');

    -- Insert Product Images
    INSERT INTO public.product_images (product_id, image_url, alt_text, display_order) VALUES
        (prod1_id, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', 'Wireless Bluetooth Headphones front view', 1),
        (prod1_id, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600', 'Wireless Bluetooth Headphones side view', 2),
        (prod2_id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', 'Smart Watch Pro display', 1),
        (prod3_id, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', 'Vintage Denim Jacket worn', 1),
        (prod4_id, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'Running Shoes Elite pair', 1);

    -- Insert Sample Orders
    INSERT INTO public.orders (id, order_number, customer_name, customer_email, customer_phone, shipping_address, total_amount, status, payment_status) VALUES
        (order1_id, 'ORD-2026-001', 'John Anderson', 'john.anderson@example.com', '+1-555-0123', '123 Main Street, Apt 4B, New York, NY 10001', 329.98, 'processing'::public.order_status, 'completed'::public.payment_status),
        (order2_id, 'ORD-2026-002', 'Sarah Martinez', 'sarah.martinez@example.com', '+1-555-0456', '456 Oak Avenue, Los Angeles, CA 90001', 209.97, 'pending'::public.order_status, 'pending'::public.payment_status);

    -- Insert Order Items
    INSERT INTO public.order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
        (order1_id, prod1_id, 1, 149.99, 149.99),
        (order1_id, prod7_id, 6, 29.99, 179.99),
        (order2_id, prod4_id, 1, 129.99, 129.99),
        (order2_id, prod6_id, 1, 49.99, 49.99),
        (order2_id, prod8_id, 1, 19.99, 19.99);

END $$;