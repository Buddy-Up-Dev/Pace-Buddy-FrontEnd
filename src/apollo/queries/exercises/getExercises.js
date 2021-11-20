import { gql } from "@apollo/client";

export const GET_EXERCISES = gql`
  query getExercise {
    getExercise {
      exerciseIndex
      exerciseName
    }
  }
`;
