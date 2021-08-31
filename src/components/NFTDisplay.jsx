import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NFTList from "./NFTList";
import { AppContext, AppContextUpdate } from "../context/AppProvider";
import device from "../styles/responsive";

function NFTDisplay() {
  const searchBar = useRef(null);
  const [showCategory, setShowCategory] = useState(false);
  const [category, setCategory] = useState("");
  const { account, chainError } = useContext(AppContext);
  return (
    <Container>
      {account && (
        <Top>
          <SearchBar ref={searchBar}>
            <IconSearch fontSize={"large"} />
            <input
              onFocus={() => {
                searchBar.current.style.border = "1px solid rgb(21, 113, 250)";
              }}
              onBlur={() => {
                searchBar.current.style.border = "1px solid rgba(0, 0, 0, 0.1)";
              }}
              type="text"
              placeholder="Search"
            />
          </SearchBar>
          <FilterBar onClick={() => setShowCategory(!showCategory)}>
            <p>{!category ? "Category" : category}</p>
            <Expand />

            {showCategory && (
              <FilterOptions>
                {["most recent"].map((el, index) => (
                  <p
                    style={{
                      color: el == category && "rgb(21, 113, 250)",
                    }}
                    onClick={() => setCategory(el)}
                  >
                    {el}
                  </p>
                ))}
              </FilterOptions>
            )}
          </FilterBar>
        </Top>
      )}
      {account && (
        <Content>
          <NFTList />
        </Content>
      )}
      {!account && (
        <ConnectAccount>Please Connect Your Account To NFMint</ConnectAccount>
      )}
    </Container>
  );
}

export default NFTDisplay;

const ConnectAccount = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  color: var(--color-light-brown);
`;

const Container = styled.div`
  font-size: var(--default-font-size);
  margin: 2rem var(--container-padding);
  padding: 4rem 4rem;

  position: relative;
  border: var(--light-border);
`;

const Top = styled.div`
  display: flex;
`;

const SearchBar = styled.div`
  border: var(--light-border);
  width: 80%;
  padding: 0.7rem 2rem;
  margin-right: 1.5rem;
  display: flex;
  transition: 0.2s all;
  > input {
    border: none;
    margin-left: 1rem;
    width: 100%;
    outline: none;

    &:focus SearchBar {
      background-color: red;
    }
  }
`;

const IconSearch = styled(SearchIcon)`
  color: var(--color-light-brown);
`;

const FilterBar = styled.div`
  position: relative;
  border: var(--light-border);
  z-index: 0;
  padding: 0.7rem 2rem;
  cursor: pointer;
  width: 15%;
  display: flex;
  align-items: center;
  &:hover {
    color: var(--color-light-blue);
  }

  @media screen and ${device.sm} {
    display: none;
  }
  > p {
    font-size: 1.3rem;
  }
`;

const Expand = styled(ExpandMoreIcon)`
  color: var(--color-light-brown);
  margin-left: auto;
`;

const FilterOptions = styled.div`
  z-index: 40;
  position: absolute;
  top: 100%;
  left: 0;
  border: var(--light-border);
  width: 100%;
  background-color: white;
  padding: 2rem;
  box-shadow: 3px 3px 7px var(--color-light-brown);

  > p {
    &:hover {
      color: var(--color-light-blue);
    }
    color: var(--color-light-brown);
    &:not(:last-child) {
      margin-bottom: 1.3rem;
    }
  }
`;

const Content = styled.div`
  margin-top: 2.9rem;
`;
