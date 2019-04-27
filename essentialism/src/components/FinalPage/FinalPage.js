import React from "react";

export default function FinalPage(props) {
  return (
    <div>
      {props.values.map((value, index) =>
        index < 3 ? <h2 key={value.id}>{value.name}</h2> : null
      )}
      {props.projects.map((project, index) =>
        index < 3 ? <h2 key={project.id}>{project.name}</h2> : null
      )}
      <h2>{props.modalDesc}</h2>
      <button onClick={props.handleClearModalDesc}>Back</button>
    </div>
  );
}
