import React from "react";
import { UserProfile } from "@clerk/nextjs";

const Settings = () => {
  return (
    <div className="flex items-center justify-center">
      
        <UserProfile
          appearance={{
            variables: {
              fontSize: "16px",
            },
          }}
        />
    </div>
  );
};

export default Settings;
