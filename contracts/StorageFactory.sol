// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./SimpleStorage.sol";

contract StorageFactory{
    SimpleStorage [] public simpleStorageArr;

    function createSimpleStorageContract() public {
        simpleStorageArr.push(new SimpleStorage());
    }

    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public  {
        // Need Address of Contract
        // ABI - Application Binary Interface

        SimpleStorage simpleStorage = simpleStorageArr[_simpleStorageIndex];
        simpleStorage.store(_simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIndex) public view returns(uint256){
        SimpleStorage simpleStorage = simpleStorageArr[_simpleStorageIndex];
        return simpleStorage.retrive();
    }
}