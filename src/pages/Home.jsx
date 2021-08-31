import React, { useContext } from "react";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import NFTDisplay from "../components/NFTDisplay";
import CreateNFT from "../components/CreateNFT";
import { AppContext, AppContextUpdate } from "../context/AppProvider";
import { copyToClipboard, shortenAddress } from "../functions/utilities";
import toast from "react-hot-toast";
function Home() {
  const { showCreateModal, account } = useContext(AppContext);
  return (
    <>
      <HomeContainer>
        {showCreateModal && <CreateNFT />}
        <ProfileContainer>
          <div>
            <Img src={`${process.env.PUBLIC_URL}/img/profile.png`} />

            {account && (
              <Address
                onClick={() => {
                  copyToClipboard(account);
                  toast.success("copied to clipboard");
                }}
              >
                <span>{shortenAddress(account)}</span> <CopyIcon />
              </Address>
            )}
          </div>
        </ProfileContainer>

        <Content>
          <NFTDisplay />
        </Content>
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div``;

const ProfileContainer = styled.div`
  background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(hsla(0, 0%, 100%, 0.85)),
      to(hsla(0, 0%, 100%, 0.85))
    ),
    #93c5fe;
  background: -webkit-linear-gradient(
      bottom,
      hsla(0, 0%, 100%, 0.85),
      hsla(0, 0%, 100%, 0.85)
    ),
    #93c5fe;
  background: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0.85),
      hsla(0, 0%, 100%, 0.85)
    ),
    #93c5fe;
  position: absolute;
  left: 0;
  /* top: 6rem; */
  width: 100%;
  height: 200px;
  border-radius: 0 0 100px 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;

  > div {
    display: flex;

    flex-direction: column;
    align-items: center;
    margin-top: 15rem;
  }
`;

const Content = styled.div`
  position: relative;
  top: 35rem;
`;

const Img = styled.img`
  width: 14rem;

  height: 14rem;
  cursor: pointer;

  border-radius: 50%;

  -webkit-object-fit: cover;
  object-fit: cover;
`;

const Address = styled.p`
  font-size: 2rem;
  margin-top: 1.5rem;
  cursor: pointer;
`;

const CopyIcon = styled(FileCopyIcon)`
  color: rgba(0, 0, 0, 0.3);
`;
export default Home;
