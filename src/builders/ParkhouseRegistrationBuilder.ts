import { Interfaces, Transactions, Utils } from "@arkecosystem/crypto";
import { ParkhouseRegistrationTransaction } from "../transactions";

export class ParkhouseRegistrationBuilder extends Transactions.TransactionBuilder<ParkhouseRegistrationBuilder> {
    constructor() {
        super();
        this.data.type = ParkhouseRegistrationTransaction.type;
        this.data.typeGroup = ParkhouseRegistrationTransaction.typeGroup;
        this.data.version = 2;
        this.data.fee = Utils.BigNumber.make("5000000000");
        this.data.amount = Utils.BigNumber.ZERO;
        this.data.asset = { businessData: {} };
    }

    public parkhouseData(name: string, website: string, streetName: string): ParkhouseRegistrationBuilder {
        this.data.asset.parkhouseData = {
            name,
            website,
            streetName
        };

        return this;
    }

    public getStruct(): Interfaces.ITransactionData {
        const struct: Interfaces.ITransactionData = super.getStruct();
        struct.amount = this.data.amount;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): ParkhouseRegistrationBuilder {
        return this;
    }
}
