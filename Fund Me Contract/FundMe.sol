// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    // Use Chainlink and oracle to convert USD to ETH
    uint256 public minimumUSD = 1 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        require(msg.value.getConversionRate() >= minimumUSD, "Minimum 50USD need to for this transaction!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }
}