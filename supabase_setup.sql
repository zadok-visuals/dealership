-- 1. CREATE THE CARS TABLE
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price BIGINT NOT NULL,
    mileage INTEGER NOT NULL,
    transmission TEXT NOT NULL,
    fuel_type TEXT NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'Available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- 3. CREATE POLICIES (Public Read, Anyone can Insert for this demo)
-- Note: In a production app, you would restrict INSERT/UPDATE/DELETE to authenticated admins.
DROP POLICY IF EXISTS "Allow Public Read" ON public.cars;
CREATE POLICY "Allow Public Read" ON public.cars FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow Public Insert" ON public.cars;
CREATE POLICY "Allow Public Insert" ON public.cars FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow Public Update" ON public.cars;
CREATE POLICY "Allow Public Update" ON public.cars FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow Public Delete" ON public.cars;
CREATE POLICY "Allow Public Delete" ON public.cars FOR DELETE USING (true);

-- 4. STORAGE SETUP
-- First, manually create a bucket named 'cars' in the Supabase Storage Dashboard and set it to PUBLIC.
-- If you want to use SQL for storage (requires higher permissions):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('cars', 'cars', true) ON CONFLICT (id) DO NOTHING;

-- 5. STORAGE POLICIES (Allow anyone to upload/read for this demo)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'cars');
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cars');
