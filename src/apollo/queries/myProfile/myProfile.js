import { gql } from "@apollo/client";

export const UPLOAD_PROFILE = gql`
  mutation uploadProfile($imgURL: String!) {
    uploadProfile(imgURL: $imgURL)
  }
`;
