# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.30.0] - 2022-02-10
### Added
- Polling for today widget values.

## [1.29.1] - 2022-02-09
### Fixed
- Blank profile/event page.

## [1.29.0] - 2022-02-09
### Added
- Paging for event list.

### Fixed
- Solar power widget for portal page.

## [1.28.0] - 2022-02-02
### Added
- Solar power to 8 hour dashboard widget.

## [1.27.2] - 2022-01-30
### Fixed
- No value when 0 for used and using widgets.

## [1.27.1] - 2022-01-30
### Fixed
- Used today widget no value when no data.
- No solar widget on Portal page when no solar inverters.

## [1.27.0] - 2022-01-29
### Added
- Solar inverter online status.

### Changed
- Solar widget do not show when there are no solar inverters added.

## [1.26.0] - 2022-01-20
### Changed
- Soft max changed for electricity week chart.
- Updated dependencies.

## [1.25.0] - 2022-01-11
### Added
- Electricity used today widget.
- Electricity using current widget.

## [1.24.3] - 2022-01-09
### Fixed
- Previous period for gas month chart, offset by one month.

## [1.24.2] - 2022-01-09
### Fixed
- Linting error.

## [1.24.1] - 2022-01-09
### Fixed
- Linting error.

## [1.24.0] - 2022-01-09
### Added
- Include previous period for gas month charts.

### Fixed
- Grammar.

## [1.23.0] - 2022-01-08
### Added
- Solar inverter settings page where you can add solar inverters and see current and total yield.

## [1.22.0] - 2022-01-03
### Added
- Loading page.
- Polling for current electricity widgets.

### Fixed
- Portal logged out page.
- Refreshing widgets on Dashboard.

## [1.21.1] - 2022-01-01
### Fixed
- Wrong polling for all widgets, only polling for solar now.

## [1.21.0] - 2022-01-01
### Added
- Polling to current electricity and solar widgets.

### Fixed
- Login form redirect after login.

## [1.20.1] - 2022-01-01
### Fixed
- Last updated for current solar power widget.

## [1.20.0] - 2022-01-01
### Added
- Current solar power and today solar power widgets.

### Changed
- Auth for breaking changes API.
- Updated packages and changed code to reflect breaking changes.

## [1.19.1] - 2021-12-17
### Fixed
- Build error.

## [1.19.0] - 2021-12-17
### Changed
- Gas color.
- Updated dependencies.

## [1.18.1] - 2021-12-12
### Fixed
- Series display in some charts.

## [1.18.0] - 2021-12-12
### Added
- Previous week reading for electricity week chart.

### Changed
- Chart legend labels.

## [1.17.0] - 2021-12-11
### Added
- Previous week reading for gas week chart.

## [1.16.0] - 2021-11-22
### Added
- Gas usage year widget on dashboard.

### Changed
- Lazy loading all charts (intersections observer).

## [1.15.0] - 2021-11-20
### Added
- Year electricity widget with intersections observer (lazy loading).
- Lazy loading month electricity widget (intersections observer).

### Fixed
- Improvements header modal.

## [1.14.2] - 2021-11-14
### Fixed
- Removed Year widget because of performance issues.

## [1.14.1] - 2021-11-14
### Fixed
- Electricity year widget by using the new features in API version 2.1.0.

## [1.14.0] - 2021-11-08
### Added
- Electricity year widget.
- User header modal.

## [1.13.0] - 2021-05-24
### Changed
- **Needs API version >= 2.0** Refactor for breaking changes on the API.
- Updated Apollo Client.

## [1.12.0] - 2021-05-23
### Added
- Electricity received to month chart.
- Last updated time for current electricity delivered and received widgets.

### Removed
- All widgets (except actual receiving and delivering widgets) on portal page (home page when logged out).

## [1.11.0] - 2021-05-13
### Added
- Current water meter reading on settings page.
- Formatting numbers with correct decimal and thousand separators bases on browser language setting.

### Changed
- Improved chart loading state styling for smaller screen sizes.

## [1.10.2] - 2021-05-08
### Fixed
- Gas & electricity month widgets wrong month order and labels.

## [1.10.1] - 2021-05-08
### Fixed
- Re-fetching data loop for electricity 8 hours chart.

## [1.10.0] - 2021-05-08
### Added
- Water received week chart added to dashboard page.
- Descriptions on water and mindergas.nl settings pages.

### Changed
- Nicer skeleton loading for charts.
- Electricity received and delivered in one chart.

### Fixed
- Time 8 hour electricity and 4 day gas chart was not updating on navigating back to the dashboard page.

### Removed
- Rounding for month widgets.

## [1.9.0] - 2021-05-02
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