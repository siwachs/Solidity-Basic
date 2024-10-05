// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract FallbackExample {
    uint256 public result;

    // If send this contract some ETH by Low level interaction then it goes to fallback only if data is defined in CALLDATA if empty it goes to receive.
    receive() external payable {
        result = 1;
    }

    fallback() external payable {
        result = 2;
    }
}
