/*
  # Create gallery images table

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `image_url` (text, not null)
      - `description` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `gallery_images` table
    - Add policy for authenticated users to manage gallery images
    - Add policy for public users to view gallery images
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage gallery images"
  ON gallery_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Gallery images are viewable by everyone"
  ON gallery_images
  FOR SELECT
  TO public
  USING (true);