import React, { useEffect, useState, useRef } from "react";
import styles from "./cardList.module.css";
import CardItem from "../cardItem/cardItem";
import { IS_LOGGED_IN } from "../../../apollo/queries/login/login";
import { useQuery } from "@apollo/client";

import Load from "../loader/loader";

function CardList({ data, loadMore }) {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  const postData = data && Object.values(data)[0]["PostData"];
  const likeArray = data && Object.values(data)[0]["likeArray"];

  // console.log(onLoadMore);
  // const [post, setPost] = useState(postData);
  // setPost([...post, ...postData]);
  // const handleScroll = ({ currentTarget }) => {
  //   const scrollTop =
  //     (document.documentElement && document.documentElement.scrollTop) ||
  //     document.body.scrollTop;
  //   const scrollHeight =
  //     (document.documentElement && document.documentElement.scrollHeight) ||
  //     document.body.scrollHeight;
  //   const clientHeight =
  //     document.documentElement.clientHeight || window.innerHeight;
  //   const scrolledToBottom =
  //     Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  //   if (scrolledToBottom) {
  //     onLoadMore();
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <ul className={styles.cardList}>
      {postData?.map((card) => (
        <CardItem
          key={card["Post"].postIndex}
          card={card}
          likeArray={likeArray}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </ul>
  );
}

export default CardList;
