import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import OrderList from "../components/order/OrderList";
import query from "../request/leadEngineers/Query";
import history from "../history";
import orderJson from "../forms/Order.json";
import DocumentAndSubmit from "../components/DocumentAndSubmit";
import Paper from "components/Paper";

export default () => {
  const [updateOrder, setUpdateOrder] = useState(0);
  const [createOrder, setCreateOrder] = useState(false);
  const { loading, error, data } = useQuery(query[orderJson.query]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const newForm = () => {
    setCreateOrder(true);
    setUpdateOrder(0);
  };
  const updateForm = id => {
    setCreateOrder(false);
    setUpdateOrder(id);
  };
  const pushHome = data => {
    const { id } = data.projects.new;
    history.push(`/order/items/${id}`);
  };

  return (
    <>
      <button onClick={() => newForm()}>Create Project</button>
      <OrderList
        orders={data.projects}
        onViewDetail={id => {
          updateForm(id);
        }}
      />
      {(updateOrder || createOrder) && (
        <Paper>
          <DocumentAndSubmit
            componentsId={"orderPage"}
            buttonToEveryForm={true}
            notEditButton={true}
            allWaysShow={true}
            document={orderJson}
            data={createOrder ? null : data}
            arrayIndex={data.projects.findIndex(
              index => index.id === updateOrder
            )}
            reRender={pushHome}
          />
        </Paper>
      )}
    </>
  );
};
