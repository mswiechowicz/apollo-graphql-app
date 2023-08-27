CREATE TABLE Test (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL
);

INSERT INTO Test (name, surname) VALUES ('John', 'Doe');
INSERT INTO Test (name, surname) VALUES ('Jane', 'Doe');
INSERT INTO Test (name, surname) VALUES ('Bob', 'Smith');
