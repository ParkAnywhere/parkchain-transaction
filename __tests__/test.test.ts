import "jest-extended";

import { Managers, Transactions } from "@arkecosystem/crypto";
import { ParkhouseRegistrationBuilder } from "../src/builders";
import { ParkhouseRegistrationTransaction } from "../src/transactions";

describe("Test builder",()=>{

    it("Should verify correctly", ()=> {
        Managers.configManager.setFromPreset("testnet");
        Transactions.TransactionRegistry.registerTransactionType(ParkhouseRegistrationTransaction);
        Managers.configManager.setHeight(2);

        const builder = new ParkhouseRegistrationBuilder();
        const actual = builder
            .parkhouseData("google","www.google.com", "Koroska cesta 30")
            .nonce("3")
            .sign("clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire");


        console.log(actual.build().toJson());
        expect(actual.build().verified).toBeTrue();
        expect(actual.verify()).toBeTrue();
    });
});
