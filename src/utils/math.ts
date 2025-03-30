export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const wrapAround = (value: number, min: number, max: number): number => {
  if (value < min) {
    return max;
  }

  if (value > max) {
    return min;
  }

  return value;
};

export const getIndexFromPercentage = <T>(a: T[], perc: number): number => {
  return Math.floor((a.length - 1) * perc);
}

export const getPercentageFromRange = (value: number, min: number, max: number) => {
  const actualValue = clamp(value, min, max);
  return (actualValue - min) / (max - min);
}
