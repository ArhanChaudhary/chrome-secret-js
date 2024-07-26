class Secret {
  constructor(secret, secretId) {
    if (secretId === undefined) {
      throw new Error("A unique secret id is required");
    }
    document.dispatchEvent(
      new CustomEvent("set", { detail: { secret, secretId } })
    );
    this.init();
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
