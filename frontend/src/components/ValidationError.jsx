import React from "react";

function ValidationError(err) {
  return (
    <div>
      <p className="text-error text-[12px]">{err.err.msg}</p>
    </div>
  );
}

export default ValidationError;
