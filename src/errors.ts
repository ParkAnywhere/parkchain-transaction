// tslint:disable:max-classes-per-file
import { Errors } from "@arkecosystem/core-transactions";

export class ParkhouseRegistrationAssetError extends Errors.TransactionError {
  constructor() {
    super(`Incomplete parkhouse registration asset.`);
  }
}

export class WalletIsAlreadyAParkhouse extends Errors.TransactionError {
  constructor() {
    super(`Wallet is already a parkhouse.`);
  }
}
