import objectPath from "object-path";

export const stringToDictionary = data => {
  if (typeof data === "string") {
    return JSON.parse(data.replace(/'/g, '"'));
  }
};

export const getDataFromQuery = (data, path, field) => {
  if (!data) {
    return null;
  }
  let stringFields = objectPath.get(data, path);
  if (!stringFields) {
    return null;
  }
  let fields = stringToDictionary(stringFields.data);
  if (!fields) {
    return null;
  }
  return fields[field];
};

export const sumFieldInObject = (object, key) => {
  let total = 0;
  Object.values(object).forEach(value => {
    total += Number(value[key]);
  });
  return total;
};

export const getValue = (value, queryName, indexNumber, fieldName) => {
  let test;
  Object.keys(value).forEach(key => {
    if (
      value[key][queryName] &&
      value[key][queryName][indexNumber] !== undefined &&
      value[key][queryName][indexNumber][fieldName] !== undefined
    ) {
      test = value[key][queryName][indexNumber][fieldName];
    }
  });
  return test;
};

export const getLastObjectValue = (object, key) => {
  return object[Object.values(object).length - 1][key];
};

export const allFalse = element => !element;

export const allTrue = element => element;

export const allZeroOrNaN = element => element === 0 || isNaN(element);

export const removeSpace = string => string.replace(/\s/g, "");

export const emptyObject = objectToCheck =>
  Object.entries(objectToCheck).length === 0;

export const removeEmptyValueFromObject = object => {
  Object.keys(object).forEach(key => {
    if ([null, undefined, ""].includes(object[key])) {
      delete object[key];
    }
  });
};

export const variableString = (variable, string) => {
  let newString;
  if ([undefined, null, ""].includes(variable)) {
    newString = string.replace("{", "");
    newString = newString.replace("}", "");
  } else {
    let firstName = string.split("{")[0];
    let lastName = string.split("}")[string.split("}").length - 1];

    newString = firstName + variable + lastName;
  }
  return newString;
};

export const variableLabel = (
  label,
  value = undefined,
  indexVariableLabel = undefined,
  repeatStep = undefined,
  queryNameVariableLabel = undefined,
  fieldNameVariableLabel = undefined,
  index = undefined
) => {
  if (!label) {
    return "";
  }
  let variableLabel = undefined;
  if (index === undefined) {
    variableLabel = getValue(
      value,
      queryNameVariableLabel,
      indexVariableLabel ? repeatStep + indexVariableLabel : repeatStep,
      fieldNameVariableLabel
    );
  } else {
    variableLabel = index;
  }
  return variableString(variableLabel, label);
};

export const variableSubtext = (
  subtext,
  data,
  routToSpeckSubtext,
  fieldSpeckSubtext
) => {
  let variable;
  if (routToSpeckSubtext && fieldSpeckSubtext) {
    variable = getDataFromQuery(data, routToSpeckSubtext, fieldSpeckSubtext);
  }
  return variableString(variable, subtext);
};

export const getSubtext = (
  subtext,
  data,
  routToSpeckSubtext,
  fieldSpeckSubtext,
  max,
  min,
  maxInput,
  minInput,
  unit,
  required
) => {
  if (subtext) {
    return variableSubtext(
      subtext,
      data,
      routToSpeckSubtext,
      fieldSpeckSubtext
    );
  }
  let minLocal = min ? min : minInput ? minInput : "";
  let maxLocal = max ? max : maxInput ? maxInput : "";

  let minString = minLocal === "" ? "" : `Min: ${minLocal}`;
  let maxString = maxLocal === "" ? "" : `Max: ${maxLocal}`;

  let unitString = unit ? `${unit} ` : " ";

  minString = minString ? minString + unitString : "";
  maxString = maxString ? maxString + unitString : "";

  let requiredString = required ? "Required" : "";

  return minString + maxString + requiredString;
};

export const expandJson = json => {
  if (json) {
    json.projects &&
      json.projects.map(project => {
        project.data = stringToDictionary(project.data);
        project.descriptions &&
          project.descriptions.map(description => {
            description.data = stringToDictionary(description.data);
            description.items &&
              description.items.map(item => {
                item.data = stringToDictionary(item.data);
                return true;
              });
            return true;
          });
        return true;
      });
  }
  return json;
};

export const searchProjects = (data, term) => {
  term = term.toLowerCase();
  let results = [];
  if (data) {
    const findAllProjects = data => {
      if (data.projects) {
        const projects = data.projects;
        return projects;
      }
    };

    const projects = findAllProjects(data);

    const hasChildren = element => {
      const isNonEmptyObject =
        element.constructor === Object && Object.entries(element).length > 0;
      const isNonEmptyArray =
        Array.isArray(element) &&
        element.length > 0 &&
        typeof element !== "string";
      if (isNonEmptyObject || isNonEmptyArray) {
        return true;
      }
      return false;
    };

    const elementOrChildrenMatches = (element, term) => {
      let match = false;

      const recurse = (element, term) => {
        if (match === true) {
          // May not be necessary
          return;
        } else {
          if (
            typeof element === "string" &&
            element.toLowerCase().includes(term)
          ) {
            match = true;
            return;
          } else if (hasChildren(element)) {
            element = Object.entries(element);
            element.forEach(child => {
              const childElement = child[1];
              recurse(childElement, term);
            });
          }
        }
      };

      recurse(element, term);

      return match;
    };

    const getMatchingProjects = (projects, term) => {
      if (projects) {
        projects.forEach(project => {
          if (elementOrChildrenMatches(project, term)) {
            results.push(project);
          }
        });
      }
    };

    getMatchingProjects(projects, term);
  }
  return results;
};

export const validaFieldWithValue = (validation, data) => {
  Object.keys(validation).forEach(key => {
    let paths = key.split("-");
    if (data[paths[0]][paths[1]][paths[2]].trim() && !validation[key]) {
      return false;
    }
  });
};

export const calculateMaxMin = (
  min,
  routToSpeckMin,
  fieldSpeckMin,
  max,
  routToSpeckMax,
  fieldSpeckMax,
  data
) => {
  let newMin;
  let newMax;
  if (routToSpeckMin && fieldSpeckMin) {
    newMin = getDataFromQuery(data, routToSpeckMin, fieldSpeckMin);
  } else {
    newMin = min;
  }
  if (routToSpeckMax && fieldSpeckMax) {
    newMax = getDataFromQuery(data, routToSpeckMax, fieldSpeckMax);
  } else {
    newMax = max;
  }
  return { min: newMin, max: newMax };
};
