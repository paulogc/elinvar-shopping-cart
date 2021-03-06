import axios from 'axios'

import defaultImage from '../../assets/default-image.jpg';
import { TYPE_PROCUCT_IMAGE } from '../../constants/communicationType';
import { LOADING, UPDATED } from '../../constants/communicationStatus';

export const RETRIEVING_IMAGE = 'RETRIEVING_IMAGE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';


export function updateImage({ imageSrc, productID }) {
  return {
    type: UPDATE_IMAGE,
    meta: {
      type: TYPE_PROCUCT_IMAGE,
      status: UPDATED,
      selector: productID,
    },
    payload: {
      data: {
        productID,
        imageSrc,
      },
    },
  };
};

export function retrievingImage(productID) {
  return {
    type: RETRIEVING_IMAGE,
    meta: {
      type: TYPE_PROCUCT_IMAGE,
      status: LOADING,
      selector: productID,
    }
  }
};

export function fetchImage({ productID, imageURL }) {
  return async (dispatch) => {
    dispatch(retrievingImage(productID));

    try {
      const response = await axios.get(imageURL);
      const src = response.data;

      dispatch(updateImage({ src, productID }));
    } catch (e) {
      dispatch(updateImage({ imageSrc: defaultImage, productID }));
    }
  };
};
