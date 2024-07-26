class Secret {
  constructor(secret) {
    return (async () => {
      window.__secret = this;
      document.dispatchEvent(new CustomEvent("set", { detail: secret }));
      await new Promise((resolve) =>
        document.addEventListener("setSuccess", resolve, { once: true })
      );
      delete window.__secret;
      this.init();
      return this;
    })();
  }

  init() {
    this.secret = new Promise((resolve) =>
      document.addEventListener(
        "secret",
        (e) => {
          this.init();
          resolve(e.detail);
        },
        { once: true }
      )
    );
  }
}
