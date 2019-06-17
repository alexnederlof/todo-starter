SET xmloption = content;
CREATE TABLE public.todos (
    id integer NOT NULL,
    name text NOT NULL,
    complete boolean DEFAULT false NOT NULL
);
CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;
ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);
ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);
