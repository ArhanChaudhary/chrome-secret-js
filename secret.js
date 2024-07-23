class Secret {
  constructor(secret) {
    document.dispatchEvent(new CustomEvent("set", { detail: secret }));
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
