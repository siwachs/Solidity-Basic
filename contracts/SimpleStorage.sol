// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26; // Define Solidity Version to use and ^ it tell we can use newer version too

contract SimpleStorage {
    // Data Types -> boolean, uint or uint256, int or int256, address, bytes or bytes32, string

    uint256 public favoriteNumber; // Auto init to zero

    // Longer Operations means larger GAS usage But GAS spend only when we modify BLC

    // We have view and pure function. View can only read states and pure function also readonly but they also restrict view in it. 

    // Pure function
    function store (uint256 _favoriteNumber) public {
        // This use GAS in here we modify BLC
        favoriteNumber = _favoriteNumber;
        favoriteNumber = favoriteNumber + 1;

        retrive(); // Now this also Cost GAS because we read from BLC
    }

    // View function
    function retrive () public view returns(uint256){
        return favoriteNumber;
    }
}