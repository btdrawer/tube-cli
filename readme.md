# tube-cli

A simple command-line interface for retrieving real-time service information from Transport for London (TfL).

## Usage

- `-m`: List available modes
- `-m [string]`: List status updates for a specified mode (the string should be in kebab-case, e.g. `tube`, `national-rail`)
- `-l [string]`: List status updates for specified lines (line IDs should be comma-separated, e.g. `hammersmith-city,district`)
- `-d`: List disruptions for the specified modes or lines (use in conjunction with `-m` or `-l`).