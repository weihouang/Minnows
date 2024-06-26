import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

import {
  Box,
  Heading,
  Input,
  Flex,
  VStack,
  InputLeftElement,
  Icon,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import ThreadItem from "./ThreadItem";
import { fetchPosts, submitPost } from "../../api/threadController";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddThread from "./AddThread";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { circleTitle, circleId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchPosts(circleId);
      setPosts(fetchedData);
    }
    fetchData();
  }, [circleId]);

  async function handlePostSubmit(title, content) {
    const message = await submitPost({ title, content, circleId });
    alert(message);
    const fetchedData = await fetchPosts(circleId);
    setPosts(fetchedData);
  }

  const goBack = () => {
    navigate("/circle");
  };

  return (
    <Box p={"1em"} overflowY="auto" position="relative" h={"100%"}>
      <IconButton
        aria-label="Go back"
        icon={<FaArrowLeft />}
        onClick={goBack}
        size="sm"
        alignSelf="flex-start"
        position={"fixed"}
        top={"1em"}
        left={"20vw"}
      />
      <Box mt={"2em"} mb={"2em"}>
        <Flex justify={"space-between"} mb={"0.3em"}>
          <Heading>{decodeURIComponent(circleTitle)}</Heading>
          <AddThread handlePostSubmit={handlePostSubmit} />
        </Flex>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={IoSearchSharp} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search by author name, title content"
          />
        </InputGroup>
      </Box>

      <VStack spacing={"1em"} overflowY="auto" h="75%" mt="1em" pb="10em">
        {posts.map((post, index) => (
          <ThreadItem
            key={index}
            authorName={post.author_id}
            title={post.title}
            content={post.body}
            circleId={circleId}
            threadTitle={circleTitle}
          />
        ))}
      </VStack>
    </Box>
  );
}
