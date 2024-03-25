export const getNameFromId = (id, list) => {
  const item = list?.find((item) => item?.id == id);
  return item ? item?.typeName || item?.name : "";
};

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email.match(regex);
};

export const getNameFromKey = (key, list) => {
  const item = list.find((item) => item.key == key);
  return item ? item.name : "";
};
