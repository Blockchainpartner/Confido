pragma solidity ^0.8.20;

import "@fhenixprotocol/contracts/access/Permissioned.sol";
import "@fhenixprotocol/contracts/FHE.sol";

contract PaymentProcessor is Permissioned {

    // The owner of the contract.
    address internal contractOwner;

    // The encrypted amounts of individuals payments
    mapping(address => euint32) internal amountToBeClaimed;

    constructor(){
        contractOwner = msg.sender;
    }

    function createConfidentialPayment(inEuint32[] calldata encryptedAmounts, address[] calldata recipients) public payable {
        euint32 sumEncryptedAmount = FHE.asEuint32(0);
        for (uint32 i = 0; i < encryptedAmounts.length; i++){
            sumEncryptedAmount = sumEncryptedAmount.add(FHE.asEuint32(encryptedAmounts[i]));
            amountToBeClaimed[recipients[i]] = FHE.asEuint32(encryptedAmounts[i]);
        }

        // Require that amount of token received == sum of filled arrray
        euint32 amountReceivedEncrypted = FHE.asEuint32(msg.value);
        FHE.req(FHE.eq(sumEncryptedAmount, amountReceivedEncrypted));
    }

    function getAmountToBePayed(address sender, Permission calldata perm) public view onlySender(perm) returns (string memory)
    {
        return FHE.sealoutput(amountToBeClaimed[sender], perm.publicKey);
    }

    function withdraw(inEuint32 calldata amountToWithdraw, address payable _to) public payable {
        euint32 encAmountToWithdraw = FHE.asEuint32(amountToWithdraw);
        FHE.req(FHE.gte(amountToBeClaimed[msg.sender], encAmountToWithdraw));
        // subtract amount from shielded amount to be payed
        amountToBeClaimed[msg.sender] = FHE.sub(amountToBeClaimed[msg.sender], encAmountToWithdraw);
        uint32 plainAmountWithdraw = FHE.decrypt(encAmountToWithdraw);
        (bool success,) = _to.call{value: plainAmountWithdraw}("");
        require(success, "Failed to send Ether");
    }
}