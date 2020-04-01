import gql from "graphql-tag";

const ORDER = gql`
  mutation projects($projects: [ProjectInupt]) {
    projects(projects: $projects) {
      new {
        id
        data
        leadEngineerDone
        descriptions {
          id
          data
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

const DELETEITEM = gql`
  mutation itemDelete($id: Int) {
    itemDelete(id: $id) {
      deletet
    }
  }
`;

const UPDATEITEM = gql`
  mutation updateItem(
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
    updateItem(
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

const LEADENGINEER = gql`
  mutation leadEngineers(
    $leadEngineers: [LeadEngineerInupt]
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
        measurementPointActualTvds {
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
            cumulativeThicknes {
              id
              data
            }
          }
        }
      }
    }
  }
`;

const LEADENGINEERDONE = gql`
  mutation projects($project: [ProjectInupt]) {
    projects(project: $project) {
      new {
        leadEngineerDone
      }
    }
  }
`;

const OPERATORBATCHING = gql`
  mutation operatorsBaching(
    $operators: [UnderCategoriesOfLeadEngineerInupt]
    $vulcanizationOperators: [UnderCategoriesOfLeadEngineerInupt]
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
            measurementPointActualTvds {
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
    $operators: [OperatorInupt]
    $stage: String
    $itemId: Int
  ) {
    operators(operators: $operators, stage: $stage, itemId: $itemId) {
      new {
        id
        data
        measurementPointActualTvds {
          id
          data
        }
        vulcanizationOperators {
          id
          data
          coatingOperators {
            id
            data
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

const mutations = {
  ORDER,
  DELETEITEM,
  UPDATEITEM,
  LEADENGINEER,
  LEADENGINEERDONE,
  OPERATORBATCHING,
  OPERATOR
};
export default mutations;
