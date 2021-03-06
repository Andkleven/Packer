import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import query from "graphql/query";
import operatorCoatedItemJson from "templates/coatedItem/operatorCoatedItem.json";
import operatorMouldJson from "templates/mould/operatorMould.json";
import leadEngineersCoatedItemJson from "templates/coatedItem/leadEngineerCoatedItem.json";
import leadEngineersMouldJson from "templates/mould/leadEngineerMould.json";
import Form from "components/form/Form";
import Paper from "components/layout/Paper";
import {
  objectifyQuery,
  formDataStructure,
  coatedItemOrMould
} from "functions/general";
import Title from "components/design/fonts/Title";
import Canvas from "components/layout/Canvas";
import { ItemContext } from "components/contexts/ItemContext";
import { getAccess } from "functions/user.ts";

export default pageInfo => {
  const { itemId, geometry } = pageInfo.match.params;
  const [reRender, setReRender] = useState(false);
  const [fixedData, setFixedData] = useState(null);
  let operatorJson = coatedItemOrMould(
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

  const stage = fixedData && fixedData.items && fixedData.items[0].stage;

  const { item, setItem } = useContext(ItemContext);

  useEffect(() => {
    if (item.id === null) {
      setItem({
        id: fixedData ? fixedData["items"][0]["id"] : null,
        stage: fixedData ? fixedData["items"][0]["stage"] : null,
        name: fixedData ? fixedData["items"][0]["itemId"] : null,
        description: null
      });
    }
  });

  return (
    <Canvas>
      {getAccess()["specs"] && (
        <Paper className="mb-3">
          <Title big align="center">
            Lead Engineer
          </Title>

          <Form
            componentsId={"leadEngineersPage"}
            document={coatedItemOrMould(
              geometry,
              leadEngineersCoatedItemJson,
              leadEngineersMouldJson
            )}
            reRender={() => setReRender(!reRender)}
            data={
              fixedData && formDataStructure(fixedData, "items.0.leadEngineers")
            }
            getQueryBy={itemId}
            itemId={itemId}
            sendItemId={true}
          />
        </Paper>
      )}
      <Paper>
        {getAccess()["specs"] && (
          <Title big align="center">
            Operator
          </Title>
        )}
        <Form
          componentsId={"SingleItem"}
          document={operatorJson}
          reRender={() => setReRender(!reRender)}
          data={fixedData && formDataStructure(fixedData, "items.0.operators")}
          specData={
            fixedData && formDataStructure(fixedData, "items.0.leadEngineers")
          }
          // edit={getAccess()["itemEdit"]}
          edit={true}
          readOnlySheet={!getAccess()["itemWrite"]}
          stage={stage}
          geometry={geometry}
          getQueryBy={itemId}
          itemId={itemId}
          sendItemId={true}
          saveButton={true}
        />
      </Paper>
    </Canvas>
  );
};
