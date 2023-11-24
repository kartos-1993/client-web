import axios from "axios";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import plus from "../../assets/plus.svg";
import remove from "../../assets/remove.svg";
import {
  CHANGE_IMAGE,
  DELETE_IMAGE,
} from "../../store/reducers/productReducer";
import { KitButton } from "../../kit/index";
import { useEffect } from "react";

const ImageUpload = () => {
  const { images } = useSelector((state) => state.productDetail);
  const { token: authtoken } = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const [imageOverLay, setImageOverLay] = useState(false);

  useEffect(() => {}, []);

  function handleRemoveImg(id) {
    axios
      .delete(
        `${import.meta.env.VITE_API}/removeimage/${id}`,

        {
          headers: { authtoken },
        }
      )
      .then((res) => {
        dispatch(DELETE_IMAGE(id));
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function handelOpenWidget() {
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "celebsnp",
        uploadPreset: "ml_default",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          dispatch(CHANGE_IMAGE(result.info));
        }
      }
    );
    myWidget.open();
  }
  return (
    <ImageContainer>
      <KitButton
        onClick={() => {
          handelOpenWidget();
        }}
        variant="primary"
      >
        Click here to upload image
      </KitButton>

      <ImageItem>
        {images.map((image, index) => (
          <Image key={image.public_id}>
            <img
              src={image.secure_url}
              alt=""
              onMouseEnter={() => setImageOverLay(true)}
            />
            <ImageUpdateRemove>
              {/* <button >Update</button> */}
              <img
                src={remove}
                alt="remove image"
                onClick={() => handleRemoveImg(image.public_id)}
              />
            </ImageUpdateRemove>
          </Image>
        ))}
      </ImageItem>
    </ImageContainer>
  );
};

export default ImageUpload;

const ImageContainer = styled.div`
  border: 1px grey dashed;
  position: relative;
  width: 100%;
  cursor: pointer;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    background-color: #dedede;
  }
  z-index: 0;
  margin-bottom: 1rem;
`;

const ImageItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* grid-auto-columns: 33.3%; */
  position: relative;
  height: 200px;
  /* gap:1px */
`;

const Image = styled.div`
  align-self: center;
  img {
    width: 64px;
  }
  z-index: 1;
  position: relative;
  margin: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ImageUpdateRemove = styled.div`
  position: absolute;
  top: -0.56rem;
  right: -4px;
  img {
    width: 20px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
