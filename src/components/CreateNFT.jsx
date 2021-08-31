import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext, AppContextUpdate } from "../context/AppProvider";
import { Button, AddNFT as Upload } from "../components/Navbar";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import _ from "lodash";
import { NFT, ContractName, NFTName } from "../components/NFTList";
import ClipLoader from "react-spinners/ClipLoader";
import CheckIcon from "@material-ui/icons/Check";
import BarLoader from "react-spinners/BarLoader";
import useClickOutside from "../hooks/useClickOutside";
import addDataToIPFS from "../functions/getIPFS";
import device from "../styles/responsive";
import toast from "react-hot-toast";

function CreateNFT() {
  const { showCreateModal, NFMintContract, account, web3 } =
    useContext(AppContext);
  const [loadingJokes, setLoadingJokes] = useState([
    "Hey, go grab a coffee or something😙",
    "Nice, We are Creating History 😌",
    "Are you still here? 😄",
    "Where's the layer 2 solution already 🥲",
    "This would have been really costly on the mainnet 😂",
    "Beginning Quantum Event👀",
    "I need more gas fee!!",
    "Fine I'm joking",
    "Exploiting Gateway to Nirvana !! 🏃🏾‍♂️",
    "This shouldn't take too much time 🌚",
    "Sell this for 7Eth okay? 🌚",
    "Wow what a nice picture !! 🤩",

    "Gosh this is taking time, I need to sleep",
  ]);
  const { handleCloseCreateModal, setRand } = useContext(AppContextUpdate);
  const [hash, setHash] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [transactionSent, setTransactionSent] = useState(false);
  const [showJokes, setShowJokes] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [joke, setJoke] = useState("Alright Beginning the Transaction now 🙂");

  const [form, setForm] = useState({
    name: "",
    description: "",
    properties: {},
  });

  const [completed, setCompleted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [jsx, setJsx] = useState([]);

  const modal = useRef(null);
  const close = useRef(null);
  const upload = useRef(null);
  const toIgnore = useRef([]);

  //   useClickOutside(modal, () => handleCloseCreateModal());

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onprogress = () => {
        setUploadProgress(true);
      };

      reader.onloadend = () => {
        setPreview(reader.result);
        setUploadProgress(false);
      };
    }
  }, [image]);
  const onInputChange = ({ target }) => {
    const { value, name } = target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const renderJokes = () => {
    setInterval(() => {
      const number = Math.floor(Math.random() * loadingJokes.length);
      setJoke(loadingJokes[number]);
    }, 10000);
  };

  const handleCreateNFT = async () => {
    if (!form.name || !form.description || preview === null) {
      setFormError(true);
      setFormErrorMessage("Please fill in all fields.");
      setTimeout(() => {
        setFormError(false);
      }, 5000);
      return;
    }
    // add nft metadata to ipfs
    setShowApproveModal(true);
    setLoading(true);
    addDataToIPFS(image)
      .then((url) => {
        const NFTMetadata = {
          name: form.name,
          description: form.description,
          imageUrl: url,
        };
        renderJokes();
        NFMintContract.methods
          .addCollectible(JSON.stringify(NFTMetadata), account)
          .send({
            from: account,
            gasPrice: web3.utils.toWei("120", "Gwei"),
          })
          .on("transactionHash", (hash) => {
            console.log(hash);
            setTransactionSent(true);
            setHash(hash);
          })
          .then((result) => {
            setRand(Math.random() * 40000000);
            setTimeout(() => {
              setShowApproveModal(false);
              handleCloseCreateModal(true);
            }, 4000);
            setLoading(false);
            toast.success("NFT created successfully");

            console.log(result);
          })
          .catch((err) => {
            toast.error("An Error Occured");
            clearInterval(renderJokes);
            setShowApproveModal(false);
            // setLoading(false);
          });

        console.log(JSON.stringify(NFTMetadata));
      })
      .catch((err) => {
        console.log(err);
        setFormError(true);
        setFormErrorMessage(
          "An error ocurred, please check your internet connection and try again."
        );
        setShowApproveModal(false);
        setTimeout(() => {
          setFormError(false);
          setFormErrorMessage("");
        }, 3000);
      });

    //
  };

  return (
    <>
      {showApproveModal && (
        <ConfirmationContainer>
          <ConfirmationContent onClick={() => renderJokes()}>
            <p className="header">Creating NFT</p>

            <p className="message">Please Approve the transaction </p>
            {loading && (
              <div className="loader">
                <p
                  style={{
                    marginRight: "1.5rem",
                    color: "blue",
                    transtion: ".3s all",
                  }}
                >
                  {joke}
                </p>
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                  <ClipLoader size={20} color="rgb(21, 113, 250)" />
                </p>
              </div>
            )}

            {!loading && (
              <p className="loader">
                <p
                  style={{
                    marginRight: "1.5rem",
                    color: "blue",
                    transtion: ".3s all",
                  }}
                >
                  {"TRANSACTION SUCCESSFUL!"}{" "}
                </p>
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                  <CheckIcon
                    style={{
                      fontSize: "4rem",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  />
                </p>
              </p>
            )}
            {transactionSent && (
              <p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://rinkeby.etherscan.io/tx/${hash}`}
                >
                  Check Progress
                </a>{" "}
              </p>
            )}
            <p className="footer">Waiting For blockchain confirmation</p>
          </ConfirmationContent>
        </ConfirmationContainer>
      )}

      <Container>
        <Content ref={modal}>
          {formError && (
            <div
              style={{
                backgroundColor: "orange",
                color: "white",
                padding: "1.3rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              {formErrorMessage}
            </div>
          )}
          <Title>
            <h1>Create NFT</h1>
            <Close onClick={handleCloseCreateModal} fontSize={"large"} />
          </Title>
          <Body>
            {!preview && (
              <InputContainer>
                <Label>
                  Upload Image <sup style={{ color: "red" }}>*</sup>
                </Label>
                <UploadImage>
                  <p style={{ marginBottom: "2rem" }}>PNG, JPG</p>
                  <Upload
                    onClick={() => upload.current.click()}
                    style={{ marginLeft: 0 }}
                  >
                    Choose Image
                  </Upload>
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    style={{ opacity: 0 }}
                    ref={upload}
                    type="file"
                    accept="image/*"
                    id="upload"
                  />
                </UploadImage>
              </InputContainer>
            )}

            {!preview && uploadProgress && (
              <div>
                <ClipLoader />
              </div>
            )}

            {preview && (
              <InputContainer>
                <Label> Preview</Label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <NFT>
                    <div
                      onClick={() => {
                        setPreview(null);
                      }}
                      onMouseOver={(e) => {
                        console.log(e);
                        e.target.style.backgroundColor = "rgba(0,0,0, .2)";
                        close.current.style.color = "white";
                        close.current.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        console.log(e);
                        e.target.style.backgroundColor = "transparent";
                        close.current.style.opacity = "0";
                      }}
                      style={{
                        height: "70%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CloseIcon
                        ref={close}
                        style={{
                          fontSize: "10rem",
                          position: "absolute",
                          opacity: 0,
                        }}
                      />
                      <img
                        style={{
                          width: "90%",
                          height: "70%",
                          objectFit: "cover",
                        }}
                        src={preview}
                      />
                    </div>
                    <div className="details">
                      <ContractName>NFTMint</ContractName>
                      <NFTName>Create NFT</NFTName>
                    </div>
                  </NFT>
                </div>
              </InputContainer>
            )}
            <InputContainer>
              <Label>
                Name <sup style={{ color: "red" }}>*</sup>
              </Label>
              <Input
                onChange={onInputChange}
                name="name"
                value={form.name}
                placeholder="Enter NFT's Name"
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Description <sup style={{ color: "red" }}>*</sup>
              </Label>
              <TextArea
                onChange={onInputChange}
                name="description"
                value={form.description}
                cols="40"
                rows="4"
                placeholder="Enter the NFT's Description"
              />
            </InputContainer>
            {/* <InputContainer>
              <Label>Properties</Label>
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Input
                    onChange={onPropertyInput}
                    data-id="0"
                    name="property"
                    placeholder="Property"
                    style={{ marginRight: "1rem" }}
                  />
                  <Input
                    onChange={onPropertyInput}
                    data-id="0"
                    name="value"
                    placeholder="Value"
                  />
                </div>
               
              </>
            </InputContainer> */}

            <Button onClick={handleCreateNFT} style={{ marginTop: "2rem" }}>
              Create
            </Button>
          </Body>
        </Content>
      </Container>
    </>
  );
}

export default CreateNFT;

const Container = styled.div`
  font-size: 1.4rem;
  position: fixed;

  transition: 0.3s all;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 70;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: white;

  width: 50rem;
  height: 90%;
  overflow: scroll;
  border-radius: 10px;
  padding: 2.5rem 2.5rem;
  padding-bottom: 9rem;

  @media screen and ${device.sm} {
    width: 90%;
  }
`;

const Title = styled.div`
  display: flex;

  background-color: white;
  width: 100%;
  margin-bottom: 3rem;
  justify-content: space-between;
  > h1 {
    color: var(--color-light-brown);
  }
`;
const Close = styled(CloseIcon)`
  cursor: pointer;
`;

const Body = styled.div`
  margin-top: 2.5rem;
`;

const InputContainer = styled.div`
  margin-bottom: 2rem;
`;
const Label = styled.div`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 1.1rem;
  outline: none;
  width: 100%;
  border-radius: 9px;
  border: var(--light-border);

  &:hover {
    border: 1px solid var(--color-light-blue);
  }
`;

const TextArea = styled.textarea`
  padding: 1.1rem;
  outline: none;
  width: 100%;
  border-radius: 9px;
  border: var(--light-border);

  &:hover {
    border: 1px solid var(--color-light-blue);
  }
`;
const UploadImage = styled.div`
  border: 1px dotted rgba(0, 0, 0, 0.3);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConfirmationContainer = styled(Container)`
  z-index: 100;
`;

const ConfirmationContent = styled(Content)`
  width: 35rem;
  height: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  @media screen and ${device.sm} {
    width: 90%;
  }

  > .header {
    font-size: 2.5rem;
  }

  > p {
    color: var(--color-light-brown);
  }

  > .footer {
    text-transform: uppercase;
    font-size: "2.5rem";
  }
`;
