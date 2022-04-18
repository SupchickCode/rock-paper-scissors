export const getRandomStr = (): string => {
    return (Math.random() + 1).toString(36).substring(2);
}

export const getRandomToken = (): string => {
    return getRandomStr() + getRandomStr() + getRandomStr();
}