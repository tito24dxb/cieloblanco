/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `product_id` (uuid, foreign key)
      - `desired_quantity` (bigint, nullable)
      - `contacted` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `leads` table
    - Add policies for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id),
  desired_quantity bigint,
  contacted boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage leads (admin functionality)
CREATE POLICY "Authenticated users can manage leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_contacted ON leads(contacted);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_product_id ON leads(product_id);