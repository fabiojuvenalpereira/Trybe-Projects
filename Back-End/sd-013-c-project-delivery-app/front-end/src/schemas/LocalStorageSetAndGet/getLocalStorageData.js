const getDataFromLocalStorage = (identityKey) => {
  const foundData = JSON.parse(localStorage.getItem(identityKey));
  return foundData;
};

export default getDataFromLocalStorage;
