import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { useAppContext } from "../hooks/useAppContext";
import dayjs from "dayjs";
import {
  Avatar,
  Badge,
  Flex,
  Box,
  Center,
  chakra,
  Container,
  HStack,
  Stack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  ContextPlugin,
  IProposalQueryParams,
  SortDirection,
  ProposalSortBy,
  ProposalStatus,
  TokenVotingClient,
  TokenVotingProposalListItem,
} from "@aragon/sdk-client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: process.env.NEXT_PUBLIC_OPENAI_ORG_ID,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

import { proposals } from "../mocks/tokenProposalsResponse";
const openai = new OpenAIApi(configuration);

// const Aragon = dynamic(() => import("@aragon/sdk-client"), { ssr: false });
// console.log("Aragon", Aragon);
// const {
//   ContextPlugin,
//   IProposalQueryParams,
//   SortDirection,
//   ProposalSortBy,
//   ProposalStatus,
//   TokenVotingClient,
//   TokenVotingProposalListItem,
// } = Aragon;

const queryParams: IProposalQueryParams = {
  skip: 0, // optional
  limit: 10, // optional
  direction: SortDirection.ASC, // optional, otherwise DESC ("descending")
  sortBy: ProposalSortBy.CREATED_AT, // optional, otherwise NAME, VOTES (POPULARITY coming soon)
  // status: ProposalStatus.ACTIVE, // optional, otherwise PENDING, SUCCEEDED, EXECUTED, DEFEATED
};

const inter = Inter({ subsets: ["latin"] });

function createPromisesArray(inputArr) {
  // create a new array to hold the Promises
  const promises = [];
  console.log("openai~", configuration);
  // loop through each value in the input array
  for (let i = 0; i < inputArr.length; i++) {
    // create a new Promise that resolves with the current value
    const promise = openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize the following into 4 bullet points: ${inputArr[i]} ~stop~`,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["~stop~"],
    });
    // add the Promise to the array of Promises
    // @ts-ignore
    promises.push(promise);
  }

  // return the array of Promises
  return promises;
}

export async function getServerSideProps({ req, res }) {
  let summaries = proposals.proposals.map(
    (proposal) => proposal.metadata.summary
  );
  const allRequests = createPromisesArray(summaries);
  // return;
  try {
    const allResponses = await Promise.all(allRequests);

    // console.log("ALl Requests", allResponses);
    const allResponsesData = allResponses.map((response, i) => {
      return {
        // @ts-ignore
        chatgtpRes: response?.data?.choices[0]?.text,
        proposal: proposals.proposals[i],
      };
    });

    // const allResponsesData = [
    //   {
    //     chatgtpRes:
    //       "\n" +
    //       "\n" +
    //       "- Propose the creation of a Decentralized Autonomous Organization (DAO)\n" +
    //       "- Governed by a smart contract on a blockchain, ensuring consensus and transparency\n" +
    //       "- Prioritize community involvement and collaboration with diverse perspectives\n" +
    //       "- Focus on sustainability and social impact with clear guidelines and protocols for decision-making and security",
    //     proposal: {
    //       id: "0x12345...",
    //       dao: {
    //         address: "0x1234567890123456789012345678901234567890",
    //         name: "Cool DAO",
    //       },
    //       creatorAddress: "0x1234567890123456789012345678901234567890",
    //       metadata: {
    //         title: "Test Proposal",
    //         summary: `We are proposing the creation of a Decentralized Autonomous Organization (DAO) to foster community-driven decision-making and collaboration. Our vision is to establish a platform where members can participate in a transparent, democratic process to fund and execute projects that align with our shared values and goals.

    //         The DAO will be governed by a smart contract on a blockchain, ensuring that decisions are made through consensus and that all transactions are transparent and immutable. Members will be able to vote on proposals and proposals can be submitted by anyone. Once a proposal is approved, funds will be allocated from the DAO's treasury to support the project.

    //         Our DAO will be unique in that it will prioritize community involvement and collaboration. We believe that diverse perspectives lead to better decision-making and that everyone should have a voice. Therefore, we will prioritize outreach efforts to ensure that members from all backgrounds are represented and that their ideas are heard.

    //         In addition, our DAO will have a strong focus on sustainability and social impact. We will prioritize proposals that have a positive impact on society and the environment, while also promoting long-term financial stability.

    //         To ensure the success of our DAO, we will establish clear guidelines and protocols for decision-making, including a code of conduct and a dispute resolution process. We will also prioritize security and auditability, to ensure that the DAO remains secure and transparent.

    //         In summary, our DAO will:

    //         Foster community-driven decision-making and collaboration
    //         Be governed by a transparent and democratic process
    //         Prioritize outreach efforts to ensure diverse representation
    //         Have a strong focus on sustainability and social impact
    //         Establish clear guidelines and protocols for decision-making
    //         Prioritize security and auditability
    //         We are excited to establish this DAO and look forward to building a strong and inclusive community. Thank you for your consideration.`,
    //       },
    //       startDate: 1678002739304,
    //       endDate: 1678013839304,
    //       status: "Executed",
    //       token: {
    //         address: "0x1234567890123456789012345678901234567890",
    //         name: "The Token",
    //         symbol: "TOK",
    //         decimals: 18,
    //       },
    //       results: {
    //         yes: 100000,
    //         no: 77777,
    //         abstain: 0,
    //       },
    //     },
    //   },
    // ];
    return {
      props: { data: allResponsesData },
    };
  } catch (e) {
    console.log("~~", e.message);
    return { props: {} };
  }
}

