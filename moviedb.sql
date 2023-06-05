--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-31 13:55:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 32805)
-- Name: mdb; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA mdb;


ALTER SCHEMA mdb OWNER TO postgres;

--
-- TOC entry 858 (class 1247 OID 32807)
-- Name: date_precision; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.date_precision AS ENUM (
    'd',
    'm',
    'y'
);


ALTER TYPE public.date_precision OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 32813)
-- Name: country; Type: TABLE; Schema: mdb; Owner: postgres
--

CREATE TABLE mdb.country (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE mdb.country OWNER TO postgres;

--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE country; Type: COMMENT; Schema: mdb; Owner: postgres
--

COMMENT ON TABLE mdb.country IS 'РЎС‚СЂР°РЅС‹';


--
-- TOC entry 216 (class 1259 OID 32818)
-- Name: country_id_seq; Type: SEQUENCE; Schema: mdb; Owner: postgres
--

CREATE SEQUENCE mdb.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE mdb.country_id_seq OWNER TO postgres;

--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 216
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: mdb; Owner: postgres
--

ALTER SEQUENCE mdb.country_id_seq OWNED BY mdb.country.id;


--
-- TOC entry 217 (class 1259 OID 32819)
-- Name: genre; Type: TABLE; Schema: mdb; Owner: postgres
--

CREATE TABLE mdb.genre (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE mdb.genre OWNER TO postgres;

--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE genre; Type: COMMENT; Schema: mdb; Owner: postgres
--

COMMENT ON TABLE mdb.genre IS 'Р–Р°РЅСЂС‹';


--
-- TOC entry 218 (class 1259 OID 32824)
-- Name: movie; Type: TABLE; Schema: mdb; Owner: postgres
--

CREATE TABLE mdb.movie (
    id integer NOT NULL,
    name_ru text NOT NULL,
    name_en text,
    countries integer[],
    year integer,
    slogan text,
    genres text[],
    length integer,
    age_restriction text,
    rating_kinopoisk numeric,
    rating_critics numeric,
    world_premiere date,
    parse_date timestamp(0) with time zone DEFAULT now(),
    update_date timestamp(0) with time zone,
    rating_mpaa character varying(10),
    production_status character varying(100),
    "posterUrl" text,
    trailer text,
    badge text,
    color text
);


ALTER TABLE mdb.movie OWNER TO postgres;

--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE movie; Type: COMMENT; Schema: mdb; Owner: postgres
--

COMMENT ON TABLE mdb.movie IS 'Р¤РёР»СЊРјС‹';


--
-- TOC entry 219 (class 1259 OID 32842)
-- Name: movie_id_seq; Type: SEQUENCE; Schema: mdb; Owner: postgres
--

CREATE SEQUENCE mdb.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE mdb.movie_id_seq OWNER TO postgres;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 219
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: mdb; Owner: postgres
--

ALTER SEQUENCE mdb.movie_id_seq OWNED BY mdb.movie.id;


--
-- TOC entry 220 (class 1259 OID 32855)
-- Name: person; Type: TABLE; Schema: mdb; Owner: postgres
--

CREATE TABLE mdb.person (
    id integer NOT NULL,
    nameru text NOT NULL,
    nameen text,
    birth_date date,
    birth_place character varying(200),
    growth integer,
    death_date date,
    death_place character varying(200),
    inserted_at timestamp(0) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) with time zone,
    description text,
    sex text,
    profession text,
    poster_url text
);


ALTER TABLE mdb.person OWNER TO postgres;

--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE person; Type: COMMENT; Schema: mdb; Owner: postgres
--

COMMENT ON TABLE mdb.person IS 'РџРµСЂСЃРѕРЅС‹';


--
-- TOC entry 221 (class 1259 OID 32862)
-- Name: person_id_seq; Type: SEQUENCE; Schema: mdb; Owner: postgres
--

CREATE SEQUENCE mdb.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE mdb.person_id_seq OWNER TO postgres;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 221
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: mdb; Owner: postgres
--

ALTER SEQUENCE mdb.person_id_seq OWNED BY mdb.person.id;


--
-- TOC entry 222 (class 1259 OID 32863)
-- Name: person_in_movie; Type: TABLE; Schema: mdb; Owner: postgres
--

CREATE TABLE mdb.person_in_movie (
    id integer NOT NULL,
    movie_id integer,
    person_id integer,
    role text NOT NULL,
    commentary text
);


ALTER TABLE mdb.person_in_movie OWNER TO postgres;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 222
-- Name: TABLE person_in_movie; Type: COMMENT; Schema: mdb; Owner: postgres
--

COMMENT ON TABLE mdb.person_in_movie IS 'РЈС‡Р°СЃС‚РёРµ РїРµСЂСЃРѕРЅ РІ С„РёР»СЊРјР°С…';


--
-- TOC entry 223 (class 1259 OID 32868)
-- Name: person_in_movie_id_seq; Type: SEQUENCE; Schema: mdb; Owner: postgres
--

CREATE SEQUENCE mdb.person_in_movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE mdb.person_in_movie_id_seq OWNER TO postgres;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 223
-- Name: person_in_movie_id_seq; Type: SEQUENCE OWNED BY; Schema: mdb; Owner: postgres
--

ALTER SEQUENCE mdb.person_in_movie_id_seq OWNED BY mdb.person_in_movie.id;


--
-- TOC entry 228 (class 1259 OID 40978)
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 40977)
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.country_id_seq OWNER TO postgres;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 227
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- TOC entry 232 (class 1259 OID 40996)
-- Name: film; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.film (
    id integer NOT NULL,
    "nameOriginal" character varying NOT NULL,
    "nameRu" character varying,
    "logoUrl" character varying,
    "coverUrl" character varying,
    "filmLength" integer,
    rating integer,
    "ratingCount" integer,
    year integer,
    slogan character varying,
    description character varying,
    "shortDescription" character varying,
    type character varying,
    "ratingMpaa" character varying,
    "ratingAgeLimits" character varying,
    serial boolean,
    "lastSync" date
);


