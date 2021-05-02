# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- All Consumption queries to new Exchange queries.

## [1.8.0] - 2021-05-02
### Added
- Background color for values without data points in the electricity chart and gas chart.

### Changed
- Cache data for user avatar in memory.
- Better error feedback add verified water reading form.
- More accurate electricity 8 hour chart.
- Combined delivered and received electricity in one chart.

### Fixed
- Add verified water readings required field.

## [1.7.2] - 2021-04-27
### Fixed
- MinderGas.nl synchronization checkbox toggle.

## [1.7.1] - 2021-04-27
### Fixed
- Re-fetching queries in a loop: global default caching for network requests is now no-cache.

## [1.7.0] - 2021-04-26
### Added
- Smart Meter settings page with general info from the Smart Meter.
- Custom favicon image.

### Changed
- More accurate 4 day gas widget (same day total).
- Improved forms and inputs (layout and usability).

### Removed
- Rounding values for 4 day gas usage chart because they are already.

### Fixed
- Login form button not working.

## [1.6.1] - 2021-04-22
### Fixed
- Wrong unit (kWh) in gas week chart widget.
- Missing values for gas 4 day chart because of rounding to zero.

## [1.6.0] - 2021-04-21
### Added
- Current week Gas received widget.

### Changed
- Updated dependencies.
- Updated existing portal page widgets to be the same as the dashboard page.
- Week widgets now show all days of the week instead of only the current and previous days.

## [1.5.0] - 2021-04-18
### Added
- Current week Electricity received widget.

### Changed
- Better error messages for most components inside widgets.

### Fixed
- Fatal for 2 widgets when getting invalid data from api.

## [1.4.0] - 2021-04-16
### Added
- Add verified water reading form, for correcting the water sensor.

### Changed
- Updated dependencies.

## [1.3.1] - 2021-04-15
### Fixed
- Fetch delivered received chart widgets infinite loop.

## [1.3.0] - 2021-04-14
### Added
- Electricity delivered 8 hours chart widget for dashboard.

### Changed
- Bolt icons for delivered and received.
- Widget titles for delivered and received electricity.

## [1.2.0] - 2021-04-13
### Added
- About settings page with app en server version numbers.

### Fixed
- Vertical text overflow on settings nav button text.

## [1.1.0] - 2021-04-12
### Added
- Settings page.
- Water Reader settings page.
- EventList loading indication.

### Changed
- Moved minder-gas-nl page to settings menu.

## [1.0.0] - 2021-04-10