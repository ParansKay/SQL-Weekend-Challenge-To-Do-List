CREATE TABLE paran_todo_list (
    id SERIAL PRIMARY KEY,
    task VARCHAR NOT NULL,
    notes VARCHAR NOT NULL,
    due VARCHAR NOT NULL,
    stat BOOLEAN NOT NULL
);