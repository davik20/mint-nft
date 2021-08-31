import React, { useContext } from "react";
import { AppContext, AppContextUpdate } from "../context/AppProvider";
import styled from "styled-components";
import getLogo from "../functions/getLogo";
import { shortenAddress } from "../functions/utilities";
import device from "../styles/responsive";
function Navbar() {
  const { handleShowCreateModal, connectWallet } = useContext(AppContextUpdate);
  const { chainError, account } = useContext(AppContext);

  return (
    <>
      {" "}
      <Container>
        {chainError && (
          <div
            style={{
              backgroundColor: "orange",
              color: "white",
              textAlign: "center",
              padding: ".5rem",
            }}
          >
            Please Select the Rinkeby Network
          </div>
        )}
        <NavbarContainer>
          <Logo>
            <p>NFMint</p>
            <img src={getLogo()} />
          </Logo>
          {/* <Title>MY NFTs</Title> */}
          <AddNFT
            onClick={() => {
              if (chainError) {
                alert("Please Select The Rinkeby Chain");
                return;
              }
              handleShowCreateModal();
            }}
          >
            MINT NFT{" "}
          </AddNFT>
          {!account && <Connect onClick={connectWallet}>Connect </Connect>}
          {chainError && (
            <Connect style={{ backgroundColor: "orange", color: "white" }}>
              {" "}
              chain error{" "}
            </Connect>
          )}
          {account && !chainError && (
            <Account> {shortenAddress(account)}</Account>
          )}
        </NavbarContainer>
      </Container>
    </>
  );
}

export default Navbar;
const Container = styled.div`
  z-index: 50;
  background-color: white;
  width: 100%;
  height: 6rem;
  position: fixed;
  border-bottom: var(--default-border);
  top: 0;
  margin-bottom: 0;

  padding: 1rem var(--container-padding);
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  > p {
    display: inline-block;
    cursor: pointer;
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: 0.4rem;
    color: var(--color-light-blue);
    @media screen and ${device.sm} {
      font-size: 20px;
    }
  }

  > img {
    display: inline-block;
    width: 45px;
    @media screen and ${device.sm} {
      width: 30px;
    }
  }
`;

const Title = styled.div`
  font-size: 2rem;
  cursor: pointer;
  transition: 0.2s all;
  font-weight: bold;
  color: var(--color-light-brown);
  &:hover {
    transform: scale(1.2);
  }
`;

export const Button = styled.button`
  outline: none;
  background-color: rgb(14, 100, 219);
  color: white;
  padding: 1.1rem 3rem;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    transform: scale(1.1);
    box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(1);
    box-shadow: none;
  }
`;

export const AddNFT = styled(Button)`
  color: rgb(21, 113, 250);
  border: 1px solid rgb(21, 113, 250);
  background-color: white;

  font-weight: bold;
`;
const Connect = styled(Button)`
  background-color: rgb(14, 100, 219);
`;
const Account = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  @media screen and ${device.sm} {
    font-size: 11px;
  }
`;
