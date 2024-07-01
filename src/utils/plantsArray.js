export const plantsArray = [
  ...Array.from(
    { length: 7 },
    (_, i) => `${import.meta.env.VITE_IMAGE_BUCKET}/plants/plant_${i + 1}.png`
  ),
];

export const randomImage = () => {
  return plantsArray[Math.floor(Math.random() * 7)];
};