ALTER TABLE public.film OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 41019)
-- Name: film_countries_country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.film_countries_country (
    "filmId" integer NOT NULL,
    "countryId" integer NOT NULL
);


ALTER TABLE public.film_countries_country OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 41012)
-- Name: film_genres_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.film_genres_genre (
    "filmId" integer NOT NULL,
    "genreId" integer NOT NULL
);


ALTER TABLE public.film_genres_genre OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 40995)
-- Name: film_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.film_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.film_id_seq OWNER TO postgres;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 231
-- Name: film_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.film_id_seq OWNED BY public.film.id;


--
-- TOC entry 226 (class 1259 OID 40968)
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying NOT NULL,
    first integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 40967)
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genre_id_seq OWNER TO postgres;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 225
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- TOC entry 224 (class 1259 OID 32882)
-- Name: movie_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_genre (
    id integer NOT NULL,
    genre_id text NOT NULL,
    movie_id integer NOT NULL
);


ALTER TABLE public.movie_genre OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 40987)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    id integer NOT NULL,
    "nameOriginal" character varying NOT NULL
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 41004)
-- Name: person_films_film; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person_films_film (
    "personId" integer NOT NULL,
    "filmId" integer NOT NULL,
    general boolean DEFAULT false,
    role character varying
);


