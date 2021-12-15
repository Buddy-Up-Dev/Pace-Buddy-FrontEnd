import { gql } from "@apollo/client";

export const GET_MY_REPORT = gql`
  query getMyReport {
    reporting {
      conditionMent
      conditionImgURL
      exerciseName
      exerciseType
    }
  }
`;
