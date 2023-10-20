// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IBridgeMookup {
    struct TransferInfo {
        address targetToken;
        address recipient;
        uint256 targetChainId;
        uint256 amount;
    }

    function transferInfos(uint256) external view returns (TransferInfo memory);

    function currentTransferId() external view returns (uint256);

    function processedId() external view returns (uint256);

    function sendTokens(
        address tokenAddress,
        address recipient,
        uint256 amount,
        uint256 targetChainId
    ) external payable;

    function receiveTokens(
        address tokenAddress,
        address recipient,
        uint256 amount
    ) external;

    function processTransfer(uint256 _processedId) external;
}
