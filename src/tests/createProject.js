const {
  openBrowser,
  goto,
  textBox,
  press,
  write,
  click,
  closeBrowser,
  into,
  waitFor,
  clear,
  focus
} = require("taiko");

function fillArray(value, len) {
  if (len === 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}

(async () => {
  try {
    // Login
    await openBrowser({ headless: false, observe: false });
    await goto("http://localhost:3000/");
    await press("Tab");
    await write("admin");
    await press("Tab");
    await write("admin");
    await press("Enter");
    await goto("http://localhost:3000/");

    // Create Project
    await click("Create new project");
    try {
      await write("Test Project", into(textBox({ name: "projectName" })));
    } catch (error) {
      console.log("error", error);
    }
    await write("2", into(textBox({ name: "numberOfDescriptions" })));
    await write("5", into(textBox({ name: "totalNumberOfItems" })));
    await click("Submit");

    // Description
    await write("Description Name", into(textBox({ name: "description" })));
    await press("Tab");
    await write("Coated Item");
    await press("Enter");
    await write("IFS123", into(textBox({ name: "ifsActivityCodes" })));
    await write("CPS123", into(textBox({ name: "CPS" })));
    await click("Submit");

    // Add items
    const itemIds1 = ["ItemID1", "ItemID2", "ItemID3"];

    await focus(textBox({ id: "custom-undefined-Item ID-undefined" }));

    for (const itemId of itemIds1) {
      await clear();
      await write(itemId);
      await press("Enter");
    }

    // Steel Preparation
    await click("Open all items");
    await click("Steel");
    await press("Tab");
    await write("Carbon");
    await press("Enter");
    await press("Tab");
    await write("Grit");
    await press("Enter");
    await click("Primer 1");
    await press("Tab");
    await write("Carbon");
    await press("Enter");
    await click("Submit");

    const itemIds2 = ["ItemID4", "ItemID5"];
  } catch (error) {
    console.error(error);
  } finally {
    // await closeBrowser();
  }
})();