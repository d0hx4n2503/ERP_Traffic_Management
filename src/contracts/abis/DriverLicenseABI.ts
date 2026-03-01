export const DriverLicenseABI = [
  {
    "_format": "hh-sol-artifact-1",
    "contractName": "DriverLicense",
    "sourceName": "contracts/core/DriverLicense.sol",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "AlreadyExists",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "InvalidInput",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "point",
            "type": "uint256"
          }
        ],
        "name": "InvalidPointValue",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "NotFound",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "ZeroAddressNotAllowed",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "previousAdmin",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "newAdmin",
            "type": "address"
          }
        ],
        "name": "AdminChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "beacon",
            "type": "address"
          }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "version",
            "type": "uint8"
          }
        ],
        "name": "Initialized",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Issued",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "string",
            "name": "licenseNo",
            "type": "string"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "holder",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "issueDate",
            "type": "uint256"
          }
        ],
        "name": "LicenseIssued",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "string",
            "name": "licenseNo",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "LicenseRevoked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "string",
            "name": "licenseNo",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "newExpiryDate",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "enum Enum.LicenseStatus",
            "name": "newStatus",
            "type": "uint8"
          }
        ],
        "name": "LicenseUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Revoked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "previousAdminRole",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "newAdminRole",
            "type": "bytes32"
          }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "RoleGranted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "RoleRevoked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "SuccessEvent",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "implementation",
            "type": "address"
          }
        ],
        "name": "Upgraded",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "GOV_AGENCY_ROLE",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "emittedCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllLicenses",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "licenseNo",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "holderAddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "holderId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "licenseType",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "issueDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "expiryDate",
                "type": "uint256"
              },
              {
                "internalType": "enum Enum.LicenseStatus",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "authorityId",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "point",
                "type": "uint256"
              }
            ],
            "internalType": "struct DriverLicenseStruct.DriverLicense[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_licenseNo",
            "type": "string"
          }
        ],
        "name": "getLicense",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "licenseNo",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "holderAddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "holderId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "licenseType",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "issueDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "expiryDate",
                "type": "uint256"
              },
              {
                "internalType": "enum Enum.LicenseStatus",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "authorityId",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "point",
                "type": "uint256"
              }
            ],
            "internalType": "struct DriverLicenseStruct.DriverLicense",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLicenseCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_holderAddress",
            "type": "address"
          }
        ],
        "name": "getLicensesByHolder",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "licenseNo",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "holderAddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "holderId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "licenseType",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "issueDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "expiryDate",
                "type": "uint256"
              },
              {
                "internalType": "enum Enum.LicenseStatus",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "authorityId",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "point",
                "type": "uint256"
              }
            ],
            "internalType": "struct DriverLicenseStruct.DriverLicense[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          }
        ],
        "name": "getRoleAdmin",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "hasRole",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "hasValid",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "holdersCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trafficController",
            "type": "address"
          }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "isValid",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "licenseNo",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "holderAddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "holderId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "licenseType",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "issueDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "expiryDate",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "authorityId",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "point",
                "type": "uint256"
              }
            ],
            "internalType": "struct DriverLicenseStruct.LicenseInput",
            "name": "input",
            "type": "tuple"
          }
        ],
        "name": "issueLicense",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_licenseNo",
            "type": "string"
          }
        ],
        "name": "revokeLicense",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "trafficController",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "licenseNo",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "holderAddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "licenseType",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "expiryDate",
                "type": "uint256"
              },
              {
                "internalType": "enum Enum.LicenseStatus",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "point",
                "type": "uint256"
              }
            ],
            "internalType": "struct DriverLicenseStruct.LicenseUpdateInput",
            "name": "input",
            "type": "tuple"
          }
        ],
        "name": "updateLicense",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newImplementation",
            "type": "address"
          }
        ],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newImplementation",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ],
    "bytecode": "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b60805161420a61011860003960008181610c3901528181610c7901528181610d6001528181610da00152610e2f015261420a6000f3fe6080604052600436106101815760003560e01c80636b4ed21b116100d1578063b1cf421f1161008a578063d547741f11610064578063d547741f14610479578063d6a7b97614610499578063dfe7a7d7146104c6578063f577a500146104e657600080fd5b8063b1cf421f14610419578063c4d66de814610439578063d02c4ed71461045957600080fd5b80636b4ed21b1461034f5780636e9546da1461038357806370a08231146103a357806391d14854146103c3578063a217fddf146103e3578063ae7f0a9f146103f857600080fd5b806336568abe1161013e5780634d320c31116101185780634d320c31146102cd5780634f1ef286146102ef57806352d1902d146103025780636352211e1461031757600080fd5b806336568abe1461026d5780633659cfe61461028d57806343945512146102ad57600080fd5b806301ffc9a71461018657806310c8434d146101bb5780631261e6ba146101f9578063248a9ca31461021b57806326019c18146101bb5780632f2ff15d1461024b575b600080fd5b34801561019257600080fd5b506101a66101a1366004613761565b610506565b60405190151581526020015b60405180910390f35b3480156101c757600080fd5b507f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003d0545b6040519081526020016101b2565b34801561020557600080fd5b5061020e61053d565b6040516101b291906138fa565b34801561022757600080fd5b506101eb61023636600461395f565b600090815260c9602052604090206001015490565b34801561025757600080fd5b5061026b61026636600461398d565b610b82565b005b34801561027957600080fd5b5061026b61028836600461398d565b610bac565b34801561029957600080fd5b5061026b6102a83660046139bd565b610c2f565b3480156102b957600080fd5b506101a66102c83660046139bd565b610d0e565b3480156102d957600080fd5b506101eb6000805160206141b583398151915281565b61026b6102fd3660046139f0565b610d56565b34801561030e57600080fd5b506101eb610e22565b34801561032357600080fd5b5061033761033236600461395f565b610ed5565b6040516001600160a01b0390911681526020016101b2565b34801561035b57600080fd5b507f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003d1546101eb565b34801561038f57600080fd5b5061020e61039e3660046139bd565b610f41565b3480156103af57600080fd5b506101eb6103be3660046139bd565b611419565b3480156103cf57600080fd5b506101a66103de36600461398d565b61145f565b3480156103ef57600080fd5b506101eb600081565b34801561040457600080fd5b5061012d54610337906001600160a01b031681565b34801561042557600080fd5b5061026b610434366004613ab9565b61148a565b34801561044557600080fd5b5061026b6104543660046139bd565b6118a5565b34801561046557600080fd5b5061026b610474366004613af3565b611a05565b34801561048557600080fd5b5061026b61049436600461398d565b611c3e565b3480156104a557600080fd5b506104b96104b4366004613af3565b611c63565b6040516101b29190613b65565b3480156104d257600080fd5b5061026b6104e1366004613b78565b61204c565b3480156104f257600080fd5b506101a661050136600461395f565b612685565b60006001600160e01b03198216637965db0b60e01b148061053757506301ffc9a760e01b6001600160e01b03198316145b92915050565b7f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003d05460609060008051602061414e83398151915290600060015b82811161067f5760008181526001850160205260408120805461059990613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546105c590613bb3565b80156106125780601f106105e757610100808354040283529160200191610612565b820191906000526020600020905b8154815290600101906020018083116105f557829003601f168201915b50505050509050600081511180156106595750600085600001826040516106399190613bed565b9081526020016040518091039020600101805461065590613bb3565b9050115b1561066c578261066881613c1f565b9350505b508061067781613c1f565b915050610577565b506000816001600160401b0381111561069a5761069a6139da565b6040519080825280602002602001820160405280156106d357816020015b6106c06136ed565b8152602001906001900390816106b85790505b509050600060015b848111610b77576000818152600187016020526040812080546106fd90613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461072990613bb3565b80156107765780601f1061074b57610100808354040283529160200191610776565b820191906000526020600020905b81548152906001019060200180831161075957829003601f168201915b50505050509050600081511180156107bd57506000876000018260405161079d9190613bed565b908152602001604051809103902060010180546107b990613bb3565b9050115b15610b645760405187906107d2908390613bed565b9081526020016040518091039020604051806101600160405290816000820154815260200160018201805461080690613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461083290613bb3565b801561087f5780601f106108545761010080835404028352916020019161087f565b820191906000526020600020905b81548152906001019060200180831161086257829003601f168201915b505050918352505060028201546001600160a01b031660208201526003820180546040909201916108af90613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546108db90613bb3565b80156109285780601f106108fd57610100808354040283529160200191610928565b820191906000526020600020905b81548152906001019060200180831161090b57829003601f168201915b5050505050815260200160048201805461094190613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461096d90613bb3565b80156109ba5780601f1061098f576101008083540402835291602001916109ba565b820191906000526020600020905b81548152906001019060200180831161099d57829003601f168201915b505050505081526020016005820180546109d390613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546109ff90613bb3565b8015610a4c5780601f10610a2157610100808354040283529160200191610a4c565b820191906000526020600020905b815481529060010190602001808311610a2f57829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115610a8757610a876137db565b6003811115610a9857610a986137db565b8152602001600982018054610aac90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054610ad890613bb3565b8015610b255780601f10610afa57610100808354040283529160200191610b25565b820191906000526020600020905b815481529060010190602001808311610b0857829003601f168201915b50505050508152602001600a82015481525050848481518110610b4a57610b4a613c38565b60200260200101819052508280610b6090613c1f565b9350505b5080610b6f81613c1f565b9150506106db565b509095945050505050565b600082815260c96020526040902060010154610b9d81612b22565b610ba78383612b2c565b505050565b6001600160a01b0381163314610c215760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610c2b8282612bb2565b5050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610c775760405162461bcd60e51b8152600401610c1890613c4e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610cc060008051602061416e833981519152546001600160a01b031690565b6001600160a01b031614610ce65760405162461bcd60e51b8152600401610c1890613c9a565b610cef81612c19565b60408051600080825260208201909252610d0b91839190612c24565b50565b6000610d1982612d8f565b506001600160a01b031660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003ce6020526040902054151590565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610d9e5760405162461bcd60e51b8152600401610c1890613c4e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610de760008051602061416e833981519152546001600160a01b031690565b6001600160a01b031614610e0d5760405162461bcd60e51b8152600401610c1890613c9a565b610e1682612c19565b610c2b82826001612c24565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610ec25760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610c18565b5060008051602061416e83398151915290565b60008181527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cd602052604081205460008051602061414e833981519152906001600160a01b031680610f3a5760405163c5723b5160e01b815260040160405180910390fd5b9392505050565b6060610f4c82612d8f565b6001600160a01b03821660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cc60209081526040808320805482518185028101850190935280835260008051602061414e8339815191529493830182828015610fd757602002820191906000526020600020905b815481526020019060010190808311610fc3575b505050505090506000815190506000816001600160401b03811115610ffe57610ffe6139da565b60405190808252806020026020018201604052801561103757816020015b6110246136ed565b81526020019060019003908161101c5790505b50905060005b8281101561140f578460000185600101600086848151811061106157611061613c38565b602002602001015181526020019081526020016000206040516110849190613ce6565b908152602001604051809103902060405180610160016040529081600082015481526020016001820180546110b890613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546110e490613bb3565b80156111315780601f1061110657610100808354040283529160200191611131565b820191906000526020600020905b81548152906001019060200180831161111457829003601f168201915b505050918352505060028201546001600160a01b0316602082015260038201805460409092019161116190613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461118d90613bb3565b80156111da5780601f106111af576101008083540402835291602001916111da565b820191906000526020600020905b8154815290600101906020018083116111bd57829003601f168201915b505050505081526020016004820180546111f390613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461121f90613bb3565b801561126c5780601f106112415761010080835404028352916020019161126c565b820191906000526020600020905b81548152906001019060200180831161124f57829003601f168201915b5050505050815260200160058201805461128590613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546112b190613bb3565b80156112fe5780601f106112d3576101008083540402835291602001916112fe565b820191906000526020600020905b8154815290600101906020018083116112e157829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115611339576113396137db565b600381111561134a5761134a6137db565b815260200160098201805461135e90613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461138a90613bb3565b80156113d75780601f106113ac576101008083540402835291602001916113d7565b820191906000526020600020905b8154815290600101906020018083116113ba57829003601f168201915b50505050508152602001600a820154815250508282815181106113fc576113fc613c38565b602090810291909101015260010161103d565b5095945050505050565b600061142482612d8f565b506001600160a01b031660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003ce602052604090205490565b600091825260c9602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611492612db6565b6000805160206141b58339815191526114aa81612b22565b60008051602061414e8339815191526115006114c68480613d5b565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612e0f92505050565b61151861151360408501602086016139bd565b612d8f565b6115258360c00135612e31565b806115308480613d5b565b60405161153e929190613da8565b9081526020016040518091039020600101805461155a90613bb3565b905060000361157c5760405163c5723b5160e01b815260040160405180910390fd5b6000816115898580613d5b565b604051611597929190613da8565b9081526040519081900360200190209050600080600883015460ff1660038111156115c4576115c46137db565b1480156115d5575060078201544211155b90508160060154856080013510156116005760405163b4fa3fb360e01b815260040160405180910390fd5b61161060408601602087016139bd565b60028301546001600160a01b0390811691161461168757815460028301546116539082906001600160a01b031661164d60408a0160208b016139bd565b85612e56565b61166360408701602088016139bd565b6002840180546001600160a01b0319166001600160a01b0392909216919091179055505b6116946040860186613d5b565b60048401916116a4919083613e06565b506116b26060860186613d5b565b60058401916116c2919083613e06565b50608085013560078301556116dd60c0860160a08701613ec5565b60088301805460ff191660018360038111156116fb576116fb6137db565b021790555060c0850135600a83015560008061171d60c0880160a08901613ec5565b600381111561172e5761172e6137db565b14801561173f575060808601354211155b905081801561174c575080155b15611798576004840160006117676040890160208a016139bd565b6001600160a01b031681526020810191909152604001600090812080549161178e83613ee6565b91905055506117eb565b811580156117a35750805b156117eb576004840160006117be6040890160208a016139bd565b6001600160a01b03168152602081019190915260400160009081208054916117e583613c1f565b91905055505b6118296040518060400160405280601c81526020017f4c6963656e73652075706461746564207375636365737366756c6c7900000000815250612fd0565b6118338680613d5b565b604051611841929190613da8565b6040519081900390207f3214c644e235b89065eee2e188f1cb6abf4ac42d92d3ecc963be51d682ac92d1608088013561188060c08a0160a08b01613ec5565b60405161188e929190613efd565b60405180910390a25050505050610d0b600160fb55565b600054610100900460ff16158080156118c55750600054600160ff909116105b806118df5750303b1580156118df575060005460ff166001145b6119425760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610c18565b6000805460ff191660011790558015611965576000805461ff0019166101001790555b61196d613013565b611975613013565b61197d61303c565b61012d80546001600160a01b0319166001600160a01b0384161790556119a4600033612b2c565b6119bc6000805160206141b583398151915233612b2c565b8015610c2b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b611a0d612db6565b6000805160206141b5833981519152611a2581612b22565b600060008051602061414e8339815191529050611a7784848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612e0f92505050565b6040518190611a899086908690613da8565b90815260200160405180910390206001018054611aa590613bb3565b9050600003611ac75760405163c5723b5160e01b815260040160405180910390fd5b6000816000018585604051611add929190613da8565b9081526040519081900360200190209050600080600883015460ff166003811115611b0a57611b0a6137db565b148015611b1b575060078201544211155b60088301805460ff1916600217905590508015611b625760028201546001600160a01b031660009081526004840160205260408120805491611b5c83613ee6565b91905055505b815460408051808201909152601c81527f4c6963656e7365207265766f6b6564207375636365737366756c6c79000000006020820152611ba190612fd0565b8686604051611bb1929190613da8565b604051908190038120428252907fb857f7918bf8f9601b9f99c28b9757249f85099a67784a2c5efb73bc5975f61d9060200160405180910390a260028301546040518281526001600160a01b03909116907f713b90881ad62c4fa8ab6bd9197fa86481fc0c11b2edba60026514281b2dbac49060200160405180910390a25050505050610c2b600160fb55565b600082815260c96020526040902060010154611c5981612b22565b610ba78383612bb2565b611c6b6136ed565b60405160008051602061414e833981519152908190611c8d9086908690613da8565b90815260200160405180910390206001018054611ca990613bb3565b9050600003611ccb5760405163c5723b5160e01b815260040160405180910390fd5b6040518190611cdd9086908690613da8565b90815260200160405180910390206040518061016001604052908160008201548152602001600182018054611d1190613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611d3d90613bb3565b8015611d8a5780601f10611d5f57610100808354040283529160200191611d8a565b820191906000526020600020905b815481529060010190602001808311611d6d57829003601f168201915b505050918352505060028201546001600160a01b03166020820152600382018054604090920191611dba90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611de690613bb3565b8015611e335780601f10611e0857610100808354040283529160200191611e33565b820191906000526020600020905b815481529060010190602001808311611e1657829003601f168201915b50505050508152602001600482018054611e4c90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611e7890613bb3565b8015611ec55780601f10611e9a57610100808354040283529160200191611ec5565b820191906000526020600020905b815481529060010190602001808311611ea857829003601f168201915b50505050508152602001600582018054611ede90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611f0a90613bb3565b8015611f575780601f10611f2c57610100808354040283529160200191611f57565b820191906000526020600020905b815481529060010190602001808311611f3a57829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115611f9257611f926137db565b6003811115611fa357611fa36137db565b8152602001600982018054611fb790613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611fe390613bb3565b80156120305780601f1061200557610100808354040283529160200191612030565b820191906000526020600020905b81548152906001019060200180831161201357829003601f168201915b50505050508152602001600a8201548152505091505092915050565b612054612db6565b6000805160206141b583398151915261206c81612b22565b61207461306b565b60008051602061414e8339815191526120906114c68480613d5b565b6120a361151360408501602086016139bd565b6120b36114c66040850185613d5b565b6120c36114c66080850185613d5b565b6120d36114c660e0850185613d5b565b6120e1836101000135612e31565b806120ec8480613d5b565b6040516120fa929190613da8565b9081526020016040518091039020600101805461211690613bb3565b1590506121365760405163119b4fd360e11b815260040160405180910390fd5b8260c001358360a00135111561215f5760405163b4fa3fb360e01b815260040160405180910390fd5b6000816006015460016121729190613f11565b60068301819055604080516101608101909152818152909150602081016121998680613d5b565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506020908101906121e690604088019088016139bd565b6001600160a01b031681526020016122016040870187613d5b565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506020016122486060870187613d5b565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525060200161228f6080870187613d5b565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525093855250505060a0870135602083015260c0870135604083015260608201526080016122ee60e0870187613d5b565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506101008601356020909101528261233c8680613d5b565b60405161234a929190613da8565b90815260405160209181900382019020825181559082015160018201906123719082613f24565b5060408201516002820180546001600160a01b0319166001600160a01b03909216919091179055606082015160038201906123ac9082613f24565b50608082015160048201906123c19082613f24565b5060a082015160058201906123d69082613f24565b5060c0820151600682015560e0820151600782015561010082015160088201805460ff1916600183600381111561240f5761240f6137db565b021790555061012082015160098201906124299082613f24565b506101409190910151600a909101556000600283018161244f60408801602089016139bd565b6001600160a01b0316815260208101919091526040016000208054909150600c1161248d5760405163b4fa3fb360e01b815260040160405180910390fd5b805460018181018355600083815260209020909101839055815490036124c5576007830180549060006124bf83613c1f565b91905055505b6004830160006124db60408801602089016139bd565b6001600160a01b031681526020810191909152604001600090812080549161250283613c1f565b9091555061251290508580613d5b565b600084815260018601602052604090209161252e919083613e06565b5061253f60408601602087016139bd565b83600301600084815260200190815260200160002060006101000a8154816001600160a01b0302191690836001600160a01b031602179055506125b66040518060400160405280601b81526020017f4c6963656e736520697373756564207375636365737366756c6c790000000000815250612fd0565b6125c660408601602087016139bd565b6001600160a01b03166125d98680613d5b565b6040516125e7929190613da8565b60405190819003812060a08801358252907fefa7f33dcc4f27103d37ec2fd8cfec4d0259b56f979733389fbe6dff594e17539060200160405180910390a361263560408601602087016139bd565b6001600160a01b03167fa59f12e354e8cd10bb74c559844c2dd69a5458e31fe56c7594c62ca57480509a8360405161266f91815260200190565b60405180910390a250505050610d0b600160fb55565b60008181527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cb60205260408120805460008051602061414e8339815191529183916126cf90613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546126fb90613bb3565b80156127485780601f1061271d57610100808354040283529160200191612748565b820191906000526020600020905b81548152906001019060200180831161272b57829003601f168201915b5050505050905080516000036127715760405163c5723b5160e01b815260040160405180910390fd5b600082600001826040516127859190613bed565b908152602001604051809103902060405180610160016040529081600082015481526020016001820180546127b990613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546127e590613bb3565b80156128325780601f1061280757610100808354040283529160200191612832565b820191906000526020600020905b81548152906001019060200180831161281557829003601f168201915b505050918352505060028201546001600160a01b0316602082015260038201805460409092019161286290613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461288e90613bb3565b80156128db5780601f106128b0576101008083540402835291602001916128db565b820191906000526020600020905b8154815290600101906020018083116128be57829003601f168201915b505050505081526020016004820180546128f490613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461292090613bb3565b801561296d5780601f106129425761010080835404028352916020019161296d565b820191906000526020600020905b81548152906001019060200180831161295057829003601f168201915b5050505050815260200160058201805461298690613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546129b290613bb3565b80156129ff5780601f106129d4576101008083540402835291602001916129ff565b820191906000526020600020905b8154815290600101906020018083116129e257829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115612a3a57612a3a6137db565b6003811115612a4b57612a4b6137db565b8152602001600982018054612a5f90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054612a8b90613bb3565b8015612ad85780601f10612aad57610100808354040283529160200191612ad8565b820191906000526020600020905b815481529060010190602001808311612abb57829003601f168201915b5050509183525050600a9190910154602090910152905060008161010001516003811115612b0857612b086137db565b148015612b19575060e08101514211155b95945050505050565b610d0b8133613087565b612b36828261145f565b610c2b57600082815260c9602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612b6e3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612bbc828261145f565b15610c2b57600082815260c9602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610c2b81612b22565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615612c5757610ba7836130e0565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015612cb1575060408051601f3d908101601f19168201909252612cae91810190613fe2565b60015b612d145760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610c18565b60008051602061416e8339815191528114612d835760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610c18565b50610ba783838361317c565b6001600160a01b038116610d0b576040516342bcdf7f60e11b815260040160405180910390fd5b600260fb5403612e085760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610c18565b600260fb55565b8051600003610d0b5760405163b4fa3fb360e01b815260040160405180910390fd5b600c811115610d0b576040516341f3efc760e11b815260048101829052602401610c18565b6001600160a01b03831660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cc6020526040812060008051602061414e83398151915291612ea782886131a7565b9050612eb38282613200565b8154158015612eda57506001600160a01b0386166000908152600484016020526040902054155b15612ef757600783018054906000612ef183613ee6565b91905055505b6001600160a01b038516600081815260028501602081815260408084208054600181810183558287528487209091018e90558d865260038a01845291852080546001600160a01b03191687179055949093525290549003612f6a57600783018054906000612f6483613c1f565b91905055505b8315612fc7576001600160a01b03861660009081526004840160205260408120805491612f9683613ee6565b90915550506001600160a01b03851660009081526004840160205260408120805491612fc183613c1f565b91905055505b50505050505050565b7f5faa6392ddc6a7b1b51ccdec78988f5e9112582c71ec0ab3e76f0ca7046f74b18142604051613001929190613ffb565b60405180910390a150565b600160fb55565b600054610100900460ff1661303a5760405162461bcd60e51b8152600401610c189061401d565b565b600054610100900460ff166130635760405162461bcd60e51b8152600401610c189061401d565b61303a613296565b61012d5461303a906001600160a01b031680630acfadf26132bd565b613091828261145f565b610c2b5761309e816133bd565b6130a98360206133cf565b6040516020016130ba929190614068565b60408051601f198184030181529082905262461bcd60e51b8252610c18916004016140dd565b6001600160a01b0381163b61314d5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610c18565b60008051602061416e83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6131858361356a565b6000825111806131925750805b15610ba7576131a183836135aa565b50505050565b6000805b83548110156131e657828482815481106131c7576131c7613c38565b9060005260206000200154036131de579050610537565b6001016131ab565b5060405163c5723b5160e01b815260040160405180910390fd5b815481106132215760405163b4fa3fb360e01b815260040160405180910390fd5b81548290613231906001906140f0565b8154811061324157613241613c38565b906000526020600020015482828154811061325e5761325e613c38565b90600052602060002001819055508180548061327c5761327c614103565b600190038181906000526020600020016000905590555050565b600054610100900460ff1661300c5760405162461bcd60e51b8152600401610c189061401d565b6001600160a01b0383166133085760405162461bcd60e51b815260206004820152601260248201527110dbdb9d1c9bdb1b195c881b9bdd081cd95d60721b6044820152606401610c18565b306001600160a01b031682826040518163ffffffff1660e01b8152600401602060405180830381865afa158015613343573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906133679190614119565b6001600160a01b031614610ba75760405162461bcd60e51b815260206004820152601760248201527f436f6e7472616374206e6f7420726567697374657265640000000000000000006044820152606401610c18565b60606105376001600160a01b03831660145b606060006133de836002614136565b6133e9906002613f11565b6001600160401b03811115613400576134006139da565b6040519080825280601f01601f19166020018201604052801561342a576020820181803683370190505b509050600360fc1b8160008151811061344557613445613c38565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061347457613474613c38565b60200101906001600160f81b031916908160001a9053506000613498846002614136565b6134a3906001613f11565b90505b600181111561351b576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106134d7576134d7613c38565b1a60f81b8282815181106134ed576134ed613c38565b60200101906001600160f81b031916908160001a90535060049490941c9361351481613ee6565b90506134a6565b508315610f3a5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610c18565b613573816130e0565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060610f3a838360405180606001604052806027815260200161418e602791396060600080856001600160a01b0316856040516135e79190613bed565b600060405180830381855af49150503d8060008114613622576040519150601f19603f3d011682016040523d82523d6000602084013e613627565b606091505b509150915061363886838387613642565b9695505050505050565b606083156136b15782516000036136aa576001600160a01b0385163b6136aa5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610c18565b50816136bb565b6136bb83836136c3565b949350505050565b8151156136d35781518083602001fd5b8060405162461bcd60e51b8152600401610c1891906140dd565b604051806101600160405280600081526020016060815260200160006001600160a01b0316815260200160608152602001606081526020016060815260200160008152602001600081526020016000600381111561374d5761374d6137db565b815260200160608152602001600081525090565b60006020828403121561377357600080fd5b81356001600160e01b031981168114610f3a57600080fd5b60005b838110156137a657818101518382015260200161378e565b50506000910152565b600081518084526137c781602086016020860161378b565b601f01601f19169290920160200192915050565b634e487b7160e01b600052602160045260246000fd5b6004811061380f57634e487b7160e01b600052602160045260246000fd5b9052565b805182526000602082015161016060208501526138346101608501826137af565b9050604083015161385060408601826001600160a01b03169052565b506060830151848203606086015261386882826137af565b9150506080830151848203608086015261388282826137af565b91505060a083015184820360a086015261389c82826137af565b91505060c083015160c085015260e083015160e08501526101008301516138c76101008601826137f1565b506101208301518482036101208601526138e182826137af565b9150506101408301516101408501528091505092915050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b8281101561395357603f1987860301845261393e858351613813565b94506020938401939190910190600101613922565b50929695505050505050565b60006020828403121561397157600080fd5b5035919050565b6001600160a01b0381168114610d0b57600080fd5b600080604083850312156139a057600080fd5b8235915060208301356139b281613978565b809150509250929050565b6000602082840312156139cf57600080fd5b8135610f3a81613978565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215613a0357600080fd5b8235613a0e81613978565b915060208301356001600160401b03811115613a2957600080fd5b8301601f81018513613a3a57600080fd5b80356001600160401b03811115613a5357613a536139da565b604051601f8201601f19908116603f011681016001600160401b0381118282101715613a8157613a816139da565b604052818152828201602001871015613a9957600080fd5b816020840160208301376000602083830101528093505050509250929050565b600060208284031215613acb57600080fd5b81356001600160401b03811115613ae157600080fd5b820160e08185031215610f3a57600080fd5b60008060208385031215613b0657600080fd5b82356001600160401b03811115613b1c57600080fd5b8301601f81018513613b2d57600080fd5b80356001600160401b03811115613b4357600080fd5b856020828401011115613b5557600080fd5b6020919091019590945092505050565b602081526000610f3a6020830184613813565b600060208284031215613b8a57600080fd5b81356001600160401b03811115613ba057600080fd5b82016101208185031215610f3a57600080fd5b600181811c90821680613bc757607f821691505b602082108103613be757634e487b7160e01b600052602260045260246000fd5b50919050565b60008251613bff81846020870161378b565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b600060018201613c3157613c31613c09565b5060010190565b634e487b7160e01b600052603260045260246000fd5b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000808354613cf481613bb3565b600182168015613d0b5760018114613d2057613d50565b60ff1983168652811515820286019350613d50565b86600052602060002060005b83811015613d4857815488820152600190910190602001613d2c565b505081860193505b509195945050505050565b6000808335601e19843603018112613d7257600080fd5b8301803591506001600160401b03821115613d8c57600080fd5b602001915036819003821315613da157600080fd5b9250929050565b8183823760009101908152919050565b601f821115610ba757806000526020600020601f840160051c81016020851015613ddf5750805b601f840160051c820191505b81811015613dff5760008155600101613deb565b5050505050565b6001600160401b03831115613e1d57613e1d6139da565b613e3183613e2b8354613bb3565b83613db8565b6000601f841160018114613e655760008515613e4d5750838201355b600019600387901b1c1916600186901b178355613dff565b600083815260209020601f19861690835b82811015613e965786850135825560209485019460019092019101613e76565b5086821015613eb35760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b600060208284031215613ed757600080fd5b813560048110610f3a57600080fd5b600081613ef557613ef5613c09565b506000190190565b82815260408101610f3a60208301846137f1565b8082018082111561053757610537613c09565b81516001600160401b03811115613f3d57613f3d6139da565b613f5181613f4b8454613bb3565b84613db8565b6020601f821160018114613f855760008315613f6d5750848201515b600019600385901b1c1916600184901b178455613dff565b600084815260208120601f198516915b82811015613fb55787850151825560209485019460019092019101613f95565b5084821015613fd35786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b600060208284031215613ff457600080fd5b5051919050565b60408152600061400e60408301856137af565b90508260208301529392505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516140a081601785016020880161378b565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516140d181602884016020880161378b565b01602801949350505050565b602081526000610f3a60208301846137af565b8181038181111561053757610537613c09565b634e487b7160e01b600052603160045260246000fd5b60006020828403121561412b57600080fd5b8151610f3a81613978565b808202811582820484141761053757610537613c0956fe29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003ca360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656494ac8bf7c2c0d570b676d8037eaa0516224e8bca85d85e9465db2088d225fcaba264697066735822122033a00ef6395313010250f9520005631d988a7a0940572e2fc95a1c70f185d85064736f6c634300081a0033",
    "deployedBytecode": "0x6080604052600436106101815760003560e01c80636b4ed21b116100d1578063b1cf421f1161008a578063d547741f11610064578063d547741f14610479578063d6a7b97614610499578063dfe7a7d7146104c6578063f577a500146104e657600080fd5b8063b1cf421f14610419578063c4d66de814610439578063d02c4ed71461045957600080fd5b80636b4ed21b1461034f5780636e9546da1461038357806370a08231146103a357806391d14854146103c3578063a217fddf146103e3578063ae7f0a9f146103f857600080fd5b806336568abe1161013e5780634d320c31116101185780634d320c31146102cd5780634f1ef286146102ef57806352d1902d146103025780636352211e1461031757600080fd5b806336568abe1461026d5780633659cfe61461028d57806343945512146102ad57600080fd5b806301ffc9a71461018657806310c8434d146101bb5780631261e6ba146101f9578063248a9ca31461021b57806326019c18146101bb5780632f2ff15d1461024b575b600080fd5b34801561019257600080fd5b506101a66101a1366004613761565b610506565b60405190151581526020015b60405180910390f35b3480156101c757600080fd5b507f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003d0545b6040519081526020016101b2565b34801561020557600080fd5b5061020e61053d565b6040516101b291906138fa565b34801561022757600080fd5b506101eb61023636600461395f565b600090815260c9602052604090206001015490565b34801561025757600080fd5b5061026b61026636600461398d565b610b82565b005b34801561027957600080fd5b5061026b61028836600461398d565b610bac565b34801561029957600080fd5b5061026b6102a83660046139bd565b610c2f565b3480156102b957600080fd5b506101a66102c83660046139bd565b610d0e565b3480156102d957600080fd5b506101eb6000805160206141b583398151915281565b61026b6102fd3660046139f0565b610d56565b34801561030e57600080fd5b506101eb610e22565b34801561032357600080fd5b5061033761033236600461395f565b610ed5565b6040516001600160a01b0390911681526020016101b2565b34801561035b57600080fd5b507f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003d1546101eb565b34801561038f57600080fd5b5061020e61039e3660046139bd565b610f41565b3480156103af57600080fd5b506101eb6103be3660046139bd565b611419565b3480156103cf57600080fd5b506101a66103de36600461398d565b61145f565b3480156103ef57600080fd5b506101eb600081565b34801561040457600080fd5b5061012d54610337906001600160a01b031681565b34801561042557600080fd5b5061026b610434366004613ab9565b61148a565b34801561044557600080fd5b5061026b6104543660046139bd565b6118a5565b34801561046557600080fd5b5061026b610474366004613af3565b611a05565b34801561048557600080fd5b5061026b61049436600461398d565b611c3e565b3480156104a557600080fd5b506104b96104b4366004613af3565b611c63565b6040516101b29190613b65565b3480156104d257600080fd5b5061026b6104e1366004613b78565b61204c565b3480156104f257600080fd5b506101a661050136600461395f565b612685565b60006001600160e01b03198216637965db0b60e01b148061053757506301ffc9a760e01b6001600160e01b03198316145b92915050565b7f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003d05460609060008051602061414e83398151915290600060015b82811161067f5760008181526001850160205260408120805461059990613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546105c590613bb3565b80156106125780601f106105e757610100808354040283529160200191610612565b820191906000526020600020905b8154815290600101906020018083116105f557829003601f168201915b50505050509050600081511180156106595750600085600001826040516106399190613bed565b9081526020016040518091039020600101805461065590613bb3565b9050115b1561066c578261066881613c1f565b9350505b508061067781613c1f565b915050610577565b506000816001600160401b0381111561069a5761069a6139da565b6040519080825280602002602001820160405280156106d357816020015b6106c06136ed565b8152602001906001900390816106b85790505b509050600060015b848111610b77576000818152600187016020526040812080546106fd90613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461072990613bb3565b80156107765780601f1061074b57610100808354040283529160200191610776565b820191906000526020600020905b81548152906001019060200180831161075957829003601f168201915b50505050509050600081511180156107bd57506000876000018260405161079d9190613bed565b908152602001604051809103902060010180546107b990613bb3565b9050115b15610b645760405187906107d2908390613bed565b9081526020016040518091039020604051806101600160405290816000820154815260200160018201805461080690613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461083290613bb3565b801561087f5780601f106108545761010080835404028352916020019161087f565b820191906000526020600020905b81548152906001019060200180831161086257829003601f168201915b505050918352505060028201546001600160a01b031660208201526003820180546040909201916108af90613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546108db90613bb3565b80156109285780601f106108fd57610100808354040283529160200191610928565b820191906000526020600020905b81548152906001019060200180831161090b57829003601f168201915b5050505050815260200160048201805461094190613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461096d90613bb3565b80156109ba5780601f1061098f576101008083540402835291602001916109ba565b820191906000526020600020905b81548152906001019060200180831161099d57829003601f168201915b505050505081526020016005820180546109d390613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546109ff90613bb3565b8015610a4c5780601f10610a2157610100808354040283529160200191610a4c565b820191906000526020600020905b815481529060010190602001808311610a2f57829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115610a8757610a876137db565b6003811115610a9857610a986137db565b8152602001600982018054610aac90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054610ad890613bb3565b8015610b255780601f10610afa57610100808354040283529160200191610b25565b820191906000526020600020905b815481529060010190602001808311610b0857829003601f168201915b50505050508152602001600a82015481525050848481518110610b4a57610b4a613c38565b60200260200101819052508280610b6090613c1f565b9350505b5080610b6f81613c1f565b9150506106db565b509095945050505050565b600082815260c96020526040902060010154610b9d81612b22565b610ba78383612b2c565b505050565b6001600160a01b0381163314610c215760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610c2b8282612bb2565b5050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610c775760405162461bcd60e51b8152600401610c1890613c4e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610cc060008051602061416e833981519152546001600160a01b031690565b6001600160a01b031614610ce65760405162461bcd60e51b8152600401610c1890613c9a565b610cef81612c19565b60408051600080825260208201909252610d0b91839190612c24565b50565b6000610d1982612d8f565b506001600160a01b031660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003ce6020526040902054151590565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610d9e5760405162461bcd60e51b8152600401610c1890613c4e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610de760008051602061416e833981519152546001600160a01b031690565b6001600160a01b031614610e0d5760405162461bcd60e51b8152600401610c1890613c9a565b610e1682612c19565b610c2b82826001612c24565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610ec25760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610c18565b5060008051602061416e83398151915290565b60008181527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cd602052604081205460008051602061414e833981519152906001600160a01b031680610f3a5760405163c5723b5160e01b815260040160405180910390fd5b9392505050565b6060610f4c82612d8f565b6001600160a01b03821660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cc60209081526040808320805482518185028101850190935280835260008051602061414e8339815191529493830182828015610fd757602002820191906000526020600020905b815481526020019060010190808311610fc3575b505050505090506000815190506000816001600160401b03811115610ffe57610ffe6139da565b60405190808252806020026020018201604052801561103757816020015b6110246136ed565b81526020019060019003908161101c5790505b50905060005b8281101561140f578460000185600101600086848151811061106157611061613c38565b602002602001015181526020019081526020016000206040516110849190613ce6565b908152602001604051809103902060405180610160016040529081600082015481526020016001820180546110b890613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546110e490613bb3565b80156111315780601f1061110657610100808354040283529160200191611131565b820191906000526020600020905b81548152906001019060200180831161111457829003601f168201915b505050918352505060028201546001600160a01b0316602082015260038201805460409092019161116190613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461118d90613bb3565b80156111da5780601f106111af576101008083540402835291602001916111da565b820191906000526020600020905b8154815290600101906020018083116111bd57829003601f168201915b505050505081526020016004820180546111f390613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461121f90613bb3565b801561126c5780601f106112415761010080835404028352916020019161126c565b820191906000526020600020905b81548152906001019060200180831161124f57829003601f168201915b5050505050815260200160058201805461128590613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546112b190613bb3565b80156112fe5780601f106112d3576101008083540402835291602001916112fe565b820191906000526020600020905b8154815290600101906020018083116112e157829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115611339576113396137db565b600381111561134a5761134a6137db565b815260200160098201805461135e90613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461138a90613bb3565b80156113d75780601f106113ac576101008083540402835291602001916113d7565b820191906000526020600020905b8154815290600101906020018083116113ba57829003601f168201915b50505050508152602001600a820154815250508282815181106113fc576113fc613c38565b602090810291909101015260010161103d565b5095945050505050565b600061142482612d8f565b506001600160a01b031660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003ce602052604090205490565b600091825260c9602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611492612db6565b6000805160206141b58339815191526114aa81612b22565b60008051602061414e8339815191526115006114c68480613d5b565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612e0f92505050565b61151861151360408501602086016139bd565b612d8f565b6115258360c00135612e31565b806115308480613d5b565b60405161153e929190613da8565b9081526020016040518091039020600101805461155a90613bb3565b905060000361157c5760405163c5723b5160e01b815260040160405180910390fd5b6000816115898580613d5b565b604051611597929190613da8565b9081526040519081900360200190209050600080600883015460ff1660038111156115c4576115c46137db565b1480156115d5575060078201544211155b90508160060154856080013510156116005760405163b4fa3fb360e01b815260040160405180910390fd5b61161060408601602087016139bd565b60028301546001600160a01b0390811691161461168757815460028301546116539082906001600160a01b031661164d60408a0160208b016139bd565b85612e56565b61166360408701602088016139bd565b6002840180546001600160a01b0319166001600160a01b0392909216919091179055505b6116946040860186613d5b565b60048401916116a4919083613e06565b506116b26060860186613d5b565b60058401916116c2919083613e06565b50608085013560078301556116dd60c0860160a08701613ec5565b60088301805460ff191660018360038111156116fb576116fb6137db565b021790555060c0850135600a83015560008061171d60c0880160a08901613ec5565b600381111561172e5761172e6137db565b14801561173f575060808601354211155b905081801561174c575080155b15611798576004840160006117676040890160208a016139bd565b6001600160a01b031681526020810191909152604001600090812080549161178e83613ee6565b91905055506117eb565b811580156117a35750805b156117eb576004840160006117be6040890160208a016139bd565b6001600160a01b03168152602081019190915260400160009081208054916117e583613c1f565b91905055505b6118296040518060400160405280601c81526020017f4c6963656e73652075706461746564207375636365737366756c6c7900000000815250612fd0565b6118338680613d5b565b604051611841929190613da8565b6040519081900390207f3214c644e235b89065eee2e188f1cb6abf4ac42d92d3ecc963be51d682ac92d1608088013561188060c08a0160a08b01613ec5565b60405161188e929190613efd565b60405180910390a25050505050610d0b600160fb55565b600054610100900460ff16158080156118c55750600054600160ff909116105b806118df5750303b1580156118df575060005460ff166001145b6119425760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610c18565b6000805460ff191660011790558015611965576000805461ff0019166101001790555b61196d613013565b611975613013565b61197d61303c565b61012d80546001600160a01b0319166001600160a01b0384161790556119a4600033612b2c565b6119bc6000805160206141b583398151915233612b2c565b8015610c2b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b611a0d612db6565b6000805160206141b5833981519152611a2581612b22565b600060008051602061414e8339815191529050611a7784848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612e0f92505050565b6040518190611a899086908690613da8565b90815260200160405180910390206001018054611aa590613bb3565b9050600003611ac75760405163c5723b5160e01b815260040160405180910390fd5b6000816000018585604051611add929190613da8565b9081526040519081900360200190209050600080600883015460ff166003811115611b0a57611b0a6137db565b148015611b1b575060078201544211155b60088301805460ff1916600217905590508015611b625760028201546001600160a01b031660009081526004840160205260408120805491611b5c83613ee6565b91905055505b815460408051808201909152601c81527f4c6963656e7365207265766f6b6564207375636365737366756c6c79000000006020820152611ba190612fd0565b8686604051611bb1929190613da8565b604051908190038120428252907fb857f7918bf8f9601b9f99c28b9757249f85099a67784a2c5efb73bc5975f61d9060200160405180910390a260028301546040518281526001600160a01b03909116907f713b90881ad62c4fa8ab6bd9197fa86481fc0c11b2edba60026514281b2dbac49060200160405180910390a25050505050610c2b600160fb55565b600082815260c96020526040902060010154611c5981612b22565b610ba78383612bb2565b611c6b6136ed565b60405160008051602061414e833981519152908190611c8d9086908690613da8565b90815260200160405180910390206001018054611ca990613bb3565b9050600003611ccb5760405163c5723b5160e01b815260040160405180910390fd5b6040518190611cdd9086908690613da8565b90815260200160405180910390206040518061016001604052908160008201548152602001600182018054611d1190613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611d3d90613bb3565b8015611d8a5780601f10611d5f57610100808354040283529160200191611d8a565b820191906000526020600020905b815481529060010190602001808311611d6d57829003601f168201915b505050918352505060028201546001600160a01b03166020820152600382018054604090920191611dba90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611de690613bb3565b8015611e335780601f10611e0857610100808354040283529160200191611e33565b820191906000526020600020905b815481529060010190602001808311611e1657829003601f168201915b50505050508152602001600482018054611e4c90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611e7890613bb3565b8015611ec55780601f10611e9a57610100808354040283529160200191611ec5565b820191906000526020600020905b815481529060010190602001808311611ea857829003601f168201915b50505050508152602001600582018054611ede90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611f0a90613bb3565b8015611f575780601f10611f2c57610100808354040283529160200191611f57565b820191906000526020600020905b815481529060010190602001808311611f3a57829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115611f9257611f926137db565b6003811115611fa357611fa36137db565b8152602001600982018054611fb790613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054611fe390613bb3565b80156120305780601f1061200557610100808354040283529160200191612030565b820191906000526020600020905b81548152906001019060200180831161201357829003601f168201915b50505050508152602001600a8201548152505091505092915050565b612054612db6565b6000805160206141b583398151915261206c81612b22565b61207461306b565b60008051602061414e8339815191526120906114c68480613d5b565b6120a361151360408501602086016139bd565b6120b36114c66040850185613d5b565b6120c36114c66080850185613d5b565b6120d36114c660e0850185613d5b565b6120e1836101000135612e31565b806120ec8480613d5b565b6040516120fa929190613da8565b9081526020016040518091039020600101805461211690613bb3565b1590506121365760405163119b4fd360e11b815260040160405180910390fd5b8260c001358360a00135111561215f5760405163b4fa3fb360e01b815260040160405180910390fd5b6000816006015460016121729190613f11565b60068301819055604080516101608101909152818152909150602081016121998680613d5b565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506020908101906121e690604088019088016139bd565b6001600160a01b031681526020016122016040870187613d5b565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506020016122486060870187613d5b565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525060200161228f6080870187613d5b565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525093855250505060a0870135602083015260c0870135604083015260608201526080016122ee60e0870187613d5b565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506101008601356020909101528261233c8680613d5b565b60405161234a929190613da8565b90815260405160209181900382019020825181559082015160018201906123719082613f24565b5060408201516002820180546001600160a01b0319166001600160a01b03909216919091179055606082015160038201906123ac9082613f24565b50608082015160048201906123c19082613f24565b5060a082015160058201906123d69082613f24565b5060c0820151600682015560e0820151600782015561010082015160088201805460ff1916600183600381111561240f5761240f6137db565b021790555061012082015160098201906124299082613f24565b506101409190910151600a909101556000600283018161244f60408801602089016139bd565b6001600160a01b0316815260208101919091526040016000208054909150600c1161248d5760405163b4fa3fb360e01b815260040160405180910390fd5b805460018181018355600083815260209020909101839055815490036124c5576007830180549060006124bf83613c1f565b91905055505b6004830160006124db60408801602089016139bd565b6001600160a01b031681526020810191909152604001600090812080549161250283613c1f565b9091555061251290508580613d5b565b600084815260018601602052604090209161252e919083613e06565b5061253f60408601602087016139bd565b83600301600084815260200190815260200160002060006101000a8154816001600160a01b0302191690836001600160a01b031602179055506125b66040518060400160405280601b81526020017f4c6963656e736520697373756564207375636365737366756c6c790000000000815250612fd0565b6125c660408601602087016139bd565b6001600160a01b03166125d98680613d5b565b6040516125e7929190613da8565b60405190819003812060a08801358252907fefa7f33dcc4f27103d37ec2fd8cfec4d0259b56f979733389fbe6dff594e17539060200160405180910390a361263560408601602087016139bd565b6001600160a01b03167fa59f12e354e8cd10bb74c559844c2dd69a5458e31fe56c7594c62ca57480509a8360405161266f91815260200190565b60405180910390a250505050610d0b600160fb55565b60008181527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cb60205260408120805460008051602061414e8339815191529183916126cf90613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546126fb90613bb3565b80156127485780601f1061271d57610100808354040283529160200191612748565b820191906000526020600020905b81548152906001019060200180831161272b57829003601f168201915b5050505050905080516000036127715760405163c5723b5160e01b815260040160405180910390fd5b600082600001826040516127859190613bed565b908152602001604051809103902060405180610160016040529081600082015481526020016001820180546127b990613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546127e590613bb3565b80156128325780601f1061280757610100808354040283529160200191612832565b820191906000526020600020905b81548152906001019060200180831161281557829003601f168201915b505050918352505060028201546001600160a01b0316602082015260038201805460409092019161286290613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461288e90613bb3565b80156128db5780601f106128b0576101008083540402835291602001916128db565b820191906000526020600020905b8154815290600101906020018083116128be57829003601f168201915b505050505081526020016004820180546128f490613bb3565b80601f016020809104026020016040519081016040528092919081815260200182805461292090613bb3565b801561296d5780601f106129425761010080835404028352916020019161296d565b820191906000526020600020905b81548152906001019060200180831161295057829003601f168201915b5050505050815260200160058201805461298690613bb3565b80601f01602080910402602001604051908101604052809291908181526020018280546129b290613bb3565b80156129ff5780601f106129d4576101008083540402835291602001916129ff565b820191906000526020600020905b8154815290600101906020018083116129e257829003601f168201915b50505091835250506006820154602082015260078201546040820152600882015460609091019060ff166003811115612a3a57612a3a6137db565b6003811115612a4b57612a4b6137db565b8152602001600982018054612a5f90613bb3565b80601f0160208091040260200160405190810160405280929190818152602001828054612a8b90613bb3565b8015612ad85780601f10612aad57610100808354040283529160200191612ad8565b820191906000526020600020905b815481529060010190602001808311612abb57829003601f168201915b5050509183525050600a9190910154602090910152905060008161010001516003811115612b0857612b086137db565b148015612b19575060e08101514211155b95945050505050565b610d0b8133613087565b612b36828261145f565b610c2b57600082815260c9602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612b6e3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612bbc828261145f565b15610c2b57600082815260c9602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610c2b81612b22565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615612c5757610ba7836130e0565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015612cb1575060408051601f3d908101601f19168201909252612cae91810190613fe2565b60015b612d145760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610c18565b60008051602061416e8339815191528114612d835760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610c18565b50610ba783838361317c565b6001600160a01b038116610d0b576040516342bcdf7f60e11b815260040160405180910390fd5b600260fb5403612e085760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610c18565b600260fb55565b8051600003610d0b5760405163b4fa3fb360e01b815260040160405180910390fd5b600c811115610d0b576040516341f3efc760e11b815260048101829052602401610c18565b6001600160a01b03831660009081527f29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003cc6020526040812060008051602061414e83398151915291612ea782886131a7565b9050612eb38282613200565b8154158015612eda57506001600160a01b0386166000908152600484016020526040902054155b15612ef757600783018054906000612ef183613ee6565b91905055505b6001600160a01b038516600081815260028501602081815260408084208054600181810183558287528487209091018e90558d865260038a01845291852080546001600160a01b03191687179055949093525290549003612f6a57600783018054906000612f6483613c1f565b91905055505b8315612fc7576001600160a01b03861660009081526004840160205260408120805491612f9683613ee6565b90915550506001600160a01b03851660009081526004840160205260408120805491612fc183613c1f565b91905055505b50505050505050565b7f5faa6392ddc6a7b1b51ccdec78988f5e9112582c71ec0ab3e76f0ca7046f74b18142604051613001929190613ffb565b60405180910390a150565b600160fb55565b600054610100900460ff1661303a5760405162461bcd60e51b8152600401610c189061401d565b565b600054610100900460ff166130635760405162461bcd60e51b8152600401610c189061401d565b61303a613296565b61012d5461303a906001600160a01b031680630acfadf26132bd565b613091828261145f565b610c2b5761309e816133bd565b6130a98360206133cf565b6040516020016130ba929190614068565b60408051601f198184030181529082905262461bcd60e51b8252610c18916004016140dd565b6001600160a01b0381163b61314d5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610c18565b60008051602061416e83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6131858361356a565b6000825111806131925750805b15610ba7576131a183836135aa565b50505050565b6000805b83548110156131e657828482815481106131c7576131c7613c38565b9060005260206000200154036131de579050610537565b6001016131ab565b5060405163c5723b5160e01b815260040160405180910390fd5b815481106132215760405163b4fa3fb360e01b815260040160405180910390fd5b81548290613231906001906140f0565b8154811061324157613241613c38565b906000526020600020015482828154811061325e5761325e613c38565b90600052602060002001819055508180548061327c5761327c614103565b600190038181906000526020600020016000905590555050565b600054610100900460ff1661300c5760405162461bcd60e51b8152600401610c189061401d565b6001600160a01b0383166133085760405162461bcd60e51b815260206004820152601260248201527110dbdb9d1c9bdb1b195c881b9bdd081cd95d60721b6044820152606401610c18565b306001600160a01b031682826040518163ffffffff1660e01b8152600401602060405180830381865afa158015613343573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906133679190614119565b6001600160a01b031614610ba75760405162461bcd60e51b815260206004820152601760248201527f436f6e7472616374206e6f7420726567697374657265640000000000000000006044820152606401610c18565b60606105376001600160a01b03831660145b606060006133de836002614136565b6133e9906002613f11565b6001600160401b03811115613400576134006139da565b6040519080825280601f01601f19166020018201604052801561342a576020820181803683370190505b509050600360fc1b8160008151811061344557613445613c38565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061347457613474613c38565b60200101906001600160f81b031916908160001a9053506000613498846002614136565b6134a3906001613f11565b90505b600181111561351b576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106134d7576134d7613c38565b1a60f81b8282815181106134ed576134ed613c38565b60200101906001600160f81b031916908160001a90535060049490941c9361351481613ee6565b90506134a6565b508315610f3a5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610c18565b613573816130e0565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060610f3a838360405180606001604052806027815260200161418e602791396060600080856001600160a01b0316856040516135e79190613bed565b600060405180830381855af49150503d8060008114613622576040519150601f19603f3d011682016040523d82523d6000602084013e613627565b606091505b509150915061363886838387613642565b9695505050505050565b606083156136b15782516000036136aa576001600160a01b0385163b6136aa5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610c18565b50816136bb565b6136bb83836136c3565b949350505050565b8151156136d35781518083602001fd5b8060405162461bcd60e51b8152600401610c1891906140dd565b604051806101600160405280600081526020016060815260200160006001600160a01b0316815260200160608152602001606081526020016060815260200160008152602001600081526020016000600381111561374d5761374d6137db565b815260200160608152602001600081525090565b60006020828403121561377357600080fd5b81356001600160e01b031981168114610f3a57600080fd5b60005b838110156137a657818101518382015260200161378e565b50506000910152565b600081518084526137c781602086016020860161378b565b601f01601f19169290920160200192915050565b634e487b7160e01b600052602160045260246000fd5b6004811061380f57634e487b7160e01b600052602160045260246000fd5b9052565b805182526000602082015161016060208501526138346101608501826137af565b9050604083015161385060408601826001600160a01b03169052565b506060830151848203606086015261386882826137af565b9150506080830151848203608086015261388282826137af565b91505060a083015184820360a086015261389c82826137af565b91505060c083015160c085015260e083015160e08501526101008301516138c76101008601826137f1565b506101208301518482036101208601526138e182826137af565b9150506101408301516101408501528091505092915050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b8281101561395357603f1987860301845261393e858351613813565b94506020938401939190910190600101613922565b50929695505050505050565b60006020828403121561397157600080fd5b5035919050565b6001600160a01b0381168114610d0b57600080fd5b600080604083850312156139a057600080fd5b8235915060208301356139b281613978565b809150509250929050565b6000602082840312156139cf57600080fd5b8135610f3a81613978565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215613a0357600080fd5b8235613a0e81613978565b915060208301356001600160401b03811115613a2957600080fd5b8301601f81018513613a3a57600080fd5b80356001600160401b03811115613a5357613a536139da565b604051601f8201601f19908116603f011681016001600160401b0381118282101715613a8157613a816139da565b604052818152828201602001871015613a9957600080fd5b816020840160208301376000602083830101528093505050509250929050565b600060208284031215613acb57600080fd5b81356001600160401b03811115613ae157600080fd5b820160e08185031215610f3a57600080fd5b60008060208385031215613b0657600080fd5b82356001600160401b03811115613b1c57600080fd5b8301601f81018513613b2d57600080fd5b80356001600160401b03811115613b4357600080fd5b856020828401011115613b5557600080fd5b6020919091019590945092505050565b602081526000610f3a6020830184613813565b600060208284031215613b8a57600080fd5b81356001600160401b03811115613ba057600080fd5b82016101208185031215610f3a57600080fd5b600181811c90821680613bc757607f821691505b602082108103613be757634e487b7160e01b600052602260045260246000fd5b50919050565b60008251613bff81846020870161378b565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b600060018201613c3157613c31613c09565b5060010190565b634e487b7160e01b600052603260045260246000fd5b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000808354613cf481613bb3565b600182168015613d0b5760018114613d2057613d50565b60ff1983168652811515820286019350613d50565b86600052602060002060005b83811015613d4857815488820152600190910190602001613d2c565b505081860193505b509195945050505050565b6000808335601e19843603018112613d7257600080fd5b8301803591506001600160401b03821115613d8c57600080fd5b602001915036819003821315613da157600080fd5b9250929050565b8183823760009101908152919050565b601f821115610ba757806000526020600020601f840160051c81016020851015613ddf5750805b601f840160051c820191505b81811015613dff5760008155600101613deb565b5050505050565b6001600160401b03831115613e1d57613e1d6139da565b613e3183613e2b8354613bb3565b83613db8565b6000601f841160018114613e655760008515613e4d5750838201355b600019600387901b1c1916600186901b178355613dff565b600083815260209020601f19861690835b82811015613e965786850135825560209485019460019092019101613e76565b5086821015613eb35760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b600060208284031215613ed757600080fd5b813560048110610f3a57600080fd5b600081613ef557613ef5613c09565b506000190190565b82815260408101610f3a60208301846137f1565b8082018082111561053757610537613c09565b81516001600160401b03811115613f3d57613f3d6139da565b613f5181613f4b8454613bb3565b84613db8565b6020601f821160018114613f855760008315613f6d5750848201515b600019600385901b1c1916600184901b178455613dff565b600084815260208120601f198516915b82811015613fb55787850151825560209485019460019092019101613f95565b5084821015613fd35786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b600060208284031215613ff457600080fd5b5051919050565b60408152600061400e60408301856137af565b90508260208301529392505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516140a081601785016020880161378b565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516140d181602884016020880161378b565b01602801949350505050565b602081526000610f3a60208301846137af565b8181038181111561053757610537613c09565b634e487b7160e01b600052603160045260246000fd5b60006020828403121561412b57600080fd5b8151610f3a81613978565b808202811582820484141761053757610537613c0956fe29987a8d2e9633a94d47a2fad59c0dfe92e1991de2381acc83ab123bac1003ca360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656494ac8bf7c2c0d570b676d8037eaa0516224e8bca85d85e9465db2088d225fcaba264697066735822122033a00ef6395313010250f9520005631d988a7a0940572e2fc95a1c70f185d85064736f6c634300081a0033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
  ,
] as const;

