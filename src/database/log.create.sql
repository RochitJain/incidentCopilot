CREATE TABLE logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    level VARCHAR(10) NOT NULL,

    service VARCHAR(100) NOT NULL,

    method VARCHAR(10),

    endpoint TEXT,

    status_code INTEGER,

    duration_ms NUMERIC(10, 2),

    message TEXT,

    metadata JSONB DEFAULT '{}'::jsonb
);

