self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  async function chainPromise() {
    await self.registration.showNotification("Ada menu baru untuk Anda!", {
      body: "Ada menu baru di restaurant kami",
    });
  }

  event.waitUntil(chainPromise());
});
