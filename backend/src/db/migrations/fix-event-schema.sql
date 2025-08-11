-- Fix event table schema to have proper NOT NULL constraints and defaults

-- Add NOT NULL constraints and defaults where needed
ALTER TABLE event 
  ALTER COLUMN description SET DEFAULT '',
  ALTER COLUMN description SET NOT NULL;

ALTER TABLE event 
  ALTER COLUMN location SET DEFAULT 'Online',
  ALTER COLUMN location SET NOT NULL;

ALTER TABLE event 
  ALTER COLUMN price SET DEFAULT '0',
  ALTER COLUMN price SET NOT NULL;

-- Update existing null values to proper defaults
UPDATE event SET description = '' WHERE description IS NULL;
UPDATE event SET location = 'Online' WHERE location IS NULL;
UPDATE event SET price = '0' WHERE price IS NULL;
UPDATE event SET tags = '[]'::jsonb WHERE tags IS NULL;

-- Ensure isOnline has proper boolean values
UPDATE event SET is_online = false WHERE is_online IS NULL;
ALTER TABLE event ALTER COLUMN is_online SET NOT NULL;
ALTER TABLE event ALTER COLUMN is_online SET DEFAULT false;