-- Create tables for alien grammar
CREATE TABLE type (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    value TEXT NOT NULL UNIQUE
);

CREATE TABLE message (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    has_been_processed BOOLEAN NOT NULL DEFAULT FALSE,
    valid BOOLEAN NOT NULL DEFAULT FALSE,
    leader TEXT NOT NULL
);

CREATE TABLE word (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    valid BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT NOT NULL,
    type_id UUID NOT NULL REFERENCES type(id),
    message_id UUID NOT NULL REFERENCES message(id)
);

-- Load inital values for alien grammar
INSERT INTO type(value)
VALUES ('INFO'),
    ('WARNING'),
    ('DANGER');

