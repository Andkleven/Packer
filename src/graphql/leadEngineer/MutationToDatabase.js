import gql from "graphql-tag";

const ORDER = gql`
  mutation projects($projects: [ProjectInput]) {
    projects(projects: $projects) {
      new {
        id
        data
        leadEngineerDone
        descriptions {
          id
          data
          items {
            id
            itemId
            different
          }
          uploadFiles {
            id
            file
            fileDescription
          }
        }
      }
    }
  }
`;

const DELETE_ITEM = gql`
  mutation itemDelete($id: Int) {
    itemDelete(id: $id) {
      deleted
    }
  }
`;

const ITEM = gql`
  mutation item(
    $id: Int
    $itemId: String
    $different: Boolean
    $qrCode: String
    $repair: Boolean
    $operatorDone: Boolean
    $qualityControlDone: Boolean
    $stage: String
    $foreignKey: Int
  ) {
    item(
      id: $id
      itemId: $itemId
      stage: $stage
      different: $different
      qrCode: $qrCode
      repair: $repair
      operatorDone: $operatorDone
      qualityControlDone: $qualityControlDone
      foreignKey: $foreignKey
    ) {
      new {
        id
        itemId
        different
        qrCode
        repair
        operatorDone
        qualityControlDone
        stage
      }
    }
  }
`;

const LEAD_ENGINEER = gql`
  mutation leadEngineers(
    $leadEngineers: [LeadEngineerInput]
    $descriptionId: Int
    $itemId: Int
  ) {
    leadEngineers(
      leadEngineers: $leadEngineers
      descriptionId: $descriptionId
      itemId: $itemId
    ) {
      new {
        id
        data
        measurementPointActualTdvs {
          id
          data
        }
        rubberCements {
          id
          data
        }
        vulcanizationSteps {
          id
          data
          coatingLayers {
            id
            data
            cumulativeThickness {
              id
              data
            }
          }
        }
      }
    }
  }
`;

const LEAD_ENGINEER_DONE = gql`
  mutation projects($project: [ProjectInput]) {
    projects(project: $project) {
      new {
        leadEngineerDone
      }
    }
  }
`;

const OPERATOR_BATCHING = gql`
  mutation operatorsBaching(
    $operators: [UnderCategoriesOfLeadEngineerInput]
    $vulcanizationOperators: [UnderCategoriesOfLeadEngineerInput]
    $itemIdList: [Int]!
    $stage: String
  ) {
    operatorsBaching(
      operators: $operators
      vulcanizationOperators: $vulcanizationOperators
      itemIdList: $itemIdList
      stage: $stage
    ) {
      batching {
        id
        data
        items {
          id
          itemId
          stage
          operators {
            id
            data
            measurementPointActualTdvs {
              id
              data
            }
            vulcanizationOperators {
              id
              data
              coatingOperators {
                id
                data
                mixDates {
                  id
                  data
                }
                measurementPointOperators {
                  id
                  data
                }
              }
              measurementPointOperators {
                id
                data
              }
            }
          }
        }
      }
    }
  }
`;

const OPERATOR = gql`
  mutation operators(
    $operators: [OperatorInput]
    $stage: String
    $itemId: Int
  ) {
    operators(operators: $operators, stage: $stage, itemId: $itemId) {
      new {
        id
        data
        measurementPointActualTdvs {
          id
          data
        }
        vulcanizationOperators {
          id
          data

          coatingOperators {
            id
            data
            mixDates {
              id
              data
            }
            measurementPointOperators {
              id
              data
            }
          }
          measurementPointOperators {
            id
            data
          }
        }
      }
    }
  }
`;
const QUALITY_CONTROL = gql`
  mutation finalInspectionQualityControls(
    $finalInspectionQualityControls: [UnderCategoriesOfLeadEngineerInput]
    $itemId: Int
  ) {
    finalInspectionQualityControls(
      finalInspectionQualityControls: $finalInspectionQualityControls
      itemId: $itemId
    ) {
      new {
        id
        data
        id
        data
        measurementPointQualityControls {
          id
          data
        }
        hardnessQualityControls {
          id
          data
        }
        peelTestQualityControls {
          id
          data
        }
        uploadFiles {
          id
          file
          fileDescription
        }
      }
    }
  }
`;

const mutations = {
  ORDER,
  DELETE_ITEM,
  ITEM,
  LEAD_ENGINEER,
  LEAD_ENGINEER_DONE,
  OPERATOR_BATCHING,
  OPERATOR,
  QUALITY_CONTROL
};
export default mutations;
