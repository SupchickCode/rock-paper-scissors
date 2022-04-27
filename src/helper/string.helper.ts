export const getRandomStr = (): string => {
    let result = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 10; i++)
      result += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return result;
}

export const getRandomToken = (): string => {
    return getRandomStr() + getRandomStr() + getRandomStr();
}