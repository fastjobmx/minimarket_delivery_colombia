-- Location: supabase/migrations/20260116213837_add_more_products.sql
-- Schema Analysis: Existing tables - products, categories
-- Integration Type: Addition (adding more mock products)
-- Dependencies: products table, categories table

-- Get existing category IDs
DO $$
DECLARE
    electronics_id UUID;
    clothing_id UUID;
BEGIN
    -- Get existing category IDs from the database
    SELECT id INTO electronics_id FROM public.categories WHERE name = 'Electronics' LIMIT 1;
    SELECT id INTO clothing_id FROM public.categories WHERE name = 'Clothing' LIMIT 1;

    -- Add new categories for Colombian minimarket
    INSERT INTO public.categories (name, description, image_url) VALUES
        ('Frutas', 'Frutas frescas y tropicales', 'https://images.unsplash.com/photo-1677746526098-930de6524b0d'),
        ('Despensa', 'Productos de despensa y granos', 'https://images.unsplash.com/photo-1570384182225-e00c5765cd01'),
        ('Lácteos', 'Productos lácteos frescos', 'https://img.rocket.new/generatedImages/rocket_gen_img_1308d9ce8-1764869151150.png'),
        ('Panadería', 'Pan fresco y productos de panadería', 'https://img.rocket.new/generatedImages/rocket_gen_img_1488ff4b5-1767889444612.png'),
        ('Bebidas', 'Bebidas refrescantes y jugos', 'https://images.unsplash.com/photo-1690983321214-20d2480ac9cc'),
        ('Carnes', 'Carnes frescas y embutidos', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f'),
        ('Aseo', 'Productos de aseo y limpieza', 'https://images.unsplash.com/photo-1563453392212-326f5e854473')
    ON CONFLICT (name) DO NOTHING;

    -- Get the new category IDs
    DECLARE
        frutas_id UUID;
        despensa_id UUID;
        lacteos_id UUID;
        panaderia_id UUID;
        bebidas_id UUID;
        carnes_id UUID;
        aseo_id UUID;
    BEGIN
        SELECT id INTO frutas_id FROM public.categories WHERE name = 'Frutas' LIMIT 1;
        SELECT id INTO despensa_id FROM public.categories WHERE name = 'Despensa' LIMIT 1;
        SELECT id INTO lacteos_id FROM public.categories WHERE name = 'Lácteos' LIMIT 1;
        SELECT id INTO panaderia_id FROM public.categories WHERE name = 'Panadería' LIMIT 1;
        SELECT id INTO bebidas_id FROM public.categories WHERE name = 'Bebidas' LIMIT 1;
        SELECT id INTO carnes_id FROM public.categories WHERE name = 'Carnes' LIMIT 1;
        SELECT id INTO aseo_id FROM public.categories WHERE name = 'Aseo' LIMIT 1;

        -- Add products for Frutas category
        INSERT INTO public.products (category_id, sku, name, description, price, original_price, stock_quantity, image_url, status) VALUES
            (frutas_id, 'FRU-001', 'Aguacate Hass Premium', 'Aguacate Hass maduro importado de primera calidad', 3500, 4000, 50, 'https://images.unsplash.com/photo-1728365796061-c6431c027687', 'active'::public.product_status),
            (frutas_id, 'FRU-002', 'Mango Tommy', 'Mangos Tommy dulces y jugosos', 2500, 3000, 40, 'https://images.unsplash.com/photo-1591073113125-e46713c829ed', 'active'::public.product_status),
            (frutas_id, 'FRU-003', 'Banano Criollo', 'Racimo de bananos criollos maduros', 3000, 3500, 60, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e', 'active'::public.product_status),
            (frutas_id, 'FRU-004', 'Papaya Maradol', 'Papaya Maradol dulce y fresca', 4500, 5000, 30, 'https://images.unsplash.com/photo-1563018855-ba02f3bcb5da', 'active'::public.product_status),
            (frutas_id, 'FRU-005', 'Guayaba Pera', 'Guayabas pera aromáticas', 2000, 2500, 45, 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46', 'active'::public.product_status),
            (frutas_id, 'FRU-006', 'Naranja Valencia', 'Naranjas Valencia para jugo', 3200, 3700, 55, 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b', 'active'::public.product_status);

        -- Add products for Despensa category
        INSERT INTO public.products (category_id, sku, name, description, price, original_price, stock_quantity, image_url, status) VALUES
            (despensa_id, 'DES-001', 'Arroz Diana 1kg', 'Arroz Diana de primera calidad', 3800, 4200, 100, 'https://images.unsplash.com/photo-1586201375761-83865001e31c', 'active'::public.product_status),
            (despensa_id, 'DES-002', 'Frijol Rojo 500g', 'Frijoles rojos de grano grande', 4500, 5000, 80, 'https://images.unsplash.com/photo-1509665803886-399eef30df2e', 'active'::public.product_status),
            (despensa_id, 'DES-003', 'Pasta Doria 500g', 'Pasta Doria espagueti', 2800, 3200, 120, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 'active'::public.product_status),
            (despensa_id, 'DES-004', 'Aceite Gourmet 1L', 'Aceite vegetal Gourmet', 8500, 9000, 60, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5', 'active'::public.product_status),
            (despensa_id, 'DES-005', 'Azúcar Incauca 1kg', 'Azúcar blanca refinada', 3200, 3600, 90, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d', 'active'::public.product_status),
            (despensa_id, 'DES-006', 'Sal Marina 500g', 'Sal marina para cocinar', 1800, 2200, 150, 'https://images.unsplash.com/photo-1598378424069-f5e5ee9d2e8b', 'active'::public.product_status);

        -- Add products for Lácteos category
        INSERT INTO public.products (category_id, sku, name, description, price, original_price, stock_quantity, image_url, status) VALUES
            (lacteos_id, 'LAC-001', 'Leche Alpina Entera 1L', 'Leche entera pasteurizada', 4200, 4500, 70, 'https://images.unsplash.com/photo-1550583724-b2692b85b150', 'active'::public.product_status),
            (lacteos_id, 'LAC-002', 'Queso Campesino 500g', 'Queso campesino fresco', 12000, 13000, 40, 'https://images.unsplash.com/photo-1452195100486-9cc805987862', 'active'::public.product_status),
            (lacteos_id, 'LAC-003', 'Yogurt Alpina Griego', 'Yogurt griego natural', 3800, 4200, 60, 'https://images.unsplash.com/photo-1488477181946-6428a0291777', 'active'::public.product_status),
            (lacteos_id, 'LAC-004', 'Mantequilla Alpina 250g', 'Mantequilla con sal', 5500, 6000, 50, 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d', 'active'::public.product_status),
            (lacteos_id, 'LAC-005', 'Kumis Alpina 1L', 'Bebida láctea fermentada', 4000, 4400, 55, 'https://images.unsplash.com/photo-1563636619-e9143da7973b', 'active'::public.product_status),
            (lacteos_id, 'LAC-006', 'Cuajada 500g', 'Cuajada fresca artesanal', 8000, 8500, 35, 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d', 'active'::public.product_status);

        -- Add products for Panadería category
        INSERT INTO public.products (category_id, sku, name, description, price, original_price, stock_quantity, image_url, status) VALUES
            (panaderia_id, 'PAN-001', 'Pan Integral Bimbo', 'Pan de molde integral tajado', 6500, 7000, 45, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', 'active'::public.product_status),
            (panaderia_id, 'PAN-002', 'Pandebono x 6 unid', 'Pandebonos artesanales', 8000, 8500, 30, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c', 'active'::public.product_status),
            (panaderia_id, 'PAN-003', 'Buñuelos x 6 unid', 'Buñuelos tradicionales', 7500, 8000, 25, 'https://images.unsplash.com/photo-1605326152427-2c3f6d4c4c8f', 'active'::public.product_status),
            (panaderia_id, 'PAN-004', 'Almojábanas x 6 unid', 'Almojábanas de queso', 7000, 7500, 35, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', 'active'::public.product_status),
            (panaderia_id, 'PAN-005', 'Roscón', 'Roscón tradicional con bocadillo', 9000, 9500, 20, 'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e', 'active'::public.product_status),
            (panaderia_id, 'PAN-006', 'Pan Francés x 4 unid', 'Pan francés crujiente', 4500, 5000, 50, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', 'active'::public.product_status);

        -- Add products for Bebidas category
        INSERT INTO public.products (category_id, sku, name, description, price, original_price, stock_quantity, image_url, status) VALUES
            (bebidas_id, 'BEB-001', 'Coca-Cola 1.5L', 'Gaseosa Coca-Cola', 4500, 5000, 100, 'https://images.unsplash.com/photo-1554866585-cd94860890b7', 'active'::public.product_status),
            (bebidas_id, 'BEB-002', 'Jugo Hit Mora 1L', 'Jugo Hit sabor a mora', 3800, 4200, 80, 'https://images.unsplash.com/photo-1622597467836-f3c7ca9d0dc0', 'active'::public.product_status),
            (bebidas_id, 'BEB-003', 'Agua Cristal 600ml', 'Agua sin gas', 1500, 1800, 150, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d', 'active'::public.product_status),
            (bebidas_id, 'BEB-004', 'Colombiana 1.5L', 'Gaseosa Colombiana', 4000, 4500, 90, 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3', 'active'::public.product_status),
            (bebidas_id, 'BEB-005', 'Té Hatsu Durazno', 'Té helado sabor durazno', 3200, 3600, 70, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 'active'::public.product_status),
            (bebidas_id, 'BEB-006', 'Avena Alpina 1L', 'Bebida de avena', 4200, 4600, 65, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', 'active'::public.product_status);

        -- Add products for Carnes category
        INSERT INTO public.products (category_id, sku, name, description, price, original_price, stock_quantity, image_url, status) VALUES
            (carnes_id, 'CAR-001', 'Pechuga de Pollo 1kg', 'Pechuga de pollo sin piel', 15000, 16000, 40, 'https://images.unsplash.com/photo-1587593810167-a84920ea0781', 'active'::public.product_status),
            (carnes_id, 'CAR-002', 'Carne Molida Res 500g', 'Carne molida de res magra', 12000, 13000, 35, 'https://images.unsplash.com/photo-1603048588665-791ca8aea617', 'active'::public.product_status),
            (carnes_id, 'CAR-003', 'Salchicha Ranchera x 10', 'Salchichas rancheras', 8500, 9000, 60, 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f', 'active'::public.product_status),
            (carnes_id, 'CAR-004', 'Chorizo Santarrosano x 6', 'Chorizo santarrosano', 10000, 10500, 45, 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1', 'active'::public.product_status),
            (carnes_id, 'CAR-005', 'Costilla de Cerdo 1kg', 'Costilla de cerdo fresca', 18000, 19000, 25, 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba', 'active'::public.product_status),
            (carnes_id, 'CAR-006', 'Jamón de Pierna 500g', 'Jamón de pierna tajado', 14000, 15000, 30, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93', 'active'::public.product_status);

        -- Add products for Aseo category
        INSERT INTO public.products (category_id, sku, name, description, price, original_price, stock_quantity, image_url, status) VALUES
            (aseo_id, 'ASE-001', 'Jabón Rey 200g', 'Jabón en barra para ropa', 2500, 2800, 100, 'https://images.unsplash.com/photo-1563453392212-326f5e854473', 'active'::public.product_status),
            (aseo_id, 'ASE-002', 'Detergente Ariel 1kg', 'Detergente en polvo', 12000, 13000, 70, 'https://images.unsplash.com/photo-1585933646503-a6f07a0b123b', 'active'::public.product_status),
            (aseo_id, 'ASE-003', 'Suavizante Suavitel 1L', 'Suavizante para ropa', 8500, 9000, 60, 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce', 'active'::public.product_status),
            (aseo_id, 'ASE-004', 'Blanqueador Clorox 1L', 'Blanqueador con cloro', 4500, 5000, 80, 'https://images.unsplash.com/photo-1585421514738-01798e348b17', 'active'::public.product_status),
            (aseo_id, 'ASE-005', 'Limpiapisos Fabuloso 1L', 'Limpiador multiusos lavanda', 7000, 7500, 75, 'https://images.unsplash.com/photo-1585933647252-e6d3f1b2f34c', 'active'::public.product_status),
            (aseo_id, 'ASE-006', 'Papel Higiénico Scott x 12', 'Papel higiénico doble hoja', 18000, 19000, 50, 'https://images.unsplash.com/photo-1584556326561-c8746083993b', 'active'::public.product_status);
    END;
END $$;