ALTER TABLE public.person_films_film OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 40986)
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO postgres;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 229
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- TOC entry 3232 (class 2604 OID 32887)
-- Name: country id; Type: DEFAULT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.country ALTER COLUMN id SET DEFAULT nextval('mdb.country_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 32888)
-- Name: movie id; Type: DEFAULT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.movie ALTER COLUMN id SET DEFAULT nextval('mdb.movie_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 32893)
-- Name: person id; Type: DEFAULT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.person ALTER COLUMN id SET DEFAULT nextval('mdb.person_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 32894)
-- Name: person_in_movie id; Type: DEFAULT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.person_in_movie ALTER COLUMN id SET DEFAULT nextval('mdb.person_in_movie_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 40981)
-- Name: country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 40999)
-- Name: film id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film ALTER COLUMN id SET DEFAULT nextval('public.film_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 40971)
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 40990)
-- Name: person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- TOC entry 3441 (class 0 OID 32813)
-- Dependencies: 215
-- Data for Name: country; Type: TABLE DATA; Schema: mdb; Owner: postgres
--

COPY mdb.country (id, name) FROM stdin;


--
-- TOC entry 3443 (class 0 OID 32819)
-- Dependencies: 217
-- Data for Name: genre; Type: TABLE DATA; Schema: mdb; Owner: postgres
--

COPY mdb.genre (id, name) FROM stdin;


--
-- TOC entry 3444 (class 0 OID 32824)
-- Dependencies: 218
-- Data for Name: movie; Type: TABLE DATA; Schema: mdb; Owner: postgres
--

COPY mdb.movie (id, name_ru, name_en, countries, year, slogan, genres, length, age_restriction, rating_kinopoisk, rating_critics, world_premiere, parse_date, update_date, rating_mpaa, production_status, "posterUrl", trailer, badge, color) FROM stdin;


--
-- TOC entry 3446 (class 0 OID 32855)
-- Dependencies: 220
-- Data for Name: person; Type: TABLE DATA; Schema: mdb; Owner: postgres
--

COPY mdb.person (id, nameru, nameen, birth_date, birth_place, growth, death_date, death_place, inserted_at, updated_at, description, sex, profession, poster_url) FROM stdin;


--
-- TOC entry 3448 (class 0 OID 32863)
-- Dependencies: 222
-- Data for Name: person_in_movie; Type: TABLE DATA; Schema: mdb; Owner: postgres
--

COPY mdb.person_in_movie (id, movie_id, person_id, role, commentary) FROM stdin;


--
-- TOC entry 3454 (class 0 OID 40978)
-- Dependencies: 228
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country (id, name) FROM stdin;


--
-- TOC entry 3458 (class 0 OID 40996)
-- Dependencies: 232
-- Data for Name: film; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.film (id, "nameOriginal", "nameRu", "logoUrl", "coverUrl", "filmLength", rating, "ratingCount", year, slogan, description, "shortDescription", type, "ratingMpaa", "ratingAgeLimits", serial, "lastSync") FROM stdin;


--
-- TOC entry 3461 (class 0 OID 41019)
-- Dependencies: 235
-- Data for Name: film_countries_country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.film_countries_country ("filmId", "countryId") FROM stdin;


--
-- TOC entry 3460 (class 0 OID 41012)
-- Dependencies: 234
-- Data for Name: film_genres_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.film_genres_genre ("filmId", "genreId") FROM stdin;


--
-- TOC entry 3452 (class 0 OID 40968)
-- Dependencies: 226
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, name, first) FROM stdin;


--
-- TOC entry 3450 (class 0 OID 32882)
-- Dependencies: 224
-- Data for Name: movie_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_genre (id, genre_id, movie_id) FROM stdin;


--
-- TOC entry 3456 (class 0 OID 40987)
-- Dependencies: 230
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person (id, "nameOriginal") FROM stdin;


--
-- TOC entry 3459 (class 0 OID 41004)
-- Dependencies: 233
-- Data for Name: person_films_film; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person_films_film ("personId", "filmId", general, role) FROM stdin;


--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 216
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: mdb; Owner: postgres
--

SELECT pg_catalog.setval('mdb.country_id_seq', 1, false);


--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 219
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: mdb; Owner: postgres
--

SELECT pg_catalog.setval('mdb.movie_id_seq', 1, false);


--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 221
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: mdb; Owner: postgres
--

SELECT pg_catalog.setval('mdb.person_id_seq', 1, false);


--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 223
-- Name: person_in_movie_id_seq; Type: SEQUENCE SET; Schema: mdb; Owner: postgres
--

SELECT pg_catalog.setval('mdb.person_in_movie_id_seq', 1, false);


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 227
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_id_seq', 1, false);


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 231
-- Name: film_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.film_id_seq', 1, false);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 225
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 1, false);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 229
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_id_seq', 1, false);


--
-- TOC entry 3245 (class 2606 OID 32898)
-- Name: country country_name_key; Type: CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.country
    ADD CONSTRAINT country_name_key UNIQUE (name);


--
-- TOC entry 3247 (class 2606 OID 32900)
-- Name: country country_pkey; Type: CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- TOC entry 3249 (class 2606 OID 32902)
-- Name: genre genre_name_key; Type: CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.genre
    ADD CONSTRAINT genre_name_key UNIQUE (name);


--
-- TOC entry 3251 (class 2606 OID 32904)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- TOC entry 3253 (class 2606 OID 32912)
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- TOC entry 3264 (class 2606 OID 32916)
-- Name: person_in_movie person_in_movie_pkey; Type: CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.person_in_movie
    ADD CONSTRAINT person_in_movie_pkey PRIMARY KEY (id);


--
-- TOC entry 3259 (class 2606 OID 32918)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 40976)
-- Name: genre PK_0285d4f1655d080cfcf7d1ab141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 41003)
-- Name: film PK_37ec0ffe0011ccbe438a65e3c6e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film
    ADD CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 40994)
