/*
 * This function returns the first image of the car images array.
 * If the array is empty, it returns a placeholder image.
 */

export default function returnImage(imageUrls: string[]): string {
  const carImages: string[] = Array.isArray(imageUrls) ? imageUrls : [];

  return carImages.length ? carImages[0] : ("/placeholder.svg" as string);
}
