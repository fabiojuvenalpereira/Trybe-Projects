const setDataToLocalStorage = (data, identificationkey) => {
  localStorage.setItem(identificationkey, JSON.stringify(data));
  return true;
};

export default setDataToLocalStorage;
