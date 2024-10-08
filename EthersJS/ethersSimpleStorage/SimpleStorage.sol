// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// Important Note: https://ethereum.stackexchange.com/questions/152509/could-not-coalesce-error-invalid-opcode
// To use VM who don't have PUSH0 we must use 0.8.19 solidity version

contract SimpleStorage {
    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
