import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText, triggerSearch, setTriggerSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
