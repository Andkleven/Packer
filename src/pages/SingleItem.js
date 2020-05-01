import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import query from "graphql/leadEngineer/Query";
import operatorCoatedItemJson from "templates/OperatorCoatedItem.json";
import operatorMouldJson from "templates/OperatorMould.json";
import Form from "components/form/Form";
import Paper from "components/layout/Paper";
import PaperStack from "components/layout/PaperStack";
import {
  objectifyQuery,
  formDataStructure,
  coatedItemORMould
} from "functions/general";

export default pageInfo => {
  const { itemId, geometry } = pageInfo.match.params;
  const [reRender, setReRender] = useState(false);
  const [fixedData, setFixedData] = useState(null);
  let operatorJson = coatedItemORMould(
    geometry,
    operatorCoatedItemJson,
    operatorMouldJson
  );

  const { loading, error, data } = useQuery(query[operatorJson.query], {
    variables: { id: itemId }
  });
  useEffect(() => {
    setFixedData(objectifyQuery(data));
  }, [loading, error, data, reRender]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <PaperStack>
      <Paper>
        <Form
          componentsId={"SingleItem"}
          document={operatorJson}
          reRender={() => setReRender(!reRender)}
          data={fixedData && formDataStructure(fixedData, "items.0.operators")}
          speckData={
            fixedData && formDataStructure(fixedData, "items.0.leadEngineers")
          }
          stage={fixedData && fixedData.items[0].stage}
          geometry={geometry}
          getQueryBy={itemId}
          itemId={itemId}
          sendItemId={true}
          saveButton={true}
        />
      </Paper>
    </PaperStack>
  );
};