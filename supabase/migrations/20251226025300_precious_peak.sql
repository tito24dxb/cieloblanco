/*
  # Create WhatsApp contacts table

  1. New Tables
    - `whatsapp_contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `reason` (text)
      - `contacted` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `whatsapp_contacts` table
    - Add policies for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS whatsapp_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  reason text NOT NULL,
  contacted boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE whatsapp_contacts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage WhatsApp contacts (admin functionality)
CREATE POLICY "Authenticated users can manage whatsapp contacts"
  ON whatsapp_contacts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_contacted ON whatsapp_contacts(contacted);
CREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_created_at ON whatsapp_contacts(created_at DESC);