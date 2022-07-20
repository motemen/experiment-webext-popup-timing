import browser from "webextension-polyfill";

window.addEventListener("load", async () => {
  console.log("done: load");
});

(async () => {
  let aux = [];
  if (import.meta.env.VITE_VARIANT_QUERY_TABS) {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    aux.push(`tab: ${tab?.url}`);
  }

  if (import.meta.env.VITE_VARIANT_SETTIMEOUT) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    aux.push("slept well");
  }

  console.log("set html");
  document.querySelector("#app")!.innerHTML = `${aux.join(
    ";"
  )}<iframe src="https://httpbin.org/delay/3"></iframe>`;
})();
