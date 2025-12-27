/*
  # Create site_settings table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Setting identifier (e.g., 'logo', 'brand_name')
      - `value` (text) - Setting value (e.g., URL, text content)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `site_settings` table
    - Add policy for public read access
    - Add policy for authenticated users to manage settings

  3. Initial Data
    - Insert default logo setting
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site settings
CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage site settings
CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups by key
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings (key);

-- Insert default logo setting
INSERT INTO site_settings (key, value) 
VALUES ('logo', 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop')
ON CONFLICT (key) DO NOTHING;