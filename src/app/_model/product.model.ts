import { FileHandel } from "./file-handel.model";

export interface Product {
    idFormation: number,
    nomFormation: String,
    descriptionFormation: String,
    productDiscountedPrice: number,
    a: String,
    productImages: FileHandel[]
}