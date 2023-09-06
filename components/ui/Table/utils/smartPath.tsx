var findPath: boolean = false;
var indexFind = 0;
var pathFind = "base";
var currentPath = "";

export function findNestedValue(
  orgObject: object,
  data: object,
  paths: string[]
) {
  for (const key in data) {
    // debugger
    if (findPath) {
      return pathFind;
    }
    let pathIsAdded = false;
    if (key == paths[indexFind]) {
      currentPath += "." + key;
      pathFind = currentPath;
      if (indexFind + 1 == paths.length) {
        findPath = true;
        return pathFind;
      }
      pathIsAdded = true;
      indexFind++;
    }
    if (typeof data[key] == "object") {
      // if(key==="type")
      if (!pathIsAdded) {
        getObjectOrStringFormat(key, data);
      }
      return findNestedValue(orgObject, data[key], paths);
    } else {
      // debugger
      let editPath = currentPath.split(".");
      
      let lastKey = Object.keys(data).pop();
      if (lastKey == key) {
        let a =editPath.slice(-1)[0]
        const isArray = a.includes("[",0);
        // debugger
        if (isArray) {
          const getInputIndex = parseInt(
            editPath.slice(-1)[0].replace(/\D/g, "")
            );
            const objectValue = getObjectValueWithStringPath(
              orgObject,
              currentPath
              );
          let objectValueLength = objectValue.length;
          if (getInputIndex < objectValueLength - 1) {
            let incressIndex = getInputIndex;
            editPath.pop();
            currentPath = editPath.toString().replaceAll(",", ".");
            currentPath += `.[${incressIndex}]`;
            // getObjectOrStringFormat(key, data);
            return findNestedValue(orgObject, objectValue, paths);
          } else {
            editPath.pop();
            currentPath = editPath.toString().replaceAll(",", ".");
          }
        }
        editPath.pop();
        return findNestedValue(orgObject, data[key], paths);
      }
    }
  }
  return pathFind;
}

function getObjectValueWithStringPath(data, path: string) {
  let getKeys = path.split(".");
  getKeys.pop();
  getKeys.pop();

  let value = data;

  for (const key of getKeys) {
    if (key !== "") {
      if (value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        const getInputIndex = parseInt(key.replace(/\D/g, ""));
        value = value[getInputIndex];
      }
    }
  }
  return value;
}

function getObjectOrStringFormat(key: string, data: any): void {
  if (Array.isArray(data)) {
    currentPath += `.[${key}]`;
  } else {
    currentPath += "." + key;
  }
}
