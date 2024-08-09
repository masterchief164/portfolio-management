CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	fname VARCHAR(50),
	lname varchar(50),
	age INT CONSTRAINT valid_age CHECK (age > 18),
	isPm bool
);


CREATE TABLE assets(
	symbol VARCHAR(50),
    sector VARCHAR(100),
    name   VARCHAR(250),
	asset_type VARCHAR(50),
	name VARCHAR(250)
);

CREATE TYPE transac_type as ENUM ('buy', 'sell');

CREATE TABLE transactions(
	tx_id SERIAL PRIMARY KEY,
	pm_id INT,
	user_id INT,
    asset_symbol VARCHAR(50),
	quantity INT,
	price_per_unit DOUBLE PRECISION,
	tx_type transac_type,
	created_at TIMESTAMP,
    value DECIMAL,
	CONSTRAINT fk_pm FOREIGN KEY(pm_id) REFERENCES users(user_id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_asset FOREIGN KEY (asset_symbol) REFERENCES assets (symbol)
);

CREATE TABLE pm_client_relationships (
	pm_id INT,
	user_id INT,
	created_at TIMESTAMP,
	CONSTRAINT fk_pm FOREIGN KEY(pm_id) REFERENCES users(user_id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE watchlist(
	watchlist_id SERIAL PRIMARY KEY,
	user_id INT,
    asset_symbol VARCHAR(50),
	price_per_unit DOUBLE PRECISION,
	created_at TIMESTAMP,
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_asset FOREIGN KEY (asset_symbol) REFERENCES assets (symbol)
);

