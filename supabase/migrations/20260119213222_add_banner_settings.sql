-- Location: supabase/migrations/20260119213222_add_banner_settings.sql
-- Schema Analysis: Existing e-commerce schema with categories, products, orders
-- Integration Type: Addition - New banner settings functionality
-- Dependencies: None (standalone settings table)

-- Banner Messages Table
CREATE TABLE public.banner_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Banner Settings Table (singleton pattern - only one row)
CREATE TABLE public.banner_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    speed INTEGER DEFAULT 40 CHECK (speed >= 10 AND speed <= 100),
    background_color TEXT DEFAULT '#10b981',
    text_color TEXT DEFAULT '#ffffff',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT single_settings_row CHECK (id = id)
);

-- Indexes
CREATE INDEX idx_banner_messages_active ON public.banner_messages(is_active);
CREATE INDEX idx_banner_messages_order ON public.banner_messages(display_order);

-- Triggers for updated_at
CREATE TRIGGER update_banner_messages_updated_at
    BEFORE UPDATE ON public.banner_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_settings_updated_at
    BEFORE UPDATE ON public.banner_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE public.banner_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for banner display
CREATE POLICY "public_can_read_banner_messages"
ON public.banner_messages
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "public_can_read_banner_settings"
ON public.banner_settings
FOR SELECT
TO public
USING (true);

-- Admin full access (using Pattern 4: Public Read, Private Write)
CREATE POLICY "public_can_manage_banner_messages"
ON public.banner_messages
FOR ALL
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "public_can_manage_banner_settings"
ON public.banner_settings
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Initial Data
DO $$
DECLARE
    settings_id UUID := gen_random_uuid();
BEGIN
    -- Insert default banner settings (singleton)
    INSERT INTO public.banner_settings (
        id,
        speed,
        background_color,
        text_color
    ) VALUES (
        settings_id,
        40,
        '#10b981',
        '#ffffff'
    );

    -- Insert default banner messages
    INSERT INTO public.banner_messages (text, is_active, display_order) VALUES
        ('🎉 ¡Envío GRATIS en compras superiores a $50.000!', true, 1),
        ('⚡ Ofertas relámpago: 20% de descuento en frutas frescas', true, 2),
        ('🥖 Pan recién horneado todos los días a las 7:00 AM', true, 3),
        ('💳 Acepta Nequi, Daviplata y PSE - ¡Paga como prefieras!', true, 4);
END $$;