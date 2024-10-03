// SPDX-License-Identifier: MIT
// pragma solidity >=0.6.0 <0.8.0;
pragma solidity ^0.8.0;

// Use Before Version 0.8 of Solidity

contract SafeMathTester {
    uint8 public bigNumber = 255;

    function add() public {
        // Fallback to 0 on version < 0.8
        bigNumber = bigNumber + 1;

        unchecked {bigNumber = bigNumber + 1;}
        // Now it fallback to Zero
    }

    // In 0.8 It Fails and we still get 255
}