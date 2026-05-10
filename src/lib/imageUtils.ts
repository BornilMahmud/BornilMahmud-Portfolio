/**
 * Converts cloud share links (Google Drive, OneDrive) to direct-embeddable image URLs.
 * Paste any share link — this function extracts the file ID and returns a direct URL.
 */
export function convertImageUrl(url: string): string {
  if (!url || url.trim() === '') return url;

  // ── Google Drive ──────────────────────────────────────────────────────────
  // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // https://drive.google.com/file/d/FILE_ID/preview
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // https://drive.google.com/open?id=FILE_ID
  const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch) {
    return `https://lh3.googleusercontent.com/d/${driveOpenMatch[1]}`;
  }

  // https://drive.google.com/uc?id=FILE_ID  (already a direct-ish link)
  const driveUcMatch = url.match(/drive\.google\.com\/uc\?(?:.*&)?id=([a-zA-Z0-9_-]+)/);
  if (driveUcMatch) {
    return `https://lh3.googleusercontent.com/d/${driveUcMatch[1]}`;
  }

  // ── OneDrive ──────────────────────────────────────────────────────────────
  // https://1drv.ms/i/s!... shortlink — embed directly via iframe trick; best effort
  // https://onedrive.live.com/embed?cid=...&resid=...
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
    // Convert share URL to embeddable thumbnail URL
    const encoded = btoa(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `https://api.onedrive.com/v1.0/shares/u!${encoded}/root/content`;
  }

  // No conversion needed — return as-is
  return url;
}

/**
 * Detects if a URL is a Google Drive or OneDrive share link.
 */
export function isShareLink(url: string): boolean {
  if (!url) return false;
  return (
    url.includes('drive.google.com') ||
    url.includes('1drv.ms') ||
    url.includes('onedrive.live.com')
  );
}
