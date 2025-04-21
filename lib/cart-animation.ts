export function flyToCart(imageEl: HTMLImageElement, cartEl: HTMLElement) {
  const rect = imageEl.getBoundingClientRect();
  const cartRect = cartEl.getBoundingClientRect();

  const clone = imageEl.cloneNode(true) as HTMLImageElement;
  clone.style.position = "fixed";
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.transition = "all 0.7s ease-in-out";
  clone.style.zIndex = "9999";

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.left = `${cartRect.left}px`;
    clone.style.top = `${cartRect.top}px`;
    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = "0.3";
  });

  setTimeout(() => document.body.removeChild(clone), 700);
}
