/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `price` (bigint, in cents)
      - `currency` (text, default 'MXN')
      - `sale_method` (text)
      - `mercado_libre_url` (text, nullable)
      - `payment_methods` (jsonb)
      - `specifications` (jsonb)
      - `stock` (bigint, default 0)
      - `is_out_of_stock` (boolean, default false)
      - `combination_type` (text, nullable)
      - `combined_product_id` (uuid, nullable)
      - `shipping_price` (bigint, default 0)
      - `shipping_carrier` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  price bigint NOT NULL,
  currency text NOT NULL DEFAULT 'MXN',
  sale_method text NOT NULL CHECK (sale_method IN ('internal', 'mercadoLibre', 'both')),
  mercado_libre_url text,
  payment_methods jsonb NOT NULL DEFAULT '{"creditCard": true, "cash": false, "transfer": false}',
  specifications jsonb NOT NULL DEFAULT '{}',
  stock bigint NOT NULL DEFAULT 0,
  is_out_of_stock boolean NOT NULL DEFAULT false,
  combination_type text CHECK (combination_type IN ('bundle', 'customization')),
  combined_product_id uuid REFERENCES products(id),
  shipping_price bigint NOT NULL DEFAULT 0,
  shipping_carrier text CHECK (shipping_carrier IN ('FedEx', 'DHL', 'Estafeta', 'Redpack', 'UPS', 'Paqueteexpress', 'Minutos99', 'JTExpress')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage products (admin functionality)
CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_is_out_of_stock ON products(is_out_of_stock);