import React, { useContext, Fragment } from "react";
import FieldGroup from "components/form/components/fields/FieldGroup";
import objectPath from "object-path";
import { DocumentDateContext } from "components/form/Form";
import {
  getRepeatNumber,
  getRepeatStepList,
  isLastCharacterNumber,
  variableString
} from "functions/general";
import Subtitle from "components/design/fonts/Subtitle";
import Line from "components/design/Line";
import DepthButton from "components/button/DepthButton";

export default props => {
  const { documentDate } = useContext(DocumentDateContext);
  const DeleteButton = props => (
    <DepthButton
      iconProps={{ icon: ["fas", "trash-alt"], className: "text-danger" }}
      key={props.index}
      onClick={() => props.deleteHandler(props.index)}
      className="mt-n2 mb-3 w-100"
    >
      Remove
    </DepthButton>
  );

  if (props.repeat) {
    if (Array.isArray(objectPath.get(documentDate, props.path))) {
      return objectPath
        .get(documentDate, props.path)
        .map((itemsData, index) => {
          return (
            <Fragment key={index}>
              {props.pageTitle && props.indexVariablePageTitle !== undefined ? (
                <>
                  <Subtitle>
                    {variableString(index + 1, props.pageTitle)}
                  </Subtitle>
                  <Line></Line>
                </>
              ) : null}
              <FieldGroup
                {...props}
                repeatStepList={getRepeatStepList(props, index)}
                repeatStep={index}
                key={`${props.indexId}-${index}`}
                // data={itemsData}
                path={props.path ? `${props.path}.${index}` : null}
                file={
                  objectPath.get(
                    props.data,
                    props.path ? `${props.path}.${index}.data` : null
                  ) &&
                  objectPath.get(
                    props.data,
                    props.path ? `${props.path}.${index}.data` : null
                  ).file
                }
                indexId={`${props.indexId}-${index}`}
              />
              {props.delete && props.writeChapter ? (
                props.repeatStartWithOneGroup ? (
                  index ? (
                    <DeleteButton
                      index={index}
                      deleteHandler={props.deleteHandler}
                    />
                  ) : null
                ) : (
                  <DeleteButton
                    index={index}
                    deleteHandler={props.deleteHandler}
                  />
                )
              ) : null}
            </Fragment>
          );
        });
    } else if (!props.queryPath) {
      let arraySetFieldGroupData = [];
      let repeatNumber = getRepeatNumber(
        props.specData,
        props.repeatGroupWithQuery,
        props.repeatStepList,
        props.editRepeatStepListRepeat
      );
      for (let index = 0; index < repeatNumber; index++) {
        arraySetFieldGroupData.push(
          <FieldGroup
            key={index}
            {...props}
            repeatStepList={getRepeatStepList(props, index)}
            repeatStep={index}
            path={props.path ? `${props.path}.${index}.data` : null}
            indexId={`${props.indexId}-${index}`}
          />
        );
      }
      if (arraySetFieldGroupData[0]) {
        return arraySetFieldGroupData;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return (
      <FieldGroup
        {...props}
        repeatStepList={getRepeatStepList(props, 0)}
        file={
          objectPath.get(props.data, props.path + ".0.data") &&
          objectPath.get(props.data, props.path + ".0.data").file
        }
        // data={props.data ? props.data[0] : props.data}
        path={
          isLastCharacterNumber(props.path) ? props.path : `${props.path}.0`
        }
        repeatStep={0}
        indexId={`${props.indexId}-0`}
      />
    );
  }
};
