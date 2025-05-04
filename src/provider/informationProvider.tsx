import React, { createContext } from "react";

interface InformationContextType {
  isVerified: boolean;
  rating: number;
}

export const InformationContext = createContext<InformationContextType>({
  isVerified: false,
  rating: 5,
});

const InformationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <InformationContext.Provider value={{ isVerified: false, rating: 5 }}>
      {children}
    </InformationContext.Provider>
  );
};

export default InformationProvider;
