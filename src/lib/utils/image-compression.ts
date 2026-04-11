// Image Compression Utility for Form Uploads
// Max 200KB per image, JPEG quality 0.6-0.7, max dimensions 800px

interface CompressionOptions {
  maxSizeKB?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const defaultOptions: CompressionOptions = {
  maxSizeKB: 200,
  maxWidth: 800,
  maxHeight: 800,
  quality: 0.7,
};

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const opts = { ...defaultOptions, ...options };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate new dimensions
        let { width, height } = img;
        const maxW = opts.maxWidth || 800;
        const maxH = opts.maxHeight || 800;

        if (width > maxW) {
          height = (height * maxW) / width;
          width = maxW;
        }

        if (height > maxH) {
          width = (width * maxH) / height;
          height = maxH;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image with white background (for transparency)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }

            // Check if we need further compression
            const sizeKB = blob.size / 1024;
            const maxSize = opts.maxSizeKB || 200;

            if (sizeKB > maxSize && (opts.quality || 0.7) > 0.3) {
              // Recursively compress with lower quality
              const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
              });

              compressImage(newFile, {
                ...opts,
                quality: (opts.quality || 0.7) - 0.1,
              })
                .then(resolve)
                .catch(reject);
            } else {
              // Return compressed file
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, '.jpg'),
                { type: 'image/jpeg' }
              );
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          opts.quality
        );
      };

      img.onerror = () => reject(new Error('Could not load image'));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export async function compressImages(
  files: File[],
  options?: CompressionOptions
): Promise<File[]> {
  const compressed = await Promise.all(
    files.map((file) => compressImage(file, options))
  );
  return compressed;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}
