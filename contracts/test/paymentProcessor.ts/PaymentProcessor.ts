import { PaymentProcessor } from "../../types/contracts/PaymentProcessor";
import hre, { ethers } from "hardhat";
import { Permit } from "fhenixjs";

describe("Test PaymentProcessor", () => {
  let contractAddr: string;
  let contract: PaymentProcessor;
  let permit: Permit;
  let owner: string;

  it(`Test Contract Deployment`, async () => {
    const { ethers, fhenixjs } = hre;
    const { deploy } = hre.deployments;
    const [signer] = await ethers.getSigners();

    // Set the owner to the signer's address
    owner = signer.address;

    // Deploy the PaymentProcessor contract
    const token = await deploy("PaymentProcessor", {
      from: signer.address,
      log: true,
      skipIfAlreadyDeployed: false,
    });

    // Get the deployed contract address
    contractAddr = token.address;

    // Generate the permit using FhenixJS
    permit = await fhenixjs.generatePermit(contractAddr, undefined, signer);
    contract = (await ethers.getContractAt(
      "PaymentProcessor",
      contractAddr,
    )) as unknown as PaymentProcessor;

    console.log(`contractAddr: `, contractAddr);
  });

  it(`Populate Array`, async () => {
    const { ethers, fhenixjs } = hre;

    let privateBalanceBefore = await contract.getAmountToBePayed(owner, permit);
    console.log(`Private Balance before wrapping: ${privateBalanceBefore}`);

    const returnBefore = JSON.parse(privateBalanceBefore);

    // console.log(returnBefore);
    // console.log(returnBefore.ciphertext);

    // const unciphered = permit.sealingKey.unseal("");
    // console.log("unciphered :", unciphered);

    const encryptedAmount = await fhenixjs.encrypt_uint32(
      Number(ethers.parseUnits("15", "wei")),
    );
    //console.log(encryptedAmount);
    let encArray = [];
    encArray.push(encryptedAmount);
    let recipients = [owner];
    await contract.createConfidentialPayment(encArray, recipients, {
      value: ethers.parseUnits("15", "wei"),
    });

    let privateBalanceAfter = await contract.getAmountToBePayed(owner, permit);
    console.log(
      `Private Balance after wrapping: ${privateBalanceAfter.toString()}`,
    );
  });

  it(`Withdraw partial transaction`, async () => {
    const { ethers, fhenixjs } = hre;
    const [signer] = await ethers.getSigners();

    const encryptedAmount = await fhenixjs.encrypt_uint32(
      Number(ethers.parseUnits("15", "wei")),
    );

    //console.log(encryptedAmount);
    let encArray = [];
    encArray.push(encryptedAmount);
    let recipients = [owner];
    await contract.createConfidentialPayment(encArray, recipients, {
      value: ethers.parseUnits("15", "wei"),
    });

    const encryptedAmount2 = await fhenixjs.encrypt_uint32(
      Number(ethers.parseUnits("5", "wei")),
    );

    let addressTest = "0x60A761B3aD8d922914770e979187E0BACcAB5351";
    await contract.connect(signer).withdraw(encryptedAmount2, addressTest);
  });
});
