/**
 * Test
 */

import React from "react";
import Paper from "components/layout/Paper";
import PaperStack from "components/layout/PaperStack";
import Filter from "components/search/components/Filter";
import { useQuery } from "@apollo/react-hooks";
import query from "graphql/leadEngineer/Query";
import { objectifyQuery } from "functions/general";
import LoadingAnimation from "./components/LoadingAnimation";
import ErrorMessage from "./components/ErrorMessage";

export default props => {
  const { loading, error, data } = useQuery(query["OPERATOR_PROJECTS"]);
  const objectifiedData = objectifyQuery(data);

  const Content = () => {
    if (loading) {
      return LoadingAnimation;
    } else if (error) {
      return <ErrorMessage error={error} />;
    } else {
      return (
        <Filter
          data={objectifiedData}
          view={props.view}
          defaultFilters={props.defaultFilters}
          defaultSearch={props.defaultSearch}
        />
      );
    }
  };

  return (
    <PaperStack>
      <Paper darkMode fullPage={!props.children && true}>
        <Content />
      </Paper>
      {props.children}
    </PaperStack>
  );
};