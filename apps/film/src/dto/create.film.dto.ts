import { Country } from "../country/entity/Country";
import { Genre } from "../genre/entity/Genre";

export  class CreateFilm {
    nameOriginal : string;
    nameRu : string;
    logoUrl : string;
    coverUrl : string;
    filmLength: number;
    rating: number;
    ratingCount: number;
    year: number;
    slogan : string;
    description : string;
    shortDescription : string;
    type : string;
    ratingMpaa : string;
    ratingAgeLimits : string;
    serial : boolean;
    lastSync : string;
    genres : Genre[];
    countries : Country[];
}