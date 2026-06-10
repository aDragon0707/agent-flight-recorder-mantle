import { expect } from "chai";
import { ethers } from "hardhat";

describe("ReceiptAnchor", () => {
  const receiptHash = ethers.id("receipt");
  const agentIdHash = ethers.id("agent");
  const taskIdHash = ethers.id("task");
  const statusCode = "NEEDS_EVIDENCE";

  it("reverts when receipt hash is zero", async () => {
    const anchor = await ethers.deployContract("ReceiptAnchor");

    await expect(
      anchor.anchorReceipt(ethers.ZeroHash, statusCode, agentIdHash, taskIdHash)
    ).to.be.revertedWithCustomError(anchor, "ZeroReceiptHash");
  });

  it("emits ReceiptAnchored", async () => {
    const anchor = await ethers.deployContract("ReceiptAnchor");
    const [submitter] = await ethers.getSigners();

    const transaction = await anchor.anchorReceipt(receiptHash, statusCode, agentIdHash, taskIdHash);
    const receipt = await transaction.wait();
    const events = await anchor.queryFilter(
      anchor.filters.ReceiptAnchored(),
      receipt?.blockNumber,
      receipt?.blockNumber
    );

    expect(events).to.have.lengthOf(1);
    const event = events[0];

    if (!("args" in event)) {
      throw new Error("ReceiptAnchored event args were not decoded");
    }

    expect(event.args.receiptHash).to.equal(receiptHash);
    expect(event.args.agentIdHash).to.equal(agentIdHash);
    expect(event.args.taskIdHash).to.equal(taskIdHash);
    expect(event.args.statusCode).to.equal(statusCode);
    expect(event.args.submitter).to.equal(submitter.address);
    expect(event.args.timestamp).to.be.greaterThan(0n);
  });
});
