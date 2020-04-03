import React, { useContext } from "react";
import objectPath from "object-path";
import FeildProperties from "components/FeildProperties";
import Page from "./Page";
import { DocumentDateContext } from "./DocumentAndSubmit";
import Line from "./Line";
import { findValue } from "./Functions";

export default props => {
  const documentDateContext = useContext(DocumentDateContext);
  return props.fields.map((field, index) => {
    if (
      field.showFieldSpackPath &&
      [null, undefined, "", false].includes(
        findValue(
          props.speckData,
          field.showFieldSpackPath,
          props.repeatStepList,
          field.editRepeatStepValueList
        )
      )
    ) {
      return null;
    } else if (field.line) {
      return <Line key={`${props.indexId}-${index}`} />;
    } else if (field.page) {
      if (
        objectPath.get(
          documentDateContext.documentDate,
          `${props.path}.${field.queryPath}`,
          null
        ) === null
      ) {
        objectPath.set(
          documentDateContext.documentDate,
          `${props.path}.${field.queryPath}`,
          []
        );
      }
      return (
        <Page
          {...field}
          key={index}
          repeatStepList={props.repeatStepList}
          submitHandler={props.submitHandler}
          submitData={props.submitData}
          thisChapter={props.thisChapter}
          stopLoop={props.stopLoop}
          mutation={props.mutation}
          readOnlyFields={props.readOnlyFields}
          showEditButton={false}
          data={objectPath.get(props.data, field.queryPath, false)}
          path={`${props.path}.${field.queryPath}`}
        />
      );
    } else {
      return <FeildProperties key={index} {...field} {...props} />;
    }
  });
};
