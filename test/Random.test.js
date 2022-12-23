const Random = artifacts.require("Random");
let ranNum;

describe.only("Random check", () => {
  it("deployed", async () => {
    ranNum = await Random.deployed();
    console.log(ranNum);
  });
});
