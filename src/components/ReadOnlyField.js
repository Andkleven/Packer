import React, { useContext, useEffect, useState } from "react";
import { DocumentDateContext } from "./DocumentAndSubmit";
import Math from "./Math";
import objectPath from "object-path";
import ReadField from "./ReadField";

import "../styles/styles.css";

export default props => {
  const documentDateContext = useContext(DocumentDateContext);
  const [showMinMax, setShowMinMax] = useState(false); // if true show error message befor submit
  // Test if value shall update when documentDate update
  useEffect(() => {
    let temporaryValue = props.setValueByIndex
      ? props.repeatStep + 1
      : props.math
      ? Math[props.math](
          documentDateContext.documentDate,
          props.repeatStep,
          props.decimal ? props.decimal : 0
        )
      : props.state[props.fieldName];
    if (temporaryValue !== null && !showMinMax) {
      setShowMinMax(true);
    }
    if (
      objectPath.get(documentDateContext.documentDate, props.path) !==
      props.state[props.fieldName]
    ) {
      documentDateContext.setDocumentDate(prevState => {
        objectPath.set(prevState, props.path, temporaryValue);
      });
    }
  }, [documentDateContext.documentDate]);

  return (
    <ReadField
      {...props}
      key={props.indexId}
      submit={true}
      value={objectPath.get(documentDateContext.documentDate, props.path)}
      showMinMax={showMinMax}
    />
  );
};
