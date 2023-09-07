const getObjectValueWithStringPath = (data, path: string) => {
  if(!!!path) return ""
  let getKeys = path.split(".");
  let value = data;
  if (!!!getKeys || !!!data) {
    return "{not Found}";
  }
  for (const key of getKeys) {
    if (key !== "") {
      if (value?.hasOwnProperty(key)) {
        value = value[key];
      } else {
        const getInputIndex = parseInt(key.replace(/\D/g, ""));
        value = value?.[getInputIndex];
      }
    }
  }
  return value;
};
module.exports= { getObjectValueWithStringPath };
