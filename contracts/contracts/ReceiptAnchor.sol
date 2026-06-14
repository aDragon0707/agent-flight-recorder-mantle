// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ReceiptAnchor {
    error ZeroReceiptHash();
    error ZeroAgentIdHash();
    error ZeroTaskIdHash();

    event ReceiptAnchored(
        bytes32 indexed receiptHash,
        bytes32 indexed agentIdHash,
        bytes32 indexed taskIdHash,
        string statusCode,
        address submitter,
        uint256 timestamp
    );

    function anchorReceipt(
        bytes32 receiptHash,
        string calldata statusCode,
        bytes32 agentIdHash,
        bytes32 taskIdHash
    ) external {
        if (receiptHash == bytes32(0)) {
            revert ZeroReceiptHash();
        }

        if (agentIdHash == bytes32(0)) {
            revert ZeroAgentIdHash();
        }

        if (taskIdHash == bytes32(0)) {
            revert ZeroTaskIdHash();
        }

        emit ReceiptAnchored(
            receiptHash,
            agentIdHash,
            taskIdHash,
            statusCode,
            msg.sender,
            block.timestamp
        );
    }
}

