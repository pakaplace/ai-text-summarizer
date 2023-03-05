export const proposals = {
  proposals: [
    {
      id: "0x12345...",
      dao: {
        address: "0x1234567890123456789012345678901234567890",
        name: "Aragon Network DAO",
      },
      creatorAddress: "0x1234567890123456789012345678901234567890",
      metadata: {
        title: "Should Aragon acquire DOT?",
        summary: `This is a discussion thread on the possibility for Aragon to diversify some of its holdings by acquiring DOTs.

        Polkadot is a heterogenous messaging protocol and transaction ledger and the principal project under the Web3 Foundation’s stewardship project. It allows independent blockchains to exchange information and trust-free transactions. Notably, it aims at tackling scaling and interoperability challenges currently faced by public blockchains with a new approach to blockchain architecture, deployment, validation and the use of on-chain governance.
        
        With the launch of Polkadot’s mainnet approaching, the Web3 Foundation has been in conversation with the Aragon Association about Aragon being one of the first parachains and thusly taking a position in DOTs. Due to regulatory issues the token price cannot be disclosed publicly with precision, but the current contribution would be at a discount.
        
        A range of important events have occurred over the last number of months that have strengthened the relationship and potential collaboration between Aragon and Polkadot:
        
        As Polkadot moves towards launch, there is a strong possibility that Polkadot could support Aragon’s scalability plans and allows for interesting experimentation.
        Further, the two projects represent a number of synergies as Aragon’s UX/UI could be an important tool for voting and communicating in the Polkadot ecosystem.
        Aragon DAOs could be launched on Polkadot easily as the network will be optimized for such activity.
        Should Aragon evaluate the potentiality of it’s own application-specific chain, it would be prudent to hold a number of DOTs such that a long term parachain slot could be locked up to support these endeavours.
        As cryptocurrency markets have gone through significant volatility over the last several months, there is the recognition that diversification of the asset base, focusing on high quality crypto-assets that represent technically strong crypto-networks.
        Thusly, it would be sensible to evaluate the possibility of a purchase of DOTs. Given the close collaboration between the projects and their respective teams, it would make sense for Aragon to have a position in DOTs to be able to stake as a parachain and diversify it’s portfolio.
        
        We invite discussions and questions on this topic.`,
      },
      startDate: 1678000039304,
      endDate: 1678000739304,
      status: "Executed",
      token: {
        address: "0x1234567890123456789012345678901234567890",
        name: "The Token",
        symbol: "TOK",
        decimals: 18,
      },
      results: {
        yes: 100000,
        no: 77777,
        abstain: 0,
      },
    },
    {
      id: "0x12345...",
      dao: {
        address: "0x1234567890123456789012345678901234567890",
        name: "Sushi DAO",
      },
      creatorAddress: "0x1234567890123456789012345678901234567890",
      metadata: {
        title: "Adopt Thor Chain as backend",
        summary: `Summary

        SushiSwap can enlarge customer service, by offer swap not only for ERC20 tokens, but for BTC, LTC, ATOM, AVAX and more L1 coins, if adopt THORChain as back-end.
        
        Abstract
        
        THORChain project - DEX AMM based on pools. It allows to do cross-chain swaps without wrapped assets, mostly L1 gas tokens.
        
        As well, they have aggregation function 8 for partners. SushiSwap can offer to end users cross-chain swaps, using THORChain :zap: pools for L1 coins and self-service for ERC20. E.g. BTC - SUSHI swap will be done like BTC-ETH on THORChain and then ETH-SUSHI on SushiSwap.
        
        For such swaps SushiSwap can charge fee for all swaps done via its aggregator.
        
        Motivation
        
        Be first main swap service to offer such feature (nearest competitor - ShapeShift)
        Charge fees
        Enlarge number of swaps in own pools
        Specification
        
        Read documentation
        If needed, contact THORChain core-team (via Discord)
        Implement aggregation function on SushiSwap front-end
        For
        
        It allows boost swaps both for SushiSwap and THORChain
        
        Against
        
        Win-win situation, no doubts.`,
      },
      startDate: 1678002739304,
      endDate: 1679009739304,
      status: "Pending",
      token: {
        address: "0x1234567890123456789012345678901234567890",
        name: "The Token",
        symbol: "TOK",
        decimals: 18,
      },
      results: {
        yes: 100000,
        no: 77777,
        abstain: 0,
      },
    },
  ],
};
