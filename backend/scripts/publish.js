require("dotenv").config();
const fs = require("node:fs");
const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");
const aptosSDK = require("@aptos-labs/ts-sdk");

async function publish() {
    const move = new cli.Move();

    move.createObjectAndPublishPackage({
        packageDirectoryPath: "contracts",
        addressName: "account_address",
        namedAddresses: {
            
        }
    })
}