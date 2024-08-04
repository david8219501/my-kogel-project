import React, { useState } from "react";
import PageBackground from "../shared/PageBackground";
import * as Styled from './SearchPage.styles'; 

const SearchPage = () => {
  const [searchWord, setSearchWord] = useState("");

  const searchBuuton = () => {
    if (searchWord.trim() === "") {
        console.log("word", searchWord);
    }
   
  } 

  return (
    <PageBackground>
      <Styled.Wrapper>
        <Styled.SearchFieldContainer>
          <Styled.Input
            type="text"
            placeholder="...הכנס מילה לחיפוש"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <Styled.SearchIcon onClick={searchBuuton}/>
        </Styled.SearchFieldContainer>
        <Styled.SearchResults/>
      </Styled.Wrapper>
    </PageBackground>
  );
};

export default SearchPage;
