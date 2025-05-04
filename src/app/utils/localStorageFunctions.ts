export const getItem = (itemName: string) => {
  const item = localStorage.getItem(itemName)
  return item ? item : null
}

export const removeItem = (itemName: string) => {
  localStorage.remove(itemName);
}

export const setItem = (itemName: string, content: string) => {
  localStorage.setItem(itemName, content);
}