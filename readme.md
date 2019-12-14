# tube-cli

A simple command-line interface for retrieving real-time service information from Transport for London (TfL).

## Setup

You must have NPM installed and run `npm i` before launching the application.

## Usage

To launch the application, run `node .` from the root folder, followed by one of the following commands:

- `-m`: List available modes
- `-m [string]`: List status updates for a specified mode (the string should be in kebab-case, e.g. `tube`, `national-rail`)
- `-l [string]`: List status updates for specified lines (line IDs should be comma-separated, e.g. `hammersmith-city,district`)
- `-d`: List disruptions for the specified modes or lines (use in conjunction with `-m` or `-l`).
- `-q`: Search for transport stops by their names. You can also use `-m` to restrict your search to a particular mode. (By the way, not only TfL but also **all** National Rail stations are queried by this function.)
- `-s`: Get information about stops by a comma-separated list of IDs. This function provides more information than `-q` does, but you need to use `-q` to get the IDs necessary.
