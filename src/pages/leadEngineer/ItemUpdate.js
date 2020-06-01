import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import query from "graphql/query";
import objectPath from "object-path";
import itemsJson from "templates/createProject.json";
import mutations from "graphql/mutation";
import Input from "components/input/Input";
import SubmitButton from "components/button/SubmitButton";
import CancelButton from "components/button/CancelButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DepthButton from "components/button/DepthButton";
import { Form } from "react-bootstrap";
import ErrorMessage from "components/design/ErrorMessage";
import LoadingAnimation from "components/explorer/components/LoadingAnimation";

export default props => {
  const [state, setState] = useState(props.value ? props.value : "");
  const update = (cache, { data }) => {
    const oldData = cache.readQuery({
      query: query[itemsJson.query],
      variables: { id: props.getQueryBy }
    });
    let array = objectPath.get(
      oldData,
      `projects.0.descriptions.${props.counter}.items`
    );
    let index = array.findIndex(x => x.id === data.item.new.id);
    objectPath.set(
      oldData,
      `projects.0.descriptions.${props.counter}.items.${index}`,
      data.item.new
    );
    cache.writeQuery({
      query: query[itemsJson.query],
      variables: { id: props.getQueryBy },
      data: { ...oldData }
    });
  };
  const create = (cache, { data }) => {
    const oldData = cache.readQuery({
      query: query[itemsJson.query],
      variables: { id: props.getQueryBy }
    });
    objectPath.push(
      oldData,
      `projects.0.descriptions.${props.counter}.items`,
      data.item.new
    );
    cache.writeQuery({
      query: query[itemsJson.query],
      variables: { id: props.getQueryBy },
      data: { ...oldData }
    });
  };
  const [
    mutation,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(mutations["ITEM"], {
    update: props.id ? update : create
  });

  const handleSubmit = () => {
    mutation({
      variables: {
        id: props.id,
        itemId: state,
        foreignKey: props.foreignKey
      }
    })
      .then(() => {
        if (props.onDone) {
          props.onDone();
        }
      })
      .catch(e => {
        // console.log(e);
      });
  };

  console.log(mutationError && mutationError.message);

  if (props.edit) {
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          onChange={e => setState(e.target.value)}
          label="Item ID"
          defaultValue={props.item.itemId}
        />
        <div className="d-flex w-100">
          <SubmitButton>Save</SubmitButton>
          <div className="px-1"></div>
          <CancelButton onClick={props.onCancel} />
        </div>
        {mutationError && (
          <ErrorMessage
            className="w-100 mt-3"
            error={String(mutationError.message)}
            // align="center"
          >
            Error.
          </ErrorMessage>
        )}
      </Form>
    );
  }

  return (
    <Form>
      <Input
        tight
        onChange={e => setState(e.target.value)}
        value={state}
        // value={props.item.itemId}
        label="Item ID"
        append={
          <DepthButton onClick={handleSubmit}>
            {/* <FontAwesomeIcon
              icon={["fal", "plus"]}
              size="xs"
              className="mr-1"
            /> */}
            <FontAwesomeIcon
              icon={["fas", "cube"]}
              className="mr-sm-2 text-secondary"
            />
            <div className="d-none d-sm-inline">Add item to project</div>
          </DepthButton>
        }
      />
    </Form>
  );
};
