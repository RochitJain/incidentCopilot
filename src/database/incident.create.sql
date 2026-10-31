CREATE TABLE incidents (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    service VARCHAR(100) NOT NULL,

    severity VARCHAR(2) NOT NULL
        CHECK (severity IN ('P1', 'P2', 'P3', 'P4')),

    status VARCHAR(20) NOT NULL DEFAULT 'OPEN'
        CHECK (status IN (
            'OPEN',
            'INVESTIGATING',
            'RESOLVED',
            'CLOSED'
        )),

    started_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);