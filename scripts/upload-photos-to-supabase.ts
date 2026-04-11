/**
 * Script to upload all local project photos to Supabase storage
 * Run with: bunx tsx scripts/upload-photos-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'node:fs';
import * as path from 'node:path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PHOTOS_DIR = path.join(process.cwd(), 'public', 'photos');
const BUCKET_NAME = 'project-photos';

async function uploadPhoto(localPath: string, remotePath: string): Promise<boolean> {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(remotePath, blob, {
        cacheControl: '31536000',
        upsert: true,
        contentType: 'image/jpeg'
      });

    if (error) {
      console.error(`Failed to upload ${remotePath}:`, error.message);
      return false;
    }

    console.log(`Uploaded: ${remotePath}`);
    return true;
  } catch (err) {
    console.error(`Error uploading ${remotePath}:`, err);
    return false;
  }
}

async function main() {
  console.log('Starting photo upload to Supabase...');
  console.log(`Source: ${PHOTOS_DIR}`);
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log('---');

  const projectFolders = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
  let successCount = 0;
  let failCount = 0;

  for (const folder of projectFolders) {
    const folderPath = path.join(PHOTOS_DIR, folder);

    if (!fs.existsSync(folderPath)) {
      console.log(`Skipping ${folder} (folder not found)`);
      continue;
    }

    const files = fs.readdirSync(folderPath).filter(f =>
      f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
    );

    console.log(`\nProcessing ${folder}: ${files.length} files`);

    for (const file of files) {
      const localPath = path.join(folderPath, file);
      const remotePath = `${folder}/${file}`;

      const success = await uploadPhoto(localPath, remotePath);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }
  }

  console.log('\n---');
  console.log(`Upload complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);

  // Generate new photo URLs
  console.log('\n--- New Photo URLs ---');
  for (const folder of projectFolders) {
    const folderPath = path.join(PHOTOS_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath).filter(f =>
      f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
    );

    if (files.length > 0) {
      console.log(`\n${folder}:`);
      for (const file of files) {
        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(`${folder}/${file}`);
        console.log(`  ${file}: ${data.publicUrl}`);
      }
    }
  }
}

main().catch(console.error);
