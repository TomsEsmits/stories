import React, {
  useEffect,
  useReducer,
  useCallback,
  useState,
  useMemo,
} from "react";
import axios from "axios";
import { List } from "./components/List";
import { useSemiPersistentState } from "./hooks/useSemiPersistentState";
import { listReducer } from "./hooks/reducer";
import { SearchForm } from "./components/SearchForm";
import { getSumComments } from "./utilities/helperFunctions";

const App = () => {
  const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [list, setList] = useReducer(listReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = useCallback(async () => {
    setList({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(url);

      setList({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      setList({
        type: "STORIES_FETCH_FAILURE",
      });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleRemoveStoryItem = useCallback((itemId) => {
    setList({
      type: "REMOVE_STORY",
      payload: itemId,
    });
  }, []);

  const sumComments = useMemo(() => getSumComments(list), [list]);

  return (
    <>
      <h1>My Stories with {sumComments} comments</h1>
      <SearchForm
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
      />

      <hr />

      {/*Rendered List array*/}

      {list.isError && <p>Something went wrong, please try again later...</p>}

      {list.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List
          list={list.data}
          onRemoveItem={handleRemoveStoryItem}
        />
      )}
    </>
  );
};

export default App;