-- Name: person PK_5fdaf670315c4b7e70cce85daa3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 41011)
-- Name: person_films_film PK_6682ce92cd7a2c14329ab314085; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person_films_film
    ADD CONSTRAINT "PK_6682ce92cd7a2c14329ab314085" PRIMARY KEY ("personId", "filmId");


--
-- TOC entry 3272 (class 2606 OID 40985)
-- Name: country PK_bf6e37c231c4f4ea56dcd887269; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 41016)
-- Name: film_genres_genre PK_d3631824680cfe84393ec4525b9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_genres_genre
    ADD CONSTRAINT "PK_d3631824680cfe84393ec4525b9" PRIMARY KEY ("filmId", "genreId");


--
-- TOC entry 3288 (class 2606 OID 41023)
-- Name: film_countries_country PK_ffc95fd0c787134a273924f0058; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_countries_country
    ADD CONSTRAINT "PK_ffc95fd0c787134a273924f0058" PRIMARY KEY ("filmId", "countryId");


--
-- TOC entry 3266 (class 2606 OID 32924)
-- Name: movie_genre movie_genre_genre_id_movie_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_genre_id_movie_id_key UNIQUE (genre_id, movie_id);


--
-- TOC entry 3268 (class 2606 OID 32926)
-- Name: movie_genre movie_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 1259 OID 32931)
-- Name: person_birth_date_idx; Type: INDEX; Schema: mdb; Owner: postgres
--

CREATE INDEX person_birth_date_idx ON mdb.person USING btree (birth_date);


--
-- TOC entry 3255 (class 1259 OID 32932)
-- Name: person_death_date_idx; Type: INDEX; Schema: mdb; Owner: postgres
--

CREATE INDEX person_death_date_idx ON mdb.person USING btree (death_date);


--
-- TOC entry 3256 (class 1259 OID 32933)
-- Name: person_growth_idx; Type: INDEX; Schema: mdb; Owner: postgres
--

CREATE INDEX person_growth_idx ON mdb.person USING btree (growth);


--
-- TOC entry 3260 (class 1259 OID 32934)
-- Name: person_in_movie_commentary_idx; Type: INDEX; Schema: mdb; Owner: postgres
--

CREATE INDEX person_in_movie_commentary_idx ON mdb.person_in_movie USING btree (commentary varchar_pattern_ops);


--
-- TOC entry 3261 (class 1259 OID 32935)
-- Name: person_in_movie_movie_id_idx; Type: INDEX; Schema: mdb; Owner: postgres
--

CREATE INDEX person_in_movie_movie_id_idx ON mdb.person_in_movie USING btree (movie_id);


--
-- TOC entry 3262 (class 1259 OID 32936)
-- Name: person_in_movie_person_id_idx; Type: INDEX; Schema: mdb; Owner: postgres
--

CREATE INDEX person_in_movie_person_id_idx ON mdb.person_in_movie USING btree (person_id);


--
-- TOC entry 3257 (class 1259 OID 32937)
-- Name: person_name_idx; Type: INDEX; Schema: mdb; Owner: postgres
--

CREATE INDEX person_name_idx ON mdb.person USING btree (nameru varchar_pattern_ops);


--
-- TOC entry 3281 (class 1259 OID 41018)
-- Name: IDX_154ad77df90384e3d5886d36d2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_154ad77df90384e3d5886d36d2" ON public.film_genres_genre USING btree ("genreId");


--
-- TOC entry 3285 (class 1259 OID 41025)
-- Name: IDX_4f6967f34953fbac4927ea9a8e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_4f6967f34953fbac4927ea9a8e" ON public.film_countries_country USING btree ("countryId");


--
-- TOC entry 3277 (class 1259 OID 41099)
-- Name: IDX_519076c6a63774c8897502f661; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_519076c6a63774c8897502f661" ON public.person_films_film USING btree ("personId");


