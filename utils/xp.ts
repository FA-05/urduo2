export const calculateLevel = (totalXP: number): number => {
  if (totalXP < 100) return 1;
  return Math.floor(Math.sqrt(totalXP / 100)) + 1;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

export const getLevelProgress = (totalXP: number): { currentLevel: number; xpProgress: number; xpRequired: number } => {
  const currentLevel = calculateLevel(totalXP);
  const xpForCurrentLevel = currentLevel === 1 ? 0 : getXPForNextLevel(currentLevel - 1);
  const xpForNextLevel = getXPForNextLevel(currentLevel);

  const xpRequired = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = totalXP - xpForCurrentLevel;

  return { currentLevel, xpProgress, xpRequired };
};