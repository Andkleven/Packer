import React from "react";
import Tree from "components/explorer/components/Tree";
import Link from "../../design/fonts/Link";

export default ({
  data,
  iconSize,
  iconStyle,
  rowStyle,
  headline = "Projects",
  ...props
}) => {
  return (
    <div className={props.className}>
      {headline && <h6>{headline}</h6>}
      {props.access && props.access.specs && (
        <Link
          to={`/order/project/0`}
          iconProps={{
            icon: ["fad", "folder-plus"],
            size: iconSize,
            style: iconStyle
            // className: "text-primary"
          }}
          style={rowStyle}
        >
          Create new project
        </Link>
      )}
      {data && data.length > 0 ? (
        data.map((project, indexProject) => (
          <Tree
            iconSize={iconSize}
            iconStyle={iconStyle}
            rowStyle={rowStyle}
            defaultOpen
            key={`project${indexProject}`}
            name={
              `${project.data.projectName}`
              // + `(${countProjectItems(project)} items)`
            }
          >
            {props.access && props.access.specs && (
              <Link
                to={`/order/project/${project.id}`}
                key={`project${indexProject}`}
                iconProps={{
                  icon: ["fad", "file-invoice"],
                  swapOpacity: true,
                  size: iconSize,
                  style: iconStyle
                }}
                style={rowStyle}
              >
                Specifications
                {/* {project.data.projectName} */}
              </Link>
            )}
            {project.descriptions &&
              project.descriptions.map((description, indexDescription) => (
                <Tree
                  iconSize={iconSize}
                  iconStyle={iconStyle}
                  rowStyle={rowStyle}
                  defaultOpen
                  key={`project${indexProject}Description${indexDescription}`}
                  // name={description.data.geometry}
                  name={`Description ${indexDescription + 1}`}
                >
                  {/* {props.access &&
                    props.access.batch &&
                    description.items.length > 1 && (
                      <Link
                        to={`/order/item/${description.data.description}`}
                        iconProps={{
                          icon: ["fad", "cubes"],
                          size: iconSize,
                          style: iconStyle
                        }}
                        style={rowStyle}
                      >
                        Batch items
                      </Link>
                    )} */}
                  {props.access &&
                    props.access.items &&
                    description.items &&
                    description.items.map((item, indexItem) => (
                      <Link
                        to={`/single-item/${item.id}/${description.data.geometry}`}
                        key={`project${indexProject}Description${indexDescription}Item${indexItem}`}
                        iconProps={{
                          icon: ["fad", "cube"],
                          size: iconSize,
                          style: iconStyle
                        }}
                        style={rowStyle}
                      >
                        {item.id}
                      </Link>
                    ))}
                </Tree>
              ))}
          </Tree>
        ))
      ) : (
        <div className="pt-1 text-secondary">
          <em>No projects found.</em>
        </div>
      )}
    </div>
  );
};