--
-- TOC entry 3278 (class 1259 OID 41100)
-- Name: IDX_5be4a022271bf0e0ab1bc463eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5be4a022271bf0e0ab1bc463eb" ON public.person_films_film USING btree ("filmId");


--
-- TOC entry 3286 (class 1259 OID 41024)
-- Name: IDX_a1b516f7a54442469a5f5da1d5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_a1b516f7a54442469a5f5da1d5" ON public.film_countries_country USING btree ("filmId");


--
-- TOC entry 3282 (class 1259 OID 41017)
-- Name: IDX_a67a97774005861bc040612e33; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_a67a97774005861bc040612e33" ON public.film_genres_genre USING btree ("filmId");


--
-- TOC entry 3289 (class 2606 OID 32965)
-- Name: person_in_movie person_in_movie_movie_id_fkey; Type: FK CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.person_in_movie
    ADD CONSTRAINT person_in_movie_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES mdb.movie(id);


--
-- TOC entry 3290 (class 2606 OID 32970)
-- Name: person_in_movie person_in_movie_person_id_fkey; Type: FK CONSTRAINT; Schema: mdb; Owner: postgres
--

ALTER TABLE ONLY mdb.person_in_movie
    ADD CONSTRAINT person_in_movie_person_id_fkey FOREIGN KEY (person_id) REFERENCES mdb.person(id);


--
-- TOC entry 3295 (class 2606 OID 41044)
-- Name: film_genres_genre FK_154ad77df90384e3d5886d36d28; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_genres_genre
    ADD CONSTRAINT "FK_154ad77df90384e3d5886d36d28" FOREIGN KEY ("genreId") REFERENCES public.genre(id);


--
-- TOC entry 3297 (class 2606 OID 41054)
-- Name: film_countries_country FK_4f6967f34953fbac4927ea9a8e0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_countries_country
    ADD CONSTRAINT "FK_4f6967f34953fbac4927ea9a8e0" FOREIGN KEY ("countryId") REFERENCES public.country(id);


--
-- TOC entry 3293 (class 2606 OID 41101)
-- Name: person_films_film FK_519076c6a63774c8897502f661e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person_films_film
    ADD CONSTRAINT "FK_519076c6a63774c8897502f661e" FOREIGN KEY ("personId") REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3294 (class 2606 OID 41106)
-- Name: person_films_film FK_5be4a022271bf0e0ab1bc463eb9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person_films_film
    ADD CONSTRAINT "FK_5be4a022271bf0e0ab1bc463eb9" FOREIGN KEY ("filmId") REFERENCES public.film(id);


--
-- TOC entry 3298 (class 2606 OID 41049)
-- Name: film_countries_country FK_a1b516f7a54442469a5f5da1d52; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_countries_country
    ADD CONSTRAINT "FK_a1b516f7a54442469a5f5da1d52" FOREIGN KEY ("filmId") REFERENCES public.film(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3296 (class 2606 OID 41039)
-- Name: film_genres_genre FK_a67a97774005861bc040612e33d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_genres_genre
    ADD CONSTRAINT "FK_a67a97774005861bc040612e33d" FOREIGN KEY ("filmId") REFERENCES public.film(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3291 (class 2606 OID 32985)
-- Name: movie_genre movie_genre_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES mdb.genre(id);


--
-- TOC entry 3292 (class 2606 OID 32990)
-- Name: movie_genre movie_genre_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES mdb.movie(id);


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA mdb; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA mdb TO mdb;


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE country; Type: ACL; Schema: mdb; Owner: postgres
--

GRANT SELECT,INSERT ON TABLE mdb.country TO mdb;


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE genre; Type: ACL; Schema: mdb; Owner: postgres
--

GRANT SELECT,INSERT,UPDATE ON TABLE mdb.genre TO mdb;


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE movie; Type: ACL; Schema: mdb; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE mdb.movie TO mdb;


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE person; Type: ACL; Schema: mdb; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE mdb.person TO mdb;


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 222
-- Name: TABLE person_in_movie; Type: ACL; Schema: mdb; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE mdb.person_in_movie TO mdb;


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 223
-- Name: SEQUENCE person_in_movie_id_seq; Type: ACL; Schema: mdb; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE mdb.person_in_movie_id_seq TO mdb;


-- Completed on 2023-05-31 13:55:04

--
-- PostgreSQL database dump complete
--

