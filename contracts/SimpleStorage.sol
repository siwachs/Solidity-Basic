// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26; // Define Solidity Version to use and ^ it tell we can use newer version too

// This code compile down to EVM
// EVM supported BLC is Avalanche, Fantom, Polygon

contract SimpleStorage {
    // Data Types -> boolean, uint or uint256, int or int256, address, bytes or bytes32, string

    uint256 public favoriteNumber; // Auto init to zero

    struct People{
        uint256 favoriteNumber;
        string name;
    }

    People public person = People({favoriteNumber:2, name:"Test Name"});
    People public person2 = People({favoriteNumber:3, name:"Test Name"});

    // Array
    uint256[] public favoriteNumberList;
    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    // Longer Operations means larger GAS usage But GAS spend only when we modify BLC
    // Everttime we change state of BLC is called Transaction and consume GAS

    // We have view and pure function. View can only read states and pure function also readonly but they also restrict view in it. 

    // Pure function
    function store (uint256 _favoriteNumber) public virtual  {
        // This use GAS in here we modify BLC
        favoriteNumber = _favoriteNumber;
        favoriteNumber = favoriteNumber + 1;

        // To override a function it need to be virtual

        retrive(); // Now this also Cost GAS because we read from BLC
    }

    // View function
    function retrive () public view returns(uint256){
        return favoriteNumber;
    }

    // EVM can store data in Memory, Stack, Storage, Calldata, Code and Logs
    // Memory -> Data only avail Temp during transtaction
    // Storage -> it exist even outside of function Execute
    // Calldata -> Same as memory nut immutable

    // Why no memory for unint because solidity known that unint is  going to be in memory but array, struct and maping types are special in solidity
    // Here string is array of bytes

    function addPeople (string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));

        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}