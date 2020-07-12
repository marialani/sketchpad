import React, { useState } from "react";

export default React.memo(() => {
  const [name, setName] = useState("");
  return (
    <label
      className="header-name"
      style={{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <input
        style={{ textAlign: "center" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}
        placeholder="Name your art work!"
      />
    </label>
  );
});
