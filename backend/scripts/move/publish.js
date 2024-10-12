require("dotenv").config();
const fs = require("node:fs");
const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");
const aptosSDK = require("@aptos-labs/ts-sdk");

async function publish() {
  try {
    console.log("Publishing contract ... ");
    const move = new cli.Move();

    move
      .createObjectAndPublishPackage({
        packageDirectoryPath: "contracts",
        addressName: "account_address",
        namedAddresses: {
          // Publish module to new object, but siannce we create the object on the fly, we fill in the publisher's account address here
          account_address: process.env.MODULE_PUBLISHER_ACCOUNT_ADDRESS,
        },
        extraArguments: [
          `--private-key=${process.env.MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY}`,
          `--url=${aptosSDK.NetworkToNodeAPI[process.env.PUBLIC_APP_NETWORK]}`,
        ],
      })
      .then((response) => {
        console.log("Contract published successfully!", response);
        const filePath = ".env";
        let envContent = "";

        // Check .env file exists and read it
        if (fs.existsSync(filePath)) {
          envContent = fs.readFileSync(filePath, "utf8");
        }

        // Regular expression to match the NEXT_PUBLIC_MODULE_ADDRESS variable
        const regex = /^PUBLIC_MODULE_ADDRESS=.*$/m;
        const newEntry = `PUBLIC_MODULE_ADDRESS=${response.objectAddress}`;

        // Check if NEXT_PUBLIC_MODULE_ADDRESS is already defined
        if (envContent.match(regex)) {
          // If the variable exists, replace it with the new value
          envContent = envContent.replace(regex, newEntry);
        } else {
          // If the variable does not exist, append it
          envContent += `\n${newEntry}`;
        }

        // Write the updated content back to the .env file
        fs.writeFileSync(filePath, envContent, "utf8");
        console.log("Updated .env file with the contract address.");
      });
  } catch (error) {
    console.error("Error while publishing contract...", error);
  }
}
publish();
