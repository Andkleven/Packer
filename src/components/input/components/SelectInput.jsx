import React from "react";
import { Form } from "react-bootstrap";
import Creatable from "react-select/creatable";
// import Select from "react-select";
import { camelCaseToNormal } from "functions/general";

// import Duplicate from "./widgets/Duplicate";

export default props => {
  let options = [];

  if (props.optionsData && props.userRole) {
    props.optionsData.userProfile.forEach(element => {
      if (props.userRole.includes(element.role.toLowerCase())) {
        options.push({
          value: element.name
        });
      }
    });
  } else if (props.options) {
    props.options.forEach(element => {
      options.push({
        value: element
      });
    });
  }

  const placeholder = props.custom
    ? props.placeholder || "Select or type..."
    : props.placeholder || "Select...";

  options.unshift({
    value: null,
    label: placeholder
  });

  options.map(option => {
    let label = option.value;
    label = camelCaseToNormal(label);
    return (option.label = label);
  });
  const selectProps = {
    className: "w-100",
    name: props.name,
    id: `custom-${props.type}-${props.label}-${props.repeatStepList}`,
    options: options,
    defaultValue:
      !props.value && props.defaultValue
        ? options.find(option => option.value === props.defaultValue)
        : null,
    theme: theme => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#FBECD6",
        primary50: "#FBECD6",
        primary75: "#FBECD6",
        primary: "#f1b25b"
      }
    }),
    selected: props.value,
    isSearchable: true,
    placeholder: placeholder,
    onChange: props.onChangeSelect,
    autoFocus: props.focus,
    isDisabled: props.readOnlyFields ? props.readOnlyFields : props.readOnly
  };

  return (
    <>
      {/* <Form.Group className="mb-0" readOnly={true}> */}
      <div className="d-flex text-dark">
        <Creatable {...selectProps} />
        {/* {props.custom ? (
          <Creatable {...selectProps} />
        ) : (
          <Select {...selectProps} />
        )} */}
        {/* <Duplicate {...props} /> */}
      </div>

      {props.subtext && (
        <Form.Text className="text-muted">{props.subtext}</Form.Text>
      )}
      {/* </Form.Group> */}
    </>
  );
};