export default function Home({ data }) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  // const { context } = useAppContext();
  // Create a plugin context from the Aragon SDK.
  // useEffect(() => {
  //   const contextPlugin: ContextPlugin = ContextPlugin.fromContext(context);
  //   // Create a TokenVoting client.
  //   const tokenVotingClient: TokenVotingClient = new TokenVotingClient(
  //     contextPlugin
  //   );
  //   const fetch = async () => {
  //     const proposals: TokenVotingProposalListItem[] =
  //       await tokenVotingClient.methods.getProposals(queryParams);
  //     console.log({ proposals });
  //     console.log("tokenVoting clietn", tokenVotingClient);
  //   };
  //   fetch();
  //   // org-vkePJXYDpXRuQr8CXa4GIyG1
  // }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Aragon DAO Proposals - Summarized by ChatGPT</title>
        <meta
          name="description"
          content="Aragon DAO Proposals - Summarized by ChatGTP"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="5xl" pb={16}>
        <Modal size={["xl", "3xl"]} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{modalText}</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Text fontSize={"xl"} fontWeight="bold" mb={8}>
          Summarized DAO Proposals
        </Text>
        <Stack spacing={4}>
          {data.map((item) => {
            const bulletPoints = item.chatgtpRes;
            const metadata = item.proposal.metadata;
            const dao = item.proposal.dao.name;
            const status = item.proposal.status;
            const results = item.proposal.results;
            const startDate = item.proposal.startDate / 1000;
            const endDate = item.proposal.endDate / 1000;
            return (
              <Box
                key={metadata.id}
                bg="bg-surface"
                p="4"
                boxShadow="sm"
                position="relative"
                borderRadius="lg"
              >
                <Stack shouldWrapChildren spacing="4">
                  <Text fontSize="md" fontWeight="semibold" color="emphasized">
                    {metadata.title}
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="blue.500">
                    By {dao}
                  </Text>
                  <Text fontSize="sm" fontWeight="normal" color="gray.500">
                    Voting began on {dayjs.unix(startDate).format("DD/MM/YYYY")}{" "}
                    and ends on {dayjs.unix(endDate).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="normal"
                    color="gray.700"
                    whiteSpace={"pre-wrap"}
                  >
                    {bulletPoints}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    textDecoration={"underline"}
                    fontWeight="semibold"
                    cursor={"pointer"}
                    whiteSpace="pre-wrap"
                    color="gray.700"
                    onClick={() => {
                      setModalTitle(metadata.title);
                      setModalText(metadata.summary);
                      onOpen();
                    }}
                  >
                    View Full Proposal
                  </Text>
                  <HStack justify="space-between">
                    <Badge
                      colorScheme={
                        status === "Executed"
                          ? "green"
                          : status === "Defeated"
                          ? "red"
                          : "orange"
                      }
                      size="sm"
                    >
                      {status}
                    </Badge>
                    <HStack spacing="3">
                      <Text fontSize="xs" color="subtle" fontWeight="medium">
                        {results.yes} yes votes, {results.no} no votes
                      </Text>
                      {/* <Avatar
                        src={issue.author.avatarUrl}
                        name={issue.author.name}
                        boxSize="6"
                      /> */}
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </>
  );
}
