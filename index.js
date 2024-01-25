#!/usr/bin/env node

import "dotenv/config";
import { createBalances } from "./lib/balances.js";
import { getEvents } from "./lib/scan-import-events.js";
import { dumpBalancesFile } from "./lib/export.js";
import { addType } from "./lib/address-type.js";
import { checkConfig, getConfig } from "./lib/config.js";

const start = async () => {
  const startTime = new Date();
  const startTimeStr = startTime.toUTCString();
  console.log(`Starting run at ${startTimeStr}`);
	// Check if config file (in snapshot.config.json by default) exists. If not, show prompt
	// questions to create it.
	await checkConfig();
  const Config = getConfig();
  console.log({ Config });
	// Get all the events for the specified contract address
	// Format of `events` is [event1, event2, ...]
	const eventData = await getEvents();

	console.log("Calculating balances of %s (%s)...", eventData.name, eventData.symbol);
	// Calculate the current balances
	var balances = await createBalances(eventData);

  console.log("Found total of", balances.length, "holders.");
  if (eventData.loadMode.mode == "INCREMENTAL-LOAD") {
    console.log("Found", eventData.newAddresses.size, "addresses to insert/update in the INCREMENTAL LOAD.");
  }

  if (Config.checkIfContract) {
    balances = await addType(balances);
  }

	// Dump balances file locally (always dumps balances of all the addresses, doesn't matter
  // if load mode is "INITIAL-LOAD" or "INCREMENTAL-LOAD")
  if (Config.writeToLocalFile) {
	  await dumpBalancesFile(eventData, balances);
  }
  console.log("\nAll finished!")
};

(async () => {
	try {
		await start();
	} catch (e) {
		console.error(e);
	}
})();
