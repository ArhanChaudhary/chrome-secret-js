class Secret {
  static secretId = 0;

  constructor(secret) {
    this.secretId = Secret.secretId++;
    document.dispatchEvent(
      new CustomEvent("set", { detail: { secret, secretId: this.secretId } })
    );
    // return new Promise((resolve) => {
    //   let onSetSuccess = ({ detail: secretId }) => {
    //     if (secretId === this.secretId) {
    //       resolve(this);
    //       document.removeEventListener("setSuccess", onSetSuccess);
    //     }
    //   };
    //   document.addEventListener("setSuccess", onSetSuccess);
    // });
  }

  async get() {
    document.dispatchEvent(new CustomEvent("get", { detail: this.secretId }));
    return await new Promise((resolve) => {
      let onSecret = ({ detail: { secret, secretId } }) => {
        if (secretId === this.secretId) {
          resolve(secret);
          document.removeEventListener("secret", onSecret);
        }
      };
      document.addEventListener("secret", onSecret);
    });
  }
}
