import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query getProfile {
    hasProfile {
      hasProfile
      imgURL
    }
  }
`;

export const UPLOAD_PROFILE = gql`
  mutation uploadProfile($imgURL: String!) {
    uploadProfile(imgURL: $imgURL)
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser
  }
`;
