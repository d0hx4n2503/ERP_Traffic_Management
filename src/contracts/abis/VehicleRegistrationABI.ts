export const VehicleRegistrationABI = [
    {
        "_format": "hh-sol-artifact-1",
        "contractName": "VehicleRegistration",
        "sourceName": "contracts/core/VehicleRegistration.sol",
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
                        "internalType": "address",
                        "name": "_addressAgent",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "_vehiclePlateNo",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "Registration",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_addressAgent",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "_vehiclePlateNo",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "Revoke",
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
                        "name": "_addressAgent",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "_vehiclePlateNo",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "Update",
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
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "string",
                        "name": "vehiclePlateNo",
                        "type": "string"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "addressUser",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "VehicleRegistrationIssued",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "string",
                        "name": "vehiclePlateNo",
                        "type": "string"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "addressUser",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "VehicleRegistrationRevoked",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "string",
                        "name": "vehiclePlateNo",
                        "type": "string"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "addressUser",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "VehicleRegistrationUpdated",
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
                        "internalType": "string",
                        "name": "vehiclePlateNo",
                        "type": "string"
                    }
                ],
                "name": "RevokeVehicleRegistration",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                "name": "getAllVehicleRegistrations",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addressUser",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "identityNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehicleModel",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "chassisNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehiclePlateNo",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "colorPlate",
                                "type": "uint256"
                            },
                            {
                                "internalType": "enum Enum.Status",
                                "name": "status",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct VehicleRegistrationStruct.VehicleRegistration[]",
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
                        "internalType": "address",
                        "name": "_addressUser",
                        "type": "address"
                    }
                ],
                "name": "getVehicleByAddressUser",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addressUser",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "identityNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehicleModel",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "chassisNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehiclePlateNo",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "colorPlate",
                                "type": "uint256"
                            },
                            {
                                "internalType": "enum Enum.Status",
                                "name": "status",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct VehicleRegistrationStruct.VehicleRegistration[]",
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
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addressUser",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "identityNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehicleModel",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "chassisNo",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "vehiclePlateNo",
                                "type": "string"
                            },
                            {
                                "internalType": "enum Enum.ColorPlate",
                                "name": "colorPlate",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct VehicleRegistrationStruct.RegistrationInput",
                        "name": "input",
                        "type": "tuple"
                    }
                ],
                "name": "registerVehicleRegistration",
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
                "name": "renounceRole",
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
                        "internalType": "string",
                        "name": "__vehiclePlateNo",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "addressUser",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "identityNo",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "colorPlate",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct VehicleRegistrationStruct.RegistrationUpdateInput",
                        "name": "input",
                        "type": "tuple"
                    }
                ],
                "name": "updateVehicleRegistration",
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
        "bytecode": "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100e1565b600054610100900460ff161561008e5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116146100df576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6080516139c061011860003960008181610595015281816105d5015281816106bc015281816106fc015261078b01526139c06000f3fe60806040526004361061014b5760003560e01c80636b4ed21b116100b6578063a217fddf1161006f578063a217fddf146103f1578063ae7f0a9f14610406578063c4d66de814610427578063cda70b2b14610447578063d547741f14610467578063f577a5001461048757600080fd5b80636b4ed21b1461031b57806370a082311461034f578063745b27cd1461036f57806391d148541461038f578063954b7d75146103af5780639d6ed49f146103dc57600080fd5b8063439455121161010857806343945512146102595780634d320c31146102795780634f1ef2861461029b57806352d1902d146102ae57806353ad22c1146102c35780636352211e146102e357600080fd5b806301ffc9a714610150578063248a9ca31461018557806326019c18146101c35780632f2ff15d146101f757806336568abe146102195780633659cfe614610239575b600080fd5b34801561015c57600080fd5b5061017061016b366004612ddb565b6104a7565b60405190151581526020015b60405180910390f35b34801561019157600080fd5b506101b56101a0366004612e05565b600090815260c9602052604090206001015490565b60405190815260200161017c565b3480156101cf57600080fd5b507f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01895546101b5565b34801561020357600080fd5b50610217610212366004612e3a565b6104de565b005b34801561022557600080fd5b50610217610234366004612e3a565b610508565b34801561024557600080fd5b50610217610254366004612e66565b61058b565b34801561026557600080fd5b50610170610274366004612e66565b61066a565b34801561028557600080fd5b506101b560008051602061396b83398151915281565b6102176102a9366004612f0f565b6106b2565b3480156102ba57600080fd5b506101b561077e565b3480156102cf57600080fd5b506102176102de366004612f70565b610831565b3480156102ef57600080fd5b506103036102fe366004612e05565b610eb3565b6040516001600160a01b03909116815260200161017c565b34801561032757600080fd5b507f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01896546101b5565b34801561035b57600080fd5b506101b561036a366004612e66565b610f1f565b34801561037b57600080fd5b5061021761038a366004612faa565b610f65565b34801561039b57600080fd5b506101706103aa366004612e3a565b61118e565b3480156103bb57600080fd5b506103cf6103ca366004612e66565b6111b9565b60405161017c919061307a565b3480156103e857600080fd5b506103cf611641565b3480156103fd57600080fd5b506101b5600081565b34801561041257600080fd5b5061012d54610303906001600160a01b031681565b34801561043357600080fd5b50610217610442366004612e66565b6119e5565b34801561045357600080fd5b5061021761046236600461316d565b611b45565b34801561047357600080fd5b50610217610482366004612e3a565b611ec6565b34801561049357600080fd5b506101706104a2366004612e05565b611eeb565b60006001600160e01b03198216637965db0b60e01b14806104d857506301ffc9a760e01b6001600160e01b03198316145b92915050565b600082815260c960205260409020600101546104f98161201a565b6105038383612024565b505050565b6001600160a01b038116331461057d5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61058782826120aa565b5050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105d35760405162461bcd60e51b81526004016105749061320e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661061c600080516020613924833981519152546001600160a01b031690565b6001600160a01b0316146106425760405162461bcd60e51b81526004016105749061325a565b61064b81612111565b604080516000808252602082019092526106679183919061211c565b50565b600061067582612287565b506001600160a01b031660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a018936020526040902054151590565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106fa5760405162461bcd60e51b81526004016105749061320e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610743600080516020613924833981519152546001600160a01b031690565b6001600160a01b0316146107695760405162461bcd60e51b81526004016105749061325a565b61077282612111565b6105878282600161211c565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461081e5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610574565b5060008051602061392483398151915290565b6108396122ae565b60008051602061396b8339815191526108518161201a565b6000805160206138db8339815191526108756108706020850185612e66565b612287565b6108bf61088560208501856132a6565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061230792505050565b6108cf61088560408501856132a6565b6108df61088560608501856132a6565b6108ef61088560808501856132a6565b806108fd60808501856132a6565b60405161090b9291906132f3565b9081526020016040518091039020600401805461092790613303565b1590506109475760405163119b4fd360e11b815260040160405180910390fd5b60008160070154600161095a9190613353565b600783018190556040805160e081019091529091508061097d6020870187612e66565b6001600160a01b0316815260200185806020019061099b91906132a6565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506020016109e260408701876132a6565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001610a2960608701876132a6565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001610a7060808701876132a6565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001610aba60c0870160a08801613366565b6003811115610acb57610acb613042565b81526020016003905282610ae260808701876132a6565b604051610af09291906132f3565b90815260405160209181900382019020825181546001600160a01b0319166001600160a01b03909116178155908201516001820190610b2f90826133ea565b5060408201516002820190610b4490826133ea565b5060608201516003820190610b5990826133ea565b5060808201516004820190610b6e90826133ea565b5060a0820151816005015560c08201518160060160006101000a81548160ff02191690836006811115610ba357610ba3613042565b02179055505050600182016000610bbd6020870187612e66565b6001600160a01b031681526020810191909152604001600020610be360808601866132a6565b82546001810184556000938452602090932090920191610c0391836134a2565b50600160028301610c1760808701876132a6565b604051610c259291906132f3565b908152604051908190036020019020805491151560ff1990921691909117905560068201610c5660808601866132a6565b82546001810184556000938452602090932090920191610c7691836134a2565b50610c8460808501856132a6565b6000838152600385016020526040902091610ca09190836134a2565b50610cae6020850185612e66565b60008281526004840160209081526040822080546001600160a01b0319166001600160a01b0394909416939093179092556005840191610cf090870187612e66565b6001600160a01b0316815260208101919091526040016000908120805491610d178361355b565b9091555050600582016000610d2f6020870187612e66565b6001600160a01b03166001600160a01b0316815260200190815260200160002054600103610d6f57600882018054906000610d698361355b565b91905055505b610d9060405180606001604052806028815260200161388a60289139612329565b610d9d6020850185612e66565b6001600160a01b03167f1f3f3337f31df14aacad43af6e83e5067e33495464b7239701eaabb7f0b6832f610dd460808701876132a6565b42604051610de493929190613574565b60405180910390a2610df96020850185612e66565b6001600160a01b0316610e0f60808601866132a6565b604051610e1d9291906132f3565b604051908190038120838252907fcc17625dadbd0873617da0e7929acaba01d674a2290f903396ab54491ee862949060200160405180910390a3610e646020850185612e66565b6001600160a01b03167fa59f12e354e8cd10bb74c559844c2dd69a5458e31fe56c7594c62ca57480509a82604051610e9e91815260200190565b60405180910390a2505050610667600160fb55565b60008181527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0189260205260408120546000805160206138db833981519152906001600160a01b031680610f185760405163c5723b5160e01b815260040160405180910390fd5b9392505050565b6000610f2a82612287565b506001600160a01b031660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01893602052604090205490565b610f6d6122ae565b60008051602061396b833981519152610f858161201a565b6000805160206138db833981519152610f9d83612307565b6040518190610fad9085906135ad565b90815260200160405180910390206004018054610fc990613303565b9050600003610feb5760405163c5723b5160e01b815260040160405180910390fd5b60008160000184604051610fff91906135ad565b90815260405190819003602001902090506000600360068084015460ff169081111561102d5761102d613042565b60068401805460ff1916600517905514905080156110725781546001600160a01b03166000908152600584016020526040812080549161106c836135c9565b91905055505b600061107d8661236c565b90506110a06040518060600160405280602981526020016138fb60299139612329565b82546040516001600160a01b03909116907f67b6b7952dd940e31784c2bbc9478287b5733fb3edcd96ec77cfd0de0ba510a8906110e090899042906135e0565b60405180910390a282546040516001600160a01b03909116906111049088906135ad565b604051908190038120428252907f8a631e0681d023b36563939d8e66c2c3b81626622c31db7a4d8a8b19a6ebf43c9060200160405180910390a382546040518281526001600160a01b03909116907f713b90881ad62c4fa8ab6bd9197fa86481fc0c11b2edba60026514281b2dbac49060200160405180910390a25050505050610667600160fb55565b600091825260c9602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60606111c482612287565b6001600160a01b03821660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0188f6020908152604080832080548251818502810185019093528083526000805160206138db8339815191529493849084015b828210156112d157838290600052602060002001805461124490613303565b80601f016020809104026020016040519081016040528092919081815260200182805461127090613303565b80156112bd5780601f10611292576101008083540402835291602001916112bd565b820191906000526020600020905b8154815290600101906020018083116112a057829003601f168201915b505050505081526020019060010190611225565b505050509050600081516001600160401b038111156112f2576112f2612e81565b60405190808252806020026020018201604052801561132b57816020015b611318612d37565b8152602001906001900390816113105790505b50905060005b8251811015611638578360000183828151811061135057611350613602565b602002602001015160405161136591906135ad565b90815260408051918290036020908101832060e0840190925281546001600160a01b031683526001820180549184019161139e90613303565b80601f01602080910402602001604051908101604052809291908181526020018280546113ca90613303565b80156114175780601f106113ec57610100808354040283529160200191611417565b820191906000526020600020905b8154815290600101906020018083116113fa57829003601f168201915b5050505050815260200160028201805461143090613303565b80601f016020809104026020016040519081016040528092919081815260200182805461145c90613303565b80156114a95780601f1061147e576101008083540402835291602001916114a9565b820191906000526020600020905b81548152906001019060200180831161148c57829003601f168201915b505050505081526020016003820180546114c290613303565b80601f01602080910402602001604051908101604052809291908181526020018280546114ee90613303565b801561153b5780601f106115105761010080835404028352916020019161153b565b820191906000526020600020905b81548152906001019060200180831161151e57829003601f168201915b5050505050815260200160048201805461155490613303565b80601f016020809104026020016040519081016040528092919081815260200182805461158090613303565b80156115cd5780601f106115a2576101008083540402835291602001916115cd565b820191906000526020600020905b8154815290600101906020018083116115b057829003601f168201915b50505091835250506005820154602082015260068083015460409092019160ff16908111156115fe576115fe613042565b600681111561160f5761160f613042565b8152505082828151811061162557611625613602565b6020908102919091010152600101611331565b50949350505050565b7f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01894546060906000805160206138db833981519152906000906001600160401b0381111561169057611690612e81565b6040519080825280602002602001820160405280156116c957816020015b6116b6612d37565b8152602001906001900390816116ae5790505b50905060005b60068301548110156119de57826000018360060182815481106116f4576116f4613602565b9060005260206000200160405161170b919061368a565b90815260408051918290036020908101832060e0840190925281546001600160a01b031683526001820180549184019161174490613303565b80601f016020809104026020016040519081016040528092919081815260200182805461177090613303565b80156117bd5780601f10611792576101008083540402835291602001916117bd565b820191906000526020600020905b8154815290600101906020018083116117a057829003601f168201915b505050505081526020016002820180546117d690613303565b80601f016020809104026020016040519081016040528092919081815260200182805461180290613303565b801561184f5780601f106118245761010080835404028352916020019161184f565b820191906000526020600020905b81548152906001019060200180831161183257829003601f168201915b5050505050815260200160038201805461186890613303565b80601f016020809104026020016040519081016040528092919081815260200182805461189490613303565b80156118e15780601f106118b6576101008083540402835291602001916118e1565b820191906000526020600020905b8154815290600101906020018083116118c457829003601f168201915b505050505081526020016004820180546118fa90613303565b80601f016020809104026020016040519081016040528092919081815260200182805461192690613303565b80156119735780601f1061194857610100808354040283529160200191611973565b820191906000526020600020905b81548152906001019060200180831161195657829003601f168201915b50505091835250506005820154602082015260068083015460409092019160ff16908111156119a4576119a4613042565b60068111156119b5576119b5613042565b815250508282815181106119cb576119cb613602565b60209081029190910101526001016116cf565b5092915050565b600054610100900460ff1615808015611a055750600054600160ff909116105b80611a1f5750303b158015611a1f575060005460ff166001145b611a825760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610574565b6000805460ff191660011790558015611aa5576000805461ff0019166101001790555b611aad6123f5565b611ab56123f5565b611abd61241e565b61012d80546001600160a01b0319166001600160a01b038416179055611ae4600033612024565b611afc60008051602061396b83398151915233612024565b8015610587576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b611b4d6122ae565b60008051602061396b833981519152611b658161201a565b60006000805160206138db8339815191529050611bb785858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061230792505050565b611bc761088560208501856132a6565b611bd76108706020850185612e66565b6040518190611be990879087906132f3565b90815260200160405180910390206004018054611c0590613303565b9050600003611c275760405163c5723b5160e01b815260040160405180910390fd5b6000816000018686604051611c3d9291906132f3565b90815260405190819003602001902090506000600360068084015460ff1690811115611c6b57611c6b613042565b149050611c7b6020860186612e66565b82546001600160a01b03908116911614611cf9576000611cd088888080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061236c92505050565b8354909150611cf79082906001600160a01b0316611cf160208a018a612e66565b8561244d565b505b611d0660208601866132a6565b6001840191611d169190836134a2565b50604085013560058301556000600360068085015460ff1690811115611d3e57611d3e613042565b149050818015611d4c575080155b15611d9557600584016000611d646020890189612e66565b6001600160a01b0316815260208101919091526040016000908120805491611d8b836135c9565b9190505550611de5565b81158015611da05750805b15611de557600584016000611db86020890189612e66565b6001600160a01b0316815260208101919091526040016000908120805491611ddf8361355b565b91905055505b611e066040518060600160405280602981526020016138b260299139612329565b611e136020870187612e66565b6001600160a01b03167f1050382584d7197f6391781a2b1f69e2f09403b138a14ae11aabb4273dcc5f1b898942604051611e4f93929190613574565b60405180910390a2611e646020870187612e66565b6001600160a01b03168888604051611e7d9291906132f3565b604051908190038120428252907fe07e2e7593ebfb256eae6b40dcc9f6b892c93008ffcf0f9e5e0e203db274a6c59060200160405180910390a35050505050610503600160fb55565b600082815260c96020526040902060010154611ee18161201a565b61050383836120aa565b60008181527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a018916020526040812080546000805160206138db833981519152918391611f3590613303565b80601f0160208091040260200160405190810160405280929190818152602001828054611f6190613303565b8015611fae5780601f10611f8357610100808354040283529160200191611fae565b820191906000526020600020905b815481529060010190602001808311611f9157829003601f168201915b505050505090508051600003611fd75760405163c5723b5160e01b815260040160405180910390fd5b60036040518390611fe99084906135ad565b90815260405190819003602001902060069081015460ff169081111561201157612011613042565b14949350505050565b6106678133612770565b61202e828261118e565b61058757600082815260c9602090815260408083206001600160a01b03851684529091529020805460ff191660011790556120663390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6120b4828261118e565b1561058757600082815260c9602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60006105878161201a565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff161561214f57610503836127c9565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156121a9575060408051601f3d908101601f191682019092526121a691810190613696565b60015b61220c5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610574565b600080516020613924833981519152811461227b5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610574565b50610503838383612865565b6001600160a01b038116610667576040516342bcdf7f60e11b815260040160405180910390fd5b600260fb54036123005760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610574565b600260fb55565b80516000036106675760405163b4fa3fb360e01b815260040160405180910390fd5b7f5faa6392ddc6a7b1b51ccdec78988f5e9112582c71ec0ab3e76f0ca7046f74b1814260405161235a9291906135e0565b60405180910390a150565b600160fb55565b60006000805160206138db83398151915260015b816007015481116123db5783805190602001208260030160008381526020019081526020016000206040516123b5919061368a565b6040518091039020036123c9579392505050565b806123d38161355b565b915050612380565b5060405163c5723b5160e01b815260040160405180910390fd5b600054610100900460ff1661241c5760405162461bcd60e51b8152600401610574906136af565b565b600054610100900460ff166124455760405162461bcd60e51b8152600401610574906136af565b61241c612890565b6001600160a01b03831660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0188f602090815260408083208784527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01891909252822080546000805160206138db8339815191529391906124cd90613303565b80601f01602080910402602001604051908101604052809291908181526020018280546124f990613303565b80156125465780601f1061251b57610100808354040283529160200191612546565b820191906000526020600020905b81548152906001019060200180831161252957829003601f168201915b50505050509050600061262983805480602002602001604051908101604052809291908181526020016000905b8282101561261f57838290600052602060002001805461259290613303565b80601f01602080910402602001604051908101604052809291908181526020018280546125be90613303565b801561260b5780601f106125e05761010080835404028352916020019161260b565b820191906000526020600020905b8154815290600101906020018083116125ee57829003601f168201915b505050505081526020019060010190612573565b50505050836128b7565b9050612635838261293c565b825415801561265c57506001600160a01b0387166000908152600585016020526040902054155b1561267957600884018054906000612673836135c9565b91905055505b6001600160a01b03861660009081526001808601602090815260408320805492830181558352909120016126ad83826133ea565b506000888152600485016020908152604080832080546001600160a01b0319166001600160a01b038b1690811790915583526001808801909252909120549003612709576008840180549060006127038361355b565b91905055505b8415612766576001600160a01b03871660009081526005850160205260408120805491612735836135c9565b90915550506001600160a01b038616600090815260058501602052604081208054916127608361355b565b91905055505b5050505050505050565b61277a828261118e565b6105875761278781612a07565b612792836020612a19565b6040516020016127a39291906136fa565b60408051601f198184030181529082905262461bcd60e51b82526105749160040161376f565b6001600160a01b0381163b6128365760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610574565b60008051602061392483398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61286e83612bb4565b60008251118061287b5750805b156105035761288a8383612bf4565b50505050565b600054610100900460ff166123655760405162461bcd60e51b8152600401610574906136af565b6000805b83518110156129015782805190602001208482815181106128de576128de613602565b602002602001015180519060200120036128f95790506104d8565b6001016128bb565b5060405162461bcd60e51b815260206004820152600f60248201526e15985b1d59481b9bdd08199bdd5b99608a1b6044820152606401610574565b815481106129825760405162461bcd60e51b8152602060048201526013602482015272496e646578206f7574206f6620626f756e647360681b6044820152606401610574565b8154829061299290600190613782565b815481106129a2576129a2613602565b906000526020600020018282815481106129be576129be613602565b9060005260206000200190816129d49190613795565b50818054806129e5576129e561385c565b600190038181906000526020600020016000612a019190612d8d565b90555050565b60606104d86001600160a01b03831660145b60606000612a28836002613872565b612a33906002613353565b6001600160401b03811115612a4a57612a4a612e81565b6040519080825280601f01601f191660200182016040528015612a74576020820181803683370190505b509050600360fc1b81600081518110612a8f57612a8f613602565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612abe57612abe613602565b60200101906001600160f81b031916908160001a9053506000612ae2846002613872565b612aed906001613353565b90505b6001811115612b65576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612b2157612b21613602565b1a60f81b828281518110612b3757612b37613602565b60200101906001600160f81b031916908160001a90535060049490941c93612b5e816135c9565b9050612af0565b508315610f185760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610574565b612bbd816127c9565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060610f188383604051806060016040528060278152602001613944602791396060600080856001600160a01b031685604051612c3191906135ad565b600060405180830381855af49150503d8060008114612c6c576040519150601f19603f3d011682016040523d82523d6000602084013e612c71565b606091505b5091509150612c8286838387612c8c565b9695505050505050565b60608315612cfb578251600003612cf4576001600160a01b0385163b612cf45760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610574565b5081612d05565b612d058383612d0d565b949350505050565b815115612d1d5781518083602001fd5b8060405162461bcd60e51b8152600401610574919061376f565b6040518060e0016040528060006001600160a01b03168152602001606081526020016060815260200160608152602001606081526020016000815260200160006006811115612d8857612d88613042565b905290565b508054612d9990613303565b6000825580601f10612da9575050565b601f01602090049060005260206000209081019061066791905b80821115612dd75760008155600101612dc3565b5090565b600060208284031215612ded57600080fd5b81356001600160e01b031981168114610f1857600080fd5b600060208284031215612e1757600080fd5b5035919050565b80356001600160a01b0381168114612e3557600080fd5b919050565b60008060408385031215612e4d57600080fd5b82359150612e5d60208401612e1e565b90509250929050565b600060208284031215612e7857600080fd5b610f1882612e1e565b634e487b7160e01b600052604160045260246000fd5b6000806001600160401b03841115612eb157612eb1612e81565b50604051601f19601f85018116603f011681018181106001600160401b0382111715612edf57612edf612e81565b604052838152905080828401851015612ef757600080fd5b83836020830137600060208583010152509392505050565b60008060408385031215612f2257600080fd5b612f2b83612e1e565b915060208301356001600160401b03811115612f4657600080fd5b8301601f81018513612f5757600080fd5b612f6685823560208401612e97565b9150509250929050565b600060208284031215612f8257600080fd5b81356001600160401b03811115612f9857600080fd5b820160c08185031215610f1857600080fd5b600060208284031215612fbc57600080fd5b81356001600160401b03811115612fd257600080fd5b8201601f81018413612fe357600080fd5b612d0584823560208401612e97565b60005b8381101561300d578181015183820152602001612ff5565b50506000910152565b6000815180845261302e816020860160208601612ff2565b601f01601f19169290920160200192915050565b634e487b7160e01b600052602160045260246000fd5b6007811061307657634e487b7160e01b600052602160045260246000fd5b9052565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b8281101561316157868503603f19018452815180516001600160a01b0316865260208082015160e0918801829052906130dd90880182613016565b9050604082015187820360408901526130f68282613016565b915050606082015187820360608901526131108282613016565b9150506080820151878203608089015261312a8282613016565b91505060a082015160a088015260c0820151915061314b60c0880183613058565b95505060209384019391909101906001016130a2565b50929695505050505050565b60008060006040848603121561318257600080fd5b83356001600160401b0381111561319857600080fd5b8401601f810186136131a957600080fd5b80356001600160401b038111156131bf57600080fd5b8660208284010111156131d157600080fd5b6020918201945092508401356001600160401b038111156131f157600080fd5b84016060818703121561320357600080fd5b809150509250925092565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000808335601e198436030181126132bd57600080fd5b8301803591506001600160401b038211156132d757600080fd5b6020019150368190038213156132ec57600080fd5b9250929050565b8183823760009101908152919050565b600181811c9082168061331757607f821691505b60208210810361333757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156104d8576104d861333d565b60006020828403121561337857600080fd5b813560048110610f1857600080fd5b601f82111561050357806000526020600020601f840160051c810160208510156133ae5750805b601f840160051c820191505b818110156133ce57600081556001016133ba565b5050505050565b600019600383901b1c191660019190911b1790565b81516001600160401b0381111561340357613403612e81565b613417816134118454613303565b84613387565b6020601f82116001811461344557600083156134335750848201515b61343d84826133d5565b8555506133ce565b600084815260208120601f198516915b828110156134755787850151825560209485019460019092019101613455565b50848210156134935786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6001600160401b038311156134b9576134b9612e81565b6134cd836134c78354613303565b83613387565b6000601f8411600181146134fb57600085156134e95750838201355b6134f386826133d5565b8455506133ce565b600083815260209020601f19861690835b8281101561352c578685013582556020948501946001909201910161350c565b50868210156135495760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b60006001820161356d5761356d61333d565b5060010190565b604081528260408201528284606083013760006060848301015260006060601f19601f8601168301019050826020830152949350505050565b600082516135bf818460208701612ff2565b9190910192915050565b6000816135d8576135d861333d565b506000190190565b6040815260006135f36040830185613016565b90508260208301529392505050565b634e487b7160e01b600052603260045260246000fd5b6000815461362581613303565b60018216801561363c576001811461365157613681565b60ff1983168652811515820286019350613681565b84600052602060002060005b838110156136795781548882015260019091019060200161365d565b505081860193505b50505092915050565b6000610f188284613618565b6000602082840312156136a857600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613732816017850160208801612ff2565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613763816028840160208801612ff2565b01602801949350505050565b602081526000610f186020830184613016565b818103818111156104d8576104d861333d565b8181036137a0575050565b6137aa8254613303565b6001600160401b038111156137c1576137c1612e81565b6137cf816134118454613303565b6000601f8211600181146137f4576000831561343357508482015461343d84826133d5565b600085815260209020601f19841690600086815260209020845b8381101561382e578286015482556001958601959091019060200161380e565b508583101561384c5781850154600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052603160045260246000fd5b80820281158282048414176104d8576104d861333d56fe56656869636c6520726567697374726174696f6e20697373756564207375636365737366756c6c7956656869636c6520726567697374726174696f6e2075706461746564207375636365737366756c6c7924a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0188e56656869636c6520726567697374726174696f6e207265766f6b6564207375636365737366756c6c79360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656494ac8bf7c2c0d570b676d8037eaa0516224e8bca85d85e9465db2088d225fcaba2646970667358221220528019b6146df31afa93472aac377e1b0a893bae388b0141f6192955e6ca243c64736f6c634300081a0033",
        "deployedBytecode": "0x60806040526004361061014b5760003560e01c80636b4ed21b116100b6578063a217fddf1161006f578063a217fddf146103f1578063ae7f0a9f14610406578063c4d66de814610427578063cda70b2b14610447578063d547741f14610467578063f577a5001461048757600080fd5b80636b4ed21b1461031b57806370a082311461034f578063745b27cd1461036f57806391d148541461038f578063954b7d75146103af5780639d6ed49f146103dc57600080fd5b8063439455121161010857806343945512146102595780634d320c31146102795780634f1ef2861461029b57806352d1902d146102ae57806353ad22c1146102c35780636352211e146102e357600080fd5b806301ffc9a714610150578063248a9ca31461018557806326019c18146101c35780632f2ff15d146101f757806336568abe146102195780633659cfe614610239575b600080fd5b34801561015c57600080fd5b5061017061016b366004612ddb565b6104a7565b60405190151581526020015b60405180910390f35b34801561019157600080fd5b506101b56101a0366004612e05565b600090815260c9602052604090206001015490565b60405190815260200161017c565b3480156101cf57600080fd5b507f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01895546101b5565b34801561020357600080fd5b50610217610212366004612e3a565b6104de565b005b34801561022557600080fd5b50610217610234366004612e3a565b610508565b34801561024557600080fd5b50610217610254366004612e66565b61058b565b34801561026557600080fd5b50610170610274366004612e66565b61066a565b34801561028557600080fd5b506101b560008051602061396b83398151915281565b6102176102a9366004612f0f565b6106b2565b3480156102ba57600080fd5b506101b561077e565b3480156102cf57600080fd5b506102176102de366004612f70565b610831565b3480156102ef57600080fd5b506103036102fe366004612e05565b610eb3565b6040516001600160a01b03909116815260200161017c565b34801561032757600080fd5b507f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01896546101b5565b34801561035b57600080fd5b506101b561036a366004612e66565b610f1f565b34801561037b57600080fd5b5061021761038a366004612faa565b610f65565b34801561039b57600080fd5b506101706103aa366004612e3a565b61118e565b3480156103bb57600080fd5b506103cf6103ca366004612e66565b6111b9565b60405161017c919061307a565b3480156103e857600080fd5b506103cf611641565b3480156103fd57600080fd5b506101b5600081565b34801561041257600080fd5b5061012d54610303906001600160a01b031681565b34801561043357600080fd5b50610217610442366004612e66565b6119e5565b34801561045357600080fd5b5061021761046236600461316d565b611b45565b34801561047357600080fd5b50610217610482366004612e3a565b611ec6565b34801561049357600080fd5b506101706104a2366004612e05565b611eeb565b60006001600160e01b03198216637965db0b60e01b14806104d857506301ffc9a760e01b6001600160e01b03198316145b92915050565b600082815260c960205260409020600101546104f98161201a565b6105038383612024565b505050565b6001600160a01b038116331461057d5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61058782826120aa565b5050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036105d35760405162461bcd60e51b81526004016105749061320e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661061c600080516020613924833981519152546001600160a01b031690565b6001600160a01b0316146106425760405162461bcd60e51b81526004016105749061325a565b61064b81612111565b604080516000808252602082019092526106679183919061211c565b50565b600061067582612287565b506001600160a01b031660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a018936020526040902054151590565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106fa5760405162461bcd60e51b81526004016105749061320e565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610743600080516020613924833981519152546001600160a01b031690565b6001600160a01b0316146107695760405162461bcd60e51b81526004016105749061325a565b61077282612111565b6105878282600161211c565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461081e5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610574565b5060008051602061392483398151915290565b6108396122ae565b60008051602061396b8339815191526108518161201a565b6000805160206138db8339815191526108756108706020850185612e66565b612287565b6108bf61088560208501856132a6565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061230792505050565b6108cf61088560408501856132a6565b6108df61088560608501856132a6565b6108ef61088560808501856132a6565b806108fd60808501856132a6565b60405161090b9291906132f3565b9081526020016040518091039020600401805461092790613303565b1590506109475760405163119b4fd360e11b815260040160405180910390fd5b60008160070154600161095a9190613353565b600783018190556040805160e081019091529091508061097d6020870187612e66565b6001600160a01b0316815260200185806020019061099b91906132a6565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050908252506020016109e260408701876132a6565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001610a2960608701876132a6565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001610a7060808701876132a6565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001610aba60c0870160a08801613366565b6003811115610acb57610acb613042565b81526020016003905282610ae260808701876132a6565b604051610af09291906132f3565b90815260405160209181900382019020825181546001600160a01b0319166001600160a01b03909116178155908201516001820190610b2f90826133ea565b5060408201516002820190610b4490826133ea565b5060608201516003820190610b5990826133ea565b5060808201516004820190610b6e90826133ea565b5060a0820151816005015560c08201518160060160006101000a81548160ff02191690836006811115610ba357610ba3613042565b02179055505050600182016000610bbd6020870187612e66565b6001600160a01b031681526020810191909152604001600020610be360808601866132a6565b82546001810184556000938452602090932090920191610c0391836134a2565b50600160028301610c1760808701876132a6565b604051610c259291906132f3565b908152604051908190036020019020805491151560ff1990921691909117905560068201610c5660808601866132a6565b82546001810184556000938452602090932090920191610c7691836134a2565b50610c8460808501856132a6565b6000838152600385016020526040902091610ca09190836134a2565b50610cae6020850185612e66565b60008281526004840160209081526040822080546001600160a01b0319166001600160a01b0394909416939093179092556005840191610cf090870187612e66565b6001600160a01b0316815260208101919091526040016000908120805491610d178361355b565b9091555050600582016000610d2f6020870187612e66565b6001600160a01b03166001600160a01b0316815260200190815260200160002054600103610d6f57600882018054906000610d698361355b565b91905055505b610d9060405180606001604052806028815260200161388a60289139612329565b610d9d6020850185612e66565b6001600160a01b03167f1f3f3337f31df14aacad43af6e83e5067e33495464b7239701eaabb7f0b6832f610dd460808701876132a6565b42604051610de493929190613574565b60405180910390a2610df96020850185612e66565b6001600160a01b0316610e0f60808601866132a6565b604051610e1d9291906132f3565b604051908190038120838252907fcc17625dadbd0873617da0e7929acaba01d674a2290f903396ab54491ee862949060200160405180910390a3610e646020850185612e66565b6001600160a01b03167fa59f12e354e8cd10bb74c559844c2dd69a5458e31fe56c7594c62ca57480509a82604051610e9e91815260200190565b60405180910390a2505050610667600160fb55565b60008181527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0189260205260408120546000805160206138db833981519152906001600160a01b031680610f185760405163c5723b5160e01b815260040160405180910390fd5b9392505050565b6000610f2a82612287565b506001600160a01b031660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01893602052604090205490565b610f6d6122ae565b60008051602061396b833981519152610f858161201a565b6000805160206138db833981519152610f9d83612307565b6040518190610fad9085906135ad565b90815260200160405180910390206004018054610fc990613303565b9050600003610feb5760405163c5723b5160e01b815260040160405180910390fd5b60008160000184604051610fff91906135ad565b90815260405190819003602001902090506000600360068084015460ff169081111561102d5761102d613042565b60068401805460ff1916600517905514905080156110725781546001600160a01b03166000908152600584016020526040812080549161106c836135c9565b91905055505b600061107d8661236c565b90506110a06040518060600160405280602981526020016138fb60299139612329565b82546040516001600160a01b03909116907f67b6b7952dd940e31784c2bbc9478287b5733fb3edcd96ec77cfd0de0ba510a8906110e090899042906135e0565b60405180910390a282546040516001600160a01b03909116906111049088906135ad565b604051908190038120428252907f8a631e0681d023b36563939d8e66c2c3b81626622c31db7a4d8a8b19a6ebf43c9060200160405180910390a382546040518281526001600160a01b03909116907f713b90881ad62c4fa8ab6bd9197fa86481fc0c11b2edba60026514281b2dbac49060200160405180910390a25050505050610667600160fb55565b600091825260c9602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60606111c482612287565b6001600160a01b03821660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0188f6020908152604080832080548251818502810185019093528083526000805160206138db8339815191529493849084015b828210156112d157838290600052602060002001805461124490613303565b80601f016020809104026020016040519081016040528092919081815260200182805461127090613303565b80156112bd5780601f10611292576101008083540402835291602001916112bd565b820191906000526020600020905b8154815290600101906020018083116112a057829003601f168201915b505050505081526020019060010190611225565b505050509050600081516001600160401b038111156112f2576112f2612e81565b60405190808252806020026020018201604052801561132b57816020015b611318612d37565b8152602001906001900390816113105790505b50905060005b8251811015611638578360000183828151811061135057611350613602565b602002602001015160405161136591906135ad565b90815260408051918290036020908101832060e0840190925281546001600160a01b031683526001820180549184019161139e90613303565b80601f01602080910402602001604051908101604052809291908181526020018280546113ca90613303565b80156114175780601f106113ec57610100808354040283529160200191611417565b820191906000526020600020905b8154815290600101906020018083116113fa57829003601f168201915b5050505050815260200160028201805461143090613303565b80601f016020809104026020016040519081016040528092919081815260200182805461145c90613303565b80156114a95780601f1061147e576101008083540402835291602001916114a9565b820191906000526020600020905b81548152906001019060200180831161148c57829003601f168201915b505050505081526020016003820180546114c290613303565b80601f01602080910402602001604051908101604052809291908181526020018280546114ee90613303565b801561153b5780601f106115105761010080835404028352916020019161153b565b820191906000526020600020905b81548152906001019060200180831161151e57829003601f168201915b5050505050815260200160048201805461155490613303565b80601f016020809104026020016040519081016040528092919081815260200182805461158090613303565b80156115cd5780601f106115a2576101008083540402835291602001916115cd565b820191906000526020600020905b8154815290600101906020018083116115b057829003601f168201915b50505091835250506005820154602082015260068083015460409092019160ff16908111156115fe576115fe613042565b600681111561160f5761160f613042565b8152505082828151811061162557611625613602565b6020908102919091010152600101611331565b50949350505050565b7f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01894546060906000805160206138db833981519152906000906001600160401b0381111561169057611690612e81565b6040519080825280602002602001820160405280156116c957816020015b6116b6612d37565b8152602001906001900390816116ae5790505b50905060005b60068301548110156119de57826000018360060182815481106116f4576116f4613602565b9060005260206000200160405161170b919061368a565b90815260408051918290036020908101832060e0840190925281546001600160a01b031683526001820180549184019161174490613303565b80601f016020809104026020016040519081016040528092919081815260200182805461177090613303565b80156117bd5780601f10611792576101008083540402835291602001916117bd565b820191906000526020600020905b8154815290600101906020018083116117a057829003601f168201915b505050505081526020016002820180546117d690613303565b80601f016020809104026020016040519081016040528092919081815260200182805461180290613303565b801561184f5780601f106118245761010080835404028352916020019161184f565b820191906000526020600020905b81548152906001019060200180831161183257829003601f168201915b5050505050815260200160038201805461186890613303565b80601f016020809104026020016040519081016040528092919081815260200182805461189490613303565b80156118e15780601f106118b6576101008083540402835291602001916118e1565b820191906000526020600020905b8154815290600101906020018083116118c457829003601f168201915b505050505081526020016004820180546118fa90613303565b80601f016020809104026020016040519081016040528092919081815260200182805461192690613303565b80156119735780601f1061194857610100808354040283529160200191611973565b820191906000526020600020905b81548152906001019060200180831161195657829003601f168201915b50505091835250506005820154602082015260068083015460409092019160ff16908111156119a4576119a4613042565b60068111156119b5576119b5613042565b815250508282815181106119cb576119cb613602565b60209081029190910101526001016116cf565b5092915050565b600054610100900460ff1615808015611a055750600054600160ff909116105b80611a1f5750303b158015611a1f575060005460ff166001145b611a825760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610574565b6000805460ff191660011790558015611aa5576000805461ff0019166101001790555b611aad6123f5565b611ab56123f5565b611abd61241e565b61012d80546001600160a01b0319166001600160a01b038416179055611ae4600033612024565b611afc60008051602061396b83398151915233612024565b8015610587576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b611b4d6122ae565b60008051602061396b833981519152611b658161201a565b60006000805160206138db8339815191529050611bb785858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061230792505050565b611bc761088560208501856132a6565b611bd76108706020850185612e66565b6040518190611be990879087906132f3565b90815260200160405180910390206004018054611c0590613303565b9050600003611c275760405163c5723b5160e01b815260040160405180910390fd5b6000816000018686604051611c3d9291906132f3565b90815260405190819003602001902090506000600360068084015460ff1690811115611c6b57611c6b613042565b149050611c7b6020860186612e66565b82546001600160a01b03908116911614611cf9576000611cd088888080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061236c92505050565b8354909150611cf79082906001600160a01b0316611cf160208a018a612e66565b8561244d565b505b611d0660208601866132a6565b6001840191611d169190836134a2565b50604085013560058301556000600360068085015460ff1690811115611d3e57611d3e613042565b149050818015611d4c575080155b15611d9557600584016000611d646020890189612e66565b6001600160a01b0316815260208101919091526040016000908120805491611d8b836135c9565b9190505550611de5565b81158015611da05750805b15611de557600584016000611db86020890189612e66565b6001600160a01b0316815260208101919091526040016000908120805491611ddf8361355b565b91905055505b611e066040518060600160405280602981526020016138b260299139612329565b611e136020870187612e66565b6001600160a01b03167f1050382584d7197f6391781a2b1f69e2f09403b138a14ae11aabb4273dcc5f1b898942604051611e4f93929190613574565b60405180910390a2611e646020870187612e66565b6001600160a01b03168888604051611e7d9291906132f3565b604051908190038120428252907fe07e2e7593ebfb256eae6b40dcc9f6b892c93008ffcf0f9e5e0e203db274a6c59060200160405180910390a35050505050610503600160fb55565b600082815260c96020526040902060010154611ee18161201a565b61050383836120aa565b60008181527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a018916020526040812080546000805160206138db833981519152918391611f3590613303565b80601f0160208091040260200160405190810160405280929190818152602001828054611f6190613303565b8015611fae5780601f10611f8357610100808354040283529160200191611fae565b820191906000526020600020905b815481529060010190602001808311611f9157829003601f168201915b505050505090508051600003611fd75760405163c5723b5160e01b815260040160405180910390fd5b60036040518390611fe99084906135ad565b90815260405190819003602001902060069081015460ff169081111561201157612011613042565b14949350505050565b6106678133612770565b61202e828261118e565b61058757600082815260c9602090815260408083206001600160a01b03851684529091529020805460ff191660011790556120663390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6120b4828261118e565b1561058757600082815260c9602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60006105878161201a565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff161561214f57610503836127c9565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156121a9575060408051601f3d908101601f191682019092526121a691810190613696565b60015b61220c5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610574565b600080516020613924833981519152811461227b5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610574565b50610503838383612865565b6001600160a01b038116610667576040516342bcdf7f60e11b815260040160405180910390fd5b600260fb54036123005760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610574565b600260fb55565b80516000036106675760405163b4fa3fb360e01b815260040160405180910390fd5b7f5faa6392ddc6a7b1b51ccdec78988f5e9112582c71ec0ab3e76f0ca7046f74b1814260405161235a9291906135e0565b60405180910390a150565b600160fb55565b60006000805160206138db83398151915260015b816007015481116123db5783805190602001208260030160008381526020019081526020016000206040516123b5919061368a565b6040518091039020036123c9579392505050565b806123d38161355b565b915050612380565b5060405163c5723b5160e01b815260040160405180910390fd5b600054610100900460ff1661241c5760405162461bcd60e51b8152600401610574906136af565b565b600054610100900460ff166124455760405162461bcd60e51b8152600401610574906136af565b61241c612890565b6001600160a01b03831660009081527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0188f602090815260408083208784527f24a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a01891909252822080546000805160206138db8339815191529391906124cd90613303565b80601f01602080910402602001604051908101604052809291908181526020018280546124f990613303565b80156125465780601f1061251b57610100808354040283529160200191612546565b820191906000526020600020905b81548152906001019060200180831161252957829003601f168201915b50505050509050600061262983805480602002602001604051908101604052809291908181526020016000905b8282101561261f57838290600052602060002001805461259290613303565b80601f01602080910402602001604051908101604052809291908181526020018280546125be90613303565b801561260b5780601f106125e05761010080835404028352916020019161260b565b820191906000526020600020905b8154815290600101906020018083116125ee57829003601f168201915b505050505081526020019060010190612573565b50505050836128b7565b9050612635838261293c565b825415801561265c57506001600160a01b0387166000908152600585016020526040902054155b1561267957600884018054906000612673836135c9565b91905055505b6001600160a01b03861660009081526001808601602090815260408320805492830181558352909120016126ad83826133ea565b506000888152600485016020908152604080832080546001600160a01b0319166001600160a01b038b1690811790915583526001808801909252909120549003612709576008840180549060006127038361355b565b91905055505b8415612766576001600160a01b03871660009081526005850160205260408120805491612735836135c9565b90915550506001600160a01b038616600090815260058501602052604081208054916127608361355b565b91905055505b5050505050505050565b61277a828261118e565b6105875761278781612a07565b612792836020612a19565b6040516020016127a39291906136fa565b60408051601f198184030181529082905262461bcd60e51b82526105749160040161376f565b6001600160a01b0381163b6128365760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610574565b60008051602061392483398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61286e83612bb4565b60008251118061287b5750805b156105035761288a8383612bf4565b50505050565b600054610100900460ff166123655760405162461bcd60e51b8152600401610574906136af565b6000805b83518110156129015782805190602001208482815181106128de576128de613602565b602002602001015180519060200120036128f95790506104d8565b6001016128bb565b5060405162461bcd60e51b815260206004820152600f60248201526e15985b1d59481b9bdd08199bdd5b99608a1b6044820152606401610574565b815481106129825760405162461bcd60e51b8152602060048201526013602482015272496e646578206f7574206f6620626f756e647360681b6044820152606401610574565b8154829061299290600190613782565b815481106129a2576129a2613602565b906000526020600020018282815481106129be576129be613602565b9060005260206000200190816129d49190613795565b50818054806129e5576129e561385c565b600190038181906000526020600020016000612a019190612d8d565b90555050565b60606104d86001600160a01b03831660145b60606000612a28836002613872565b612a33906002613353565b6001600160401b03811115612a4a57612a4a612e81565b6040519080825280601f01601f191660200182016040528015612a74576020820181803683370190505b509050600360fc1b81600081518110612a8f57612a8f613602565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612abe57612abe613602565b60200101906001600160f81b031916908160001a9053506000612ae2846002613872565b612aed906001613353565b90505b6001811115612b65576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612b2157612b21613602565b1a60f81b828281518110612b3757612b37613602565b60200101906001600160f81b031916908160001a90535060049490941c93612b5e816135c9565b9050612af0565b508315610f185760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610574565b612bbd816127c9565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060610f188383604051806060016040528060278152602001613944602791396060600080856001600160a01b031685604051612c3191906135ad565b600060405180830381855af49150503d8060008114612c6c576040519150601f19603f3d011682016040523d82523d6000602084013e612c71565b606091505b5091509150612c8286838387612c8c565b9695505050505050565b60608315612cfb578251600003612cf4576001600160a01b0385163b612cf45760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610574565b5081612d05565b612d058383612d0d565b949350505050565b815115612d1d5781518083602001fd5b8060405162461bcd60e51b8152600401610574919061376f565b6040518060e0016040528060006001600160a01b03168152602001606081526020016060815260200160608152602001606081526020016000815260200160006006811115612d8857612d88613042565b905290565b508054612d9990613303565b6000825580601f10612da9575050565b601f01602090049060005260206000209081019061066791905b80821115612dd75760008155600101612dc3565b5090565b600060208284031215612ded57600080fd5b81356001600160e01b031981168114610f1857600080fd5b600060208284031215612e1757600080fd5b5035919050565b80356001600160a01b0381168114612e3557600080fd5b919050565b60008060408385031215612e4d57600080fd5b82359150612e5d60208401612e1e565b90509250929050565b600060208284031215612e7857600080fd5b610f1882612e1e565b634e487b7160e01b600052604160045260246000fd5b6000806001600160401b03841115612eb157612eb1612e81565b50604051601f19601f85018116603f011681018181106001600160401b0382111715612edf57612edf612e81565b604052838152905080828401851015612ef757600080fd5b83836020830137600060208583010152509392505050565b60008060408385031215612f2257600080fd5b612f2b83612e1e565b915060208301356001600160401b03811115612f4657600080fd5b8301601f81018513612f5757600080fd5b612f6685823560208401612e97565b9150509250929050565b600060208284031215612f8257600080fd5b81356001600160401b03811115612f9857600080fd5b820160c08185031215610f1857600080fd5b600060208284031215612fbc57600080fd5b81356001600160401b03811115612fd257600080fd5b8201601f81018413612fe357600080fd5b612d0584823560208401612e97565b60005b8381101561300d578181015183820152602001612ff5565b50506000910152565b6000815180845261302e816020860160208601612ff2565b601f01601f19169290920160200192915050565b634e487b7160e01b600052602160045260246000fd5b6007811061307657634e487b7160e01b600052602160045260246000fd5b9052565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b8281101561316157868503603f19018452815180516001600160a01b0316865260208082015160e0918801829052906130dd90880182613016565b9050604082015187820360408901526130f68282613016565b915050606082015187820360608901526131108282613016565b9150506080820151878203608089015261312a8282613016565b91505060a082015160a088015260c0820151915061314b60c0880183613058565b95505060209384019391909101906001016130a2565b50929695505050505050565b60008060006040848603121561318257600080fd5b83356001600160401b0381111561319857600080fd5b8401601f810186136131a957600080fd5b80356001600160401b038111156131bf57600080fd5b8660208284010111156131d157600080fd5b6020918201945092508401356001600160401b038111156131f157600080fd5b84016060818703121561320357600080fd5b809150509250925092565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000808335601e198436030181126132bd57600080fd5b8301803591506001600160401b038211156132d757600080fd5b6020019150368190038213156132ec57600080fd5b9250929050565b8183823760009101908152919050565b600181811c9082168061331757607f821691505b60208210810361333757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156104d8576104d861333d565b60006020828403121561337857600080fd5b813560048110610f1857600080fd5b601f82111561050357806000526020600020601f840160051c810160208510156133ae5750805b601f840160051c820191505b818110156133ce57600081556001016133ba565b5050505050565b600019600383901b1c191660019190911b1790565b81516001600160401b0381111561340357613403612e81565b613417816134118454613303565b84613387565b6020601f82116001811461344557600083156134335750848201515b61343d84826133d5565b8555506133ce565b600084815260208120601f198516915b828110156134755787850151825560209485019460019092019101613455565b50848210156134935786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6001600160401b038311156134b9576134b9612e81565b6134cd836134c78354613303565b83613387565b6000601f8411600181146134fb57600085156134e95750838201355b6134f386826133d5565b8455506133ce565b600083815260209020601f19861690835b8281101561352c578685013582556020948501946001909201910161350c565b50868210156135495760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b60006001820161356d5761356d61333d565b5060010190565b604081528260408201528284606083013760006060848301015260006060601f19601f8601168301019050826020830152949350505050565b600082516135bf818460208701612ff2565b9190910192915050565b6000816135d8576135d861333d565b506000190190565b6040815260006135f36040830185613016565b90508260208301529392505050565b634e487b7160e01b600052603260045260246000fd5b6000815461362581613303565b60018216801561363c576001811461365157613681565b60ff1983168652811515820286019350613681565b84600052602060002060005b838110156136795781548882015260019091019060200161365d565b505081860193505b50505092915050565b6000610f188284613618565b6000602082840312156136a857600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613732816017850160208801612ff2565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613763816028840160208801612ff2565b01602801949350505050565b602081526000610f186020830184613016565b818103818111156104d8576104d861333d565b8181036137a0575050565b6137aa8254613303565b6001600160401b038111156137c1576137c1612e81565b6137cf816134118454613303565b6000601f8211600181146137f4576000831561343357508482015461343d84826133d5565b600085815260209020601f19841690600086815260209020845b8381101561382e578286015482556001958601959091019060200161380e565b508583101561384c5781850154600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052603160045260246000fd5b80820281158282048414176104d8576104d861333d56fe56656869636c6520726567697374726174696f6e20697373756564207375636365737366756c6c7956656869636c6520726567697374726174696f6e2075706461746564207375636365737366756c6c7924a24b5d89ec2dc2cc12e3a593373813143f4430d973824a678248c4f0a0188e56656869636c6520726567697374726174696f6e207265766f6b6564207375636365737366756c6c79360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656494ac8bf7c2c0d570b676d8037eaa0516224e8bca85d85e9465db2088d225fcaba2646970667358221220528019b6146df31afa93472aac377e1b0a893bae388b0141f6192955e6ca243c64736f6c634300081a0033",
        "linkReferences": {},
        "deployedLinkReferences": {}
    }
] as const;