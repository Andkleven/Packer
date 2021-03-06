import React from "react";
import Input from "components/input/Input";
import ReadField from "components/form/components/fields/ReadField";
import TinyButton from "components/button/TinyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ ...props }) => {
  const FileName = () => (
    <div className={(props.writeChapter && "mb-2") || ""}>
      <FontAwesomeIcon
        icon={["fad", "file-image"]}
        className={`text-primary text-center shadow-sm mr-2`}
        swapOpacity
      />
      {props.file.file.name}
    </div>
  );
  return props.description && props.writeChapter ? (
    <div className="mt-2">
      <div className={(props.writeChapter && "pt-2") || ""}>
        <div className="d-flex justify-content-between">
          <FileName />
          {props.writeChapter && (
            <TinyButton
              onClick={() => props.deleteHandler(props.index)}
              icon="trash-alt"
              color="danger"
              tooltip={`Delete "${props.file.file.name}"`}
              noPadding
            />
          )}
        </div>
      </div>
      <Input
        placeholder={`Description or comment...`}
        defaultValue={props.file.fileDescription}
        onChange={e => props.onChange(e.target, props.index)}
      />
    </div>
  ) : (
    <ReadField
      {...props}
      noLine
      key={props.indexId}
      readOnly={true}
      label={
        <div className="d-flex justify-content-between">
          <div>
            <FileName />
          </div>
        </div>
      }
      value={props.file.fileDescription ? props.file.fileDescription : ""}
    />
  );
};
