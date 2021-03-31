START TRANSACTION;
  create table category(
    id serial PRIMARY KEY ,
    name varchar NOT NULL
  );

  INSERT INTO category (name) VALUES ('');
  INSERT INTO category (name) VALUES ('Gold');
  INSERT INTO category (name) VALUES ('Gold');
  ALTER TABLE "users_data" ADD COLUMN categoryId int DEFAULT 1;
  ALTER TABLE "users_data" ADD CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES category(id); 

COMMIT;