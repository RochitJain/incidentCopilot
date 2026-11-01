const parseMetrics = (rawMetrics) => {
  const result = [];

  for (const line of rawMetrics.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(
      /^([a-zA-Z_:][a-zA-Z0-9_:]*)(?:\{([^}]*)\})?\s+([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)$/
    );

    if (!match) continue;

    const [, name, rawLabels, rawValue] = match;


    result.push({
      name,
      labels: parseLabels(rawLabels) || null,
      value: Number(rawValue)
    });
  }
  const importantMetrics = [
  "http_requests_total",
  "http_request_duration_seconds_bucket",
  "http_request_duration_seconds_sum",
  "http_request_duration_seconds_count",
  "http_active_requests",
  "process_resident_memory_bytes",
  "process_cpu_seconds_total",
  "nodejs_eventloop_lag_seconds",
  "nodejs_heap_size_used_bytes"
];
  const filteredResult = result.filter(metrics =>
    importantMetrics.includes(metrics.name)
)
  return filteredResult;
};

const parseLabels = (rawLabels) => {
  if (!rawLabels) return {};

  const labels = {};

  const regex = /(\w+)="((?:\\.|[^"])*)"/g;
  let match;

  while ((match = regex.exec(rawLabels)) !== null) {
    labels[match[1]] = match[2];
  }

  return labels;
};


module.exports = parseMetrics;