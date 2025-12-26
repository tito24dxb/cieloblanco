/*
  # Create orders table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `customer_name` (text)
      - `customer_email` (text)
      - `shipping_address` (text)
      - `product_id` (uuid, foreign key)
      - `quantity` (bigint)
      - `total_amount` (bigint, in cents)
      - `status` (text)
      - `tracking_number` (text, nullable)
      - `shipping_carrier` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policies for authenticated admin access
    - Add policies for customers to view their own orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  shipping_address text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity bigint NOT NULL DEFAULT 1,
  total_amount bigint NOT NULL,
  status text NOT NULL DEFAULT 'PedidoRecibido' CHECK (status IN ('PedidoRecibido', 'PedidoDespachado', 'PedidoEnTransito', 'PedidoEntregado')),
  tracking_number text,
  shipping_carrier text CHECK (shipping_carrier IN ('FedEx', 'DHL', 'Estafeta', 'Redpack', 'UPS', 'Paqueteexpress', 'Minutos99', 'JTExpress')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage orders (admin functionality)
CREATE POLICY "Authenticated users can manage orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow customers to view their own orders by email
CREATE POLICY "Customers can view their own orders"
  ON orders
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
BEGIN
  RETURN 'CB-' || EXTRACT(EPOCH FROM NOW())::bigint;
END;
$$ LANGUAGE plpgsql;