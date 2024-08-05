CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	fname VARCHAR(50),
	lname varchar(50),
	age INT CONSTRAINT valid_age CHECK (age > 18),
	isPm bool
);


CREATE TABLE assets(
	asset_id SERIAL PRIMARY KEY,
	symbol VARCHAR(50),
	sector VARCHAR(50),
	asset_type VARCHAR(50)
);

CREATE TYPE transac_type as ENUM ('buy', 'sell');

CREATE TABLE transactions(
	tx_id SERIAL PRIMARY KEY,
	pm_id INT,
	user_id INT,
	asset_id INT,
	quantity INT,
	price_per_unit DOUBLE PRECISION,
	tx_type transac_type,
	created_at TIMESTAMP,
	CONSTRAINT fk_pm FOREIGN KEY(pm_id) REFERENCES users(user_id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id),
	CONSTRAINT fk_asset FOREIGN KEY(asset_id) REFERENCES assets(asset_id)
);

CREATE TABLE pm_client_relationships (
	relation_id SERIAL PRIMARY KEY,
	pm_id INT,
	user_id INT,
	created_at TIMESTAMP,
	CONSTRAINT fk_pm FOREIGN KEY(pm_id) REFERENCES users(user_id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE watchlist(
	watchlist_id SERIAL PRIMARY KEY,
	user_id INT,
	asset_id INT,
	price_per_unit DOUBLE PRECISION,
	created_at TIMESTAMP,
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id),
	CONSTRAINT fk_asset FOREIGN KEY(asset_id) REFERENCES assets(asset_id)
);

