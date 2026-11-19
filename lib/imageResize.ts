/** Browser-only: shrinks big photos before upload so they stay well under the size limit. */
export async function prepareImage(file: File, maxSide = 2000): Promise<File> {
  if (file.type === "image/svg+xml") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const needsResize = scale < 1;
  const keepPng = file.type === "image/png";
  // small files that don't need resizing are uploaded as they are
  if (!needsResize && file.size < 1.5 * 1024 * 1024) {
    bitmap.close();
    return file;
  }
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const type = keepPng ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, type, 0.85));
  if (!blob) return file;
  const ext = keepPng ? "png" : "jpg";
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + "." + ext, { type });
}
