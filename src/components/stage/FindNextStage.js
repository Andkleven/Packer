import StagesJson from "components/stage/Stages.json";
import { stringToDictionary } from "components/Functions";
import objectPath from "object-path";

export default (speckData, stage, geometry) => {
  const findNextStage = (speckData, geometry, nextStage) => {
    let stageCriteria = StagesJson[geometry][nextStage];

    let query = objectPath.get(speckData, stageCriteria.queryPath, null);
    if (query === null) {
      return false;
    } else if (!stageCriteria.fieldPath.trim()) {
      return true;
    }
    console.log(query);
    let field = stringToDictionary(query.data)[stageCriteria.fieldPath];
    if (field !== undefined) {
      return true;
    }
    return false;
  };
  let index = StagesJson.all.indexOf(stage);
  let nextStage;
  for (index < StagesJson.all.length; index++; ) {
    nextStage = StagesJson.all[index];
    if (findNextStage(speckData, geometry, nextStage)) {
      return nextStage;
    }
  }
  return null;
};
