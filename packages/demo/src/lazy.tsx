import React from "react";
import { useVar } from "./routerComponent";

const UserIdComponent: React.FC = () => {
  const vars = useVar();

  return (
    <div className='bg-green-200'>
      user: {vars.id} / page: {vars.p}
    </div>
  );
};

export default UserIdComponent;
