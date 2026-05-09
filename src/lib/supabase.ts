import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are properly set (not undefined, null, or empty string)
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseUrl.length > 0 && supabaseAnonKey && supabaseAnonKey.length > 0);

// Only create client if environment variables are properly set
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Check if supabase is available
export function isSupabaseAvailable(): boolean {
  return supabase !== null;
}

// Upload contact form files to contact-uploads bucket
export async function uploadContactFile(file: File): Promise<string> {
  if (!supabase) {
    // Return empty string instead of throwing error - graceful degradation
    console.warn('Supabase is not configured. File upload skipped.');
    return '';
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('contact-uploads')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('contact-uploads')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// Upload project photos to project-photos bucket
export async function uploadProjectPhoto(
  file: File | Blob,
  projectId: number,
  photoName: string
): Promise<string> {
  if (!supabase) {
    console.warn('Supabase is not configured. Project photo upload skipped.');
    return '';
  }

  const fileExt = photoName.split('.').pop() || 'jpg';
  const fileName = `p${projectId}/${photoName}`;

  const { error } = await supabase.storage
    .from('project-photos')
    .upload(fileName, file, {
      cacheControl: '31536000', // 1 year cache
      upsert: true
    });

  if (error) {
    console.error('Project photo upload error:', error);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('project-photos')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// Get public URL for a project photo
export function getProjectPhotoUrl(projectId: number, photoName: string): string {
  if (!supabase) {
    // Fall back to local path
    return `/photos/p${projectId}/${photoName}`;
  }

  const { data } = supabase.storage
    .from('project-photos')
    .getPublicUrl(`p${projectId}/${photoName}`);

  return data.publicUrl;
}

// Upload all local project photos to Supabase (utility function)
export async function migrateLocalPhotosToSupabase(
  localPhotos: { projectId: number; photoName: string; file: File | Blob }[]
): Promise<{ success: string[]; failed: string[] }> {
  const results = { success: [] as string[], failed: [] as string[] };

  if (!supabase) {
    console.warn('Supabase is not configured. Migration skipped.');
    return results;
  }

  for (const photo of localPhotos) {
    try {
      await uploadProjectPhoto(photo.file, photo.projectId, photo.photoName);
      results.success.push(`p${photo.projectId}/${photo.photoName}`);
    } catch (error) {
      results.failed.push(`p${photo.projectId}/${photo.photoName}`);
      console.error(`Failed to upload ${photo.photoName}:`, error);
    }
  }

  return results;
}
