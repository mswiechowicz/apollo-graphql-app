CREATE TABLE test (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO test (name, surname) VALUES ('John', 'Doe');
INSERT INTO test (name, surname) VALUES ('Jane', 'Doe');
INSERT INTO test (name, surname) VALUES ('Bob', 'Smith');