class Secret {
  static secretId = 0;

  constructor(secret, secretId) {
    this.secretId = Secret.secretId++;
    document.dispatchEvent(
      new CustomEvent("set", { detail: { secret, secretId } })
    );
  }

  async get() {
    document.dispatchEvent(new CustomEvent("get", { detail: this.secretId }));
    return await new Promise((resolve) => {
      document.addEventListener(
        "secret",
        (e) => {
          resolve(e.detail);
        },
        { once: true }
      );
    });
  }
}
