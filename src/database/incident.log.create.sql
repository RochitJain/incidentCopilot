CREATE TABLE incident_logs (
    incident_id BIGINT REFERENCES incidents(id) ON DELETE CASCADE,
    log_id BIGINT REFERENCES logs(id) ON DELETE CASCADE,
    PRIMARY KEY (incident_id, log_id)
);