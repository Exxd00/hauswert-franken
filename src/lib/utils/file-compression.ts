import imageCompression from 'browser-image-compression';

/**
 * Compress an image file
 * @param file - The image file to compress
 * @returns Compressed image file
 */
export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1, // Max file size in MB
    maxWidthOrHeight: 1920, // Max width or height
    useWebWorker: true,
    fileType: file.type as 'image/jpeg' | 'image/png' | 'image/webp',
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(file, options);

    // Create a new File with the original name
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error('Image compression failed:', error);
    // Return original file if compression fails
    return file;
  }
}

/**
 * Check if a file is an image
 * @param file - The file to check
 * @returns true if the file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Check if a file is a PDF
 * @param file - The file to check
 * @returns true if the file is a PDF
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Compress a file (images are compressed, PDFs are returned as-is for now)
 * @param file - The file to compress
 * @param onProgress - Optional progress callback
 * @returns Compressed file
 */
export async function compressFile(
  file: File,
  onProgress?: (progress: string) => void
): Promise<File> {
  if (isImageFile(file)) {
    onProgress?.(`Komprimiere ${file.name}...`);
    const originalSize = file.size;
    const compressedFile = await compressImage(file);
    const newSize = compressedFile.size;
    const savedPercent = Math.round((1 - newSize / originalSize) * 100);

    if (savedPercent > 0) {
      console.log(`Compressed ${file.name}: ${formatFileSize(originalSize)} → ${formatFileSize(newSize)} (${savedPercent}% saved)`);
    }

    return compressedFile;
  }

  // For PDFs and other files, return as-is
  // Note: Client-side PDF compression is complex and would require additional libraries
  return file;
}

/**
 * Compress multiple files
 * @param files - Array of files to compress
 * @param onProgress - Optional progress callback
 * @returns Array of compressed files
 */
export async function compressFiles(
  files: File[],
  onProgress?: (progress: string) => void
): Promise<File[]> {
  const compressedFiles: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(`Komprimiere Datei ${i + 1}/${files.length}...`);
    const compressedFile = await compressFile(file, onProgress);
    compressedFiles.push(compressedFile);
  }

  return compressedFiles;
}

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
