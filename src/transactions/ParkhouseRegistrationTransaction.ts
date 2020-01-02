import { Transactions, Utils } from "@arkecosystem/crypto";
import ByteBuffer from "bytebuffer";
import { IParkhouseData } from "../interfaces";

const { schemas } = Transactions;

const BUSINESS_REGISTRATION_TYPE = 1;
const BUSINESS_REGISTRATION_TYPE_GROUP = 1002;

export class ParkhouseRegistrationTransaction extends Transactions.Transaction {
    public static typeGroup: number = BUSINESS_REGISTRATION_TYPE_GROUP;
    public static type: number = BUSINESS_REGISTRATION_TYPE;
    public static key: string = "business_key";

    public static getSchema(): Transactions.schemas.TransactionSchema {
        return schemas.extend(schemas.transactionBaseSchema, {
            $id: "businessData",
            required: ["asset", "type", "typeGroup"],
            properties: {
                type: { transactionType: BUSINESS_REGISTRATION_TYPE },
                typeGroup: { const: BUSINESS_REGISTRATION_TYPE_GROUP },
                amount: { bignumber: { minimum: 0, maximum: 0 } },
                asset: {
                    type: "object",
                    required: ["parkhouseData"],
                    properties: {
                        parkhouseData: {
                            type: "object",
                            required: ["name", "website", "streetName"],
                            properties: {
                                name: {
                                    type: "string",
                                    minLength: 3,
                                    maxLength: 20,
                                },
                                website: {
                                    type: "string",
                                    minLength: 3,
                                    maxLength: 20,
                                },
                                streetName: {
                                    type: "string",
                                    minLength: 3,
                                    maxLength: 40,
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    protected static defaultStaticFee: Utils.BigNumber = Utils.BigNumber.make("5000000000");

    public serialize(): ByteBuffer {
        const { data } = this;

        const parkhouseData = data.asset.parkhouseData as IParkhouseData;

        const nameBytes = Buffer.from(parkhouseData.name, "utf8");
        const websiteBytes = Buffer.from(parkhouseData.website, "utf8");
        const streetNameBytes = Buffer.from(parkhouseData.streetName, "utf8");

        const buffer = new ByteBuffer(
            nameBytes.length
            + websiteBytes.length
            + streetNameBytes.length
            + 3, true);

        buffer.writeUint8(nameBytes.length);
        buffer.append(nameBytes, "hex");

        buffer.writeUint8(websiteBytes.length);
        buffer.append(websiteBytes, "hex");

        buffer.writeUint8(streetNameBytes.length);
        buffer.append(streetNameBytes, "hex");

        return buffer;
    }

    public deserialize(buf: ByteBuffer): void {
        const { data } = this;
        const parkhouseData = {} as IParkhouseData;

        const nameLength = buf.readUint8();
        parkhouseData.name = buf.readString(nameLength);

        const websiteLength = buf.readUint8();
        parkhouseData.website = buf.readString(websiteLength);

        const streetNameLength = buf.readUint8();
        parkhouseData.streetName = buf.readString(streetNameLength);

        data.asset = {
            parkhouseData,
        };
    }
}